import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("https://fun-fact-apis.onrender.com");

const SocketMessages: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on("numberClassified", (data: string) => {
      // Append the new message to our list
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data)
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off("numberClassified");
    };
  }, []);

  return (
    <div>
    <h2>Socket Messages</h2>
    {messages.length === 0 ? (
      <p>No messages received yet.</p>
    ) : (
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>
            {typeof msg === "object" ? (
              <pre>{JSON.stringify(msg, null, 2)}</pre> // Pretty print object
            ) : (
              msg
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default SocketMessages;
