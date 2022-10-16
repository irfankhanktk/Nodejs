import express from "express";
import { createServer } from 'http';
import auth from './src/routes/auth-route.js';
import fingerprint_router from "./src/routes/fingerprint-route.js";
import item_router from "./src/routes/item-route.js";
import logger_router from './src/routes/logger-route.js';
import machine_router from "./src/routes/machine-route.js";
import order_router from "./src/routes/order-route.js";
import user_router from './src/routes/user-route.js';
import cors from 'cors';


let app = express();

app.use(cors());

let httpServer = createServer(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(express.static('src/upload'));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to EVM api." });
});

// simple route
app.get("/test", (req, res) => {
    res.json({ message: "Welcome to EVM api test URL." });
});

// defining router here
// auth roouter
app.use('/api/oauth', auth)
app.use('/api/user', user_router);
app.use('/api/machine', machine_router);
app.use('/api/dispense-item', order_router);
app.use('/api/bill', order_router);
app.use('/api/item', item_router);
app.use('/api/fingerprint', fingerprint_router);
app.use('/api/logs', logger_router);
//user router






const PORT = process.env.APP_PORT || 5000;
const server=httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


// SocketIO(server);