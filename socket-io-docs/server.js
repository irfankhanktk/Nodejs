const express = require("express"),
  session = require("express-session"),
  SocketClass = require("./libraries/socket"),
  commmonConfig = require("./config/common.config"),
  dbConfig = require("./config/db.config"),
  nocache = require("nocache"),
  cors = require("cors"),
  rateLimit = require("express-rate-limit"),
  encryptionService = require("./Services/encryption.service"),
  MySQLStore = require("express-mysql-session")(session),
  options = {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
  };

var sessionStore = new MySQLStore(options);

// Diffrent Servers
const app = express();
// const app1 = express();
// const app2 = express();

// app.use(
//   rateLimit({
//     windowMs: 1 * 30 * 1000, //30 seconds
//     max: 1500,
//     message: {
//       code: 429,
//       message: "Too many requests",
//     },
//   })
// );

// const handler = (serverNum) => (req, res) => {
//   console.log(
//     `handle request server ${serverNum}`,
//     req.method,
//     req.url,
//     req.body
//   );
//   res.send(`Hello from server ${serverNum}!`);
// };

// Server1
app.set("etag", false);
app.use(cors());
app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(
  session({
    key: "session_cookie_name",
    secret: commmonConfig.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 },
    store: sessionStore,
  })
);

// app
//   .get("test", handler(1))
//   .post("test", handler(1))
//   .put("test", handler(1))
//   .delete("test", handler(1));

const server = app.listen(process.env.PORT || commmonConfig.serverPort, () => {
  console.log("server is lisning");
});

// Routes
require("./routes/auth.routes")(app);
require("./routes/conversations.routes")(app);
require("./routes/messages.routes")(app);
require("./routes/callMetaData.routes")(app);
require("./routes/logger.routes")(app);
require("./routes/stats.routes")(app);
require("./routes/deletedMessages.routes")(app);
require("./routes/reportedUser.routes")(app);
// require("./routes/group.routes")(app);
// require("./routes/groupKey.routes")(app);

app.get("/", (req, res) => {
  encryptionService.generateNewGroupKeys();
  res.json({ message: "API is working." });
});

app.get("/api/ping", (req, res) => {
  res.status(200).send({ status: "ok", message: "API is WOrking ...." });
});

new SocketClass(server);

// // Server2
// app1.set("etag", false);
// app1.use(cors());
// app1.use(nocache());
// app1.use(express.urlencoded({ extended: true }));
// app1.use(express.json());
// app1.use(express.raw());
// app1.use(
//   session({
//     key: "session_cookie_name",
//     secret: commmonConfig.secret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 24 * 60 * 60 },
//     store: sessionStore,
//   })
// );

// app1
//   .get("test", handler(2))
//   .post("test", handler(2))
//   .put("test", handler(2))
//   .delete("test", handler(2));

// const server1 = app1.listen(process.env.PORT || 3200, () => {
//   console.log("server1 is lisning");
// });

// // Routes
// require("./routes/auth.routes")(app1);
// require("./routes/conversations.routes")(app1);
// require("./routes/messages.routes")(app1);
// require("./routes/callMetaData.routes")(app1);
// require("./routes/logger.routes")(app1);
// require("./routes/stats.routes")(app1);

// app1.get("/", (req, res) => {
//   res.json({ message: "Server2 is working with app1." });
// });

// new SocketClass(server1);

// // Server3
// app2.set("etag", false);
// app2.use(cors());
// app2.use(nocache());
// app2.use(express.urlencoded({ extended: true }));
// app2.use(express.json());
// app2.use(express.raw());
// app2.use(
//   session({
//     key: "session_cookie_name",
//     secret: commmonConfig.secret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 24 * 60 * 60 },
//     store: sessionStore,
//   })
// );
// app2
//   .get("test", handler(3))
//   .post("test", handler(3))
//   .put("test", handler(3))
//   .delete("test", handler(3));
// const server2 = app2.listen(process.env.PORT || 5100, () => {
//   console.log("server2 is lisning");
// });

// // Routes
// require("./routes/auth.routes")(app2);
// require("./routes/conversations.routes")(app2);
// require("./routes/messages.routes")(app2);
// require("./routes/callMetaData.routes")(app2);
// require("./routes/logger.routes")(app2);
// require("./routes/stats.routes")(app2);

// app2.get("/", (req, res) => {
//   res.json({ message: "Server3 is working with app2." });
// });

// new SocketClass(server2);
