
# Real-Time Collaboration App

A real-time collaboration app built with NestJS, WebSockets (Socket.io), and MongoDB. This application allows multiple users to collaboratively edit a document in real-time, with document content being stored and retrieved from MongoDB.

## Features

- Real-time document editing with WebSockets (Socket.io)
- MongoDB for storing documents and their content
- Multiple users can join a document and edit its content simultaneously
- Document content is persistent in the database

## Technologies

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable applications.
- **MongoDB**: A NoSQL database used to store document data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Socket.io**: A JavaScript library for real-time web applications, enabling bi-directional communication between client and server.

## Setup

### Prerequisites

- Node.js >= 16.x
- MongoDB (local or MongoDB Atlas)

### Install Dependencies

1. Clone the repository:

   ```bash
   git clone https://github.com/abdulhamidnugroho/collaboration-app.git
   cd collaboration-app
   ```

2. Install required dependencies:

   ```bash
   npm install
   ```

### Configuration

1. **MongoDB Setup**:
   If you're using a local MongoDB instance, ensure MongoDB is running on `mongodb://localhost:27017`. For MongoDB Atlas, use the connection URI provided by your Atlas cluster.

2. **Environment Variables**:
   Create a `.env` file in the root directory of your project and add the following configuration:

   ```env
   MONGO_URI=mongodb://localhost:27017/collaboration-db
   PORT=3000
   ```

### Run the Application

1. Start the application:

   ```bash
   npm run start
   ```

2. The server will start on `http://localhost:3000`.

### Testing the Application

1. Open your browser and go to `http://localhost:3000`.
2. Multiple users can open the same document by using the same `docId`. The content will be synchronized across all users in real-time.
3. Changes made by any user will be reflected for all other users who are viewing the document.

### API Endpoints

#### `GET /documents/:docId`

Fetch the content of a document by its `docId`.

- **Response**:
  - 200 OK: Returns the content of the document.
  - 404 Not Found: If the document does not exist.

#### `POST /documents/:docId`

Update the content of a document.

- **Request Body**:

  ```json
  {
    "content": "new content of the document"
  }
  ```

- **Response**:
  - 200 OK: Document updated successfully.
  - 400 Bad Request: If the content is missing or invalid.

### Real-Time Collaboration

- **Socket Events**:
  - `joinDocument`: A user joins a document to begin editing.
  - `documentContent`: The current content of the document.
  - `contentUpdated`: Emitted when the content is updated by any user, which is broadcast to all connected clients.

#### Socket Events Example

```javascript
// Client-side example (in the browser):
const socket = io('http://localhost:3000');

// Join a document with docId 'doc1'
socket.emit('joinDocument', 'doc1');

// Listen for document content updates
socket.on('documentContent', (content) => {
  console.log('Received content:', content);
  // Update the document editor with the new content
});
```

### MongoDB Data Structure

- **Document Schema**:

  ```typescript
  const DocumentSchema = new Schema({
    docId: { type: String, required: true, unique: true },
    content: { type: String, required: true }
  });
  ```

### Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](MIT) file for details.
