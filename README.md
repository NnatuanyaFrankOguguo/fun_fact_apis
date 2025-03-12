# 📊 Fun Number Classifier API

A powerful backend API for **classifying numbers** with REST, GraphQL, and real-time WebSocket support.  
Includes **Swagger API docs**, **rate limiting**, **Prometheus metrics**, **logging**, and a **CI/CD pipeline with Docker support**.  
Perfect for exploring modern backend practices.

---

## 🚀 Features

- ✅ REST API to classify numbers.
- ✅ GraphQL API alternative.
- ✅ Real-time classification updates via WebSockets.
- ✅ API documentation with Swagger.
- ✅ Rate limiting to prevent abuse.
- ✅ Request/response logging system.
- ✅ Prometheus endpoint for metrics and monitoring.
- ✅ CI/CD Pipeline using GitHub Actions.
- ✅ Dockerized for easy deployment.
- ✅ Hosted live on Render.

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NnatuanyaFrankOguguo/fun_fact_apis.git


2. Install Dependencies (Backend)

cd backend
npm install

3. Run the Backend Server

npm run dev
The server will run on http://localhost:5000

🧪 Testing the API
REST Endpoint:

GET http://localhost:5000/api/classify-number?number=10

WebSocket:
Connect to: ws://localhost:5000 to receive real-time classification updates.

Swagger Documentation:

http://localhost:5000/api-docs

GraphQL Playground:

http://localhost:5000/graphql

Logs Endpoint:

GET http://localhost:5000/api/logs

🐳 Running with Docker
1. Build and Run the App

docker-compose up --build

Exposes backend on http://localhost:5000

✅ Running Tests

npm test

🚨 Rate Limiting
Each IP: 100 requests per 15 minutes

📈 Prometheus Metrics

http://localhost:5000/metrics

🔗 [Website Url](https://fun-fact-apis-1.onrender.com)

📂 Project Structure

root/
│
├── backend/        # Express Backend API
│   ├── routes/     # API routes
│   ├── graphql/    # GraphQL setup
│   ├── logger/     # Winston logger
│   ├── swagger/    # API documentation
│   ├── Dockerfile  # Dockerfile for backend
│   └── ...         
│
├── fun-number-ui/       
│
└── docker-compose.yml  # Docker orchestration
🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

📜 License
This project is licensed under the MIT License.
---

Let me know if you want to add **frontend instructions**, **badges**, or **contributing guidelines** as well! 🚀
