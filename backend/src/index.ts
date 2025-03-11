import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import compression from 'compression';
import { classifyNumber } from "./classifier";
import { createGraphQLServer } from "./graphql";
import { createServer } from "http"; // Create an HTTP server
import { Server } from "socket.io"; // Socket.IO server setup
import client from "prom-client"
import { setupSwagger } from './swagger';
import rateLimit from 'express-rate-limit';
import { query, validationResult } from 'express-validator';
import logger from "./logger";
import fs from 'fs';
import path from 'path';



dotenv.config();

const app = express();
const PORT  = process.env.PORT as string
const httpServer = createServer(app);  //Wrap Express app in an HTTP server


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });


const io = new Server(httpServer, {
    cors: {
        origin: 'https://fun-fact-apis-1.onrender.com', // Allow frontend to connect
        methods: ['GET', 'POST']
    }
});

// Initialize GraphQL and pass both `app` and `httpServer`
createGraphQLServer(app, httpServer);

// Enable CORS for HTTP requests
app.use(cors());
app.use(express.json());
app.use(compression())
app.use(limiter);

setupSwagger(app); // Set up Swagger documentation
// Prometheus client setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Automatically collects CPU, memory, and request metrics

app.get("/metrics", async (_req: Request, res: Response) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics()); // Returns API performance data
})



app.get('/api/classify-number',[ query('number').exists().isNumeric().withMessage('`number must be numeric')

], async (req: Request, res: Response)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const numStr = req.query.number;
        const userAgent = req.headers['user-agent'];
        const num = Number(numStr)
        const startTime = Date.now();

        if (!numStr || isNaN(num)) {
            res.status(400).json({
                number: numStr,
                error: true,
            })
            return; // na these return been give me a strong bug
        }
        const responseTime = Date.now() - startTime;

        
        const result = await classifyNumber(num);

        setTimeout(() => {
            const responseTime = Date.now() - startTime;
            const statusCode = numStr === '50' ? 202 : 200;
    
            logger.info(`Request: GET /api/classify-number?number=${numStr}, Status: ${statusCode}, Response Time: ${responseTime}ms, User-Agent: ${userAgent}`);
              // Ensure response hasn't been sent already
                res.status(statusCode).json(result);
            
        }, Math.random() * 500);
        
        // ✅ Emit real-time updates via WebSockets
        io.emit("numberClassified", result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get('/api/logs', (req: Request, res: Response) => {
    const logFilePath = path.join(__dirname, '../logs/app.log');

    // Check if log file exists
    if (!fs.existsSync(logFilePath)) {
        logger.warn('Log file not found');
        return res.status(404).json({ error: 'Log file not found' });
    }

    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if(err) {
            logger.error(`Failed to read log file: ${err}`);
            return res.status(500).json({error: 'Failed to read log file'})
        }

        res.status(200).json({logs : data})
    })
})

// ✅ WebSocket connection event
io.on("connection", (socket) => {
    console.log("Client connected");
    // Emit a welcome message
    socket.emit("message", "Welcom to the Real-Time API!");
})

// ✅ Start the HTTP server (not `app.listen`)
// ✅ Only start the server if this file is run directly

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




export default app; // Export the Express app for testing purposes
