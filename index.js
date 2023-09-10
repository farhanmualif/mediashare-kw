import express from "express";
import winston from "winston";
import env from "dotenv/config";
import web from "./routes/api.js";
import path from "path";
import url from "url";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import errorMidleware from "./middleware/errorMidleware.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use("/static", express.static(path.join(__dirname, "src/public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Set Cookie Parser, sessions and flash
app.use(cookieParser("NotSoSecret"));
app.use(
  session({
    secret: "something",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
// flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.req = req;
  res.locals.res = res;
  res.locals.success_alert = req.flash("success");
  res.locals.failure_alert = req.flash("failure");
  next();
});

// configure logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console({})],
});

app.set(env);

app.use(express.json());
io.on("connection", (socket) => {
  socket.emit("test", "connected");
});

app.use(web);
app.use(errorMidleware);

server.listen(process.env.PORT, () => {
  logger.log({
    level: "info",
    message: "Server runing on port " + process.env.PORT,
  });
});

export { io, app };
