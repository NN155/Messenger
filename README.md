# Project Name: Messenger

## Description
**Messenger** is a Discord app clone, inspired by Discord, that provides an intuitive interface for text messaging. The app supports real-time communication with instant messaging and group chats.

## Features
- **Instant Messaging**: Send and receive text messages in real time.
- **Group Chats**: Create and participate in group discussions.
- **Redux Architecture**: State management for a scalable app structure.
- **Socket.io**: Real-time message handling using WebSocket.

## Installation and Running the App
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/messenger.git
    ```
2. Navigate to the project directory:
    ```bash
    cd messenger
    ```
3. Create `.env` files in both the **client** and **server** directories and add necessary environment variables for each part of the app.

   - For the **server**:  
     Create a `.env` file in the `server` directory and add the following variables (replace `<your_value_here>` with your own values):
     ```env
     PORT=3000
     JWT_SECRET="<your_secret_key_here>"
     MONGODB_URI="<your_mongodb_connection_uri_here>"
     NODE_ENV=development
     ```

   - For the **client**:  
     Create a `.env` file in the `client` directory and add the following variables:
     ```env
     REACT_APP_API_URL=http://localhost:3000/api
     REACT_APP_SOCKET_URL=http://localhost:3000
     ```

4. Run the setup command to install dependencies for both the client and server and start the app:
    ```bash
    npm run setup
    ```


## Available Scripts
- **install:server**: Installs dependencies for the server.
    ```bash
    npm run install:server
    ```
- **install:client**: Installs dependencies for the client.
    ```bash
    npm run install:client
    ```
- **install:all**: Installs dependencies for both the server and the client.
    ```bash
    npm run install:all
    ```
- **build:client**: Builds the client for production.
    ```bash
    npm run build:client
    ```
- **start:server**: Starts the server.
    ```bash
    npm run start:server
    ```
- **start**: Builds the client and starts both the client and server.
    ```bash
    npm run start
    ```
- **setup**: Installs all dependencies (client and server) and starts the app.
    ```bash
    npm run setup
    ```

## Technologies Used
- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **WebSocket**: Socket.io for real-time communication
- **Database**: MongoDB (if needed for storing user data)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
