Convo GPT is a conversational AI web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This project leverages OpenAI's GPT API to provide intelligent conversational capabilities.

Features
Real-time chat with AI-powered responses
User authentication and session management
Persistent chat history
Responsive design for seamless use across devices
Requirements
Node.js (>=14.x)
MongoDB (>=4.x)
npm (>=6.x) or yarn (>=1.x)
OpenAI API Key
Installation
Clone the Repository

bash

git clone https://github.com/yourusername/convo-gpt.git
cd convo-gpt
Backend Setup

Navigate to the backend directory:

bash
cd backend

Install the dependencies:

bash
npm install
Create a .env file in the backend directory and add your environment variables:

bash
touch .env
Example .env file:

env
MONGO_URI=your_mongodb_connection_string
PORT=5000
OPENAI_API_KEY=your_openai_api_key
Start the backend server:

bash
npm start
Frontend Setup

Navigate to the frontend directory:

bash
cd ../frontend
Install the dependencies:

bash
npm install
Create a .env file in the frontend directory and add your environment variables:

bash
touch .env
Example .env file:

env
REACT_APP_API_URL=http://localhost:5000
Start the frontend development server:

bash
npm start
Usage
Running the Application

Ensure MongoDB is running on your machine or use a cloud MongoDB service.
Start both the backend and frontend servers as described in the installation steps.
Open your browser and navigate to http://localhost:3000.
OpenAI API Key

The application uses OpenAI's GPT API to generate responses. You need an API key from OpenAI.
Add the API key to your backend .env file as shown above:
env
OPENAI_API_KEY=your_openai_api_key
