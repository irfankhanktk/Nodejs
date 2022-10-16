// import bodyParser from "body-parser";
import express, { json, urlencoded } from "express";
import { createServer } from 'http';
import auth from './src/routes/auth-route.js';
import group_router from "./src/routes/group-route.js";
import post_router from "./src/routes/post-route.js";
import user_router from "./src/routes/user-route.js";
import like_router from "./src/routes/like-route.js";
import comment_router from "./src/routes/comment-route.js";
import message_router from "./src/routes/message-route.js";
import notification_router from './src/routes/notification-route.js';
import logger_router from "./src/routes/logger-route.js";
import {SocketIO} from "./src/services/socket.js";

let app = express();

let httpServer = createServer(app);

// app.use(bodyParser.json());

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
//form-urlencoded

// for parsing multipart/form-data
// app.use(upload.array()); 
app.use(express.static('src/upload'));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to checked api." });
});

// defining router here
// auth roouter
app.use('/api/oauth', auth)
app.use('/api/user', user_router);
app.use('/api/group', group_router);
app.use('/api/post', post_router);
app.use('/api/like', like_router);
app.use('/api/comment', comment_router);
app.use('/api/message', message_router);
app.use('/api/notification', notification_router);
app.use('/api/logs', logger_router);
//user router






const PORT = process.env.APP_PORT || 3000;
const server=httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


SocketIO(server);