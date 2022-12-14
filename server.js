import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

// all this bcz we are using es6 modules
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// securing server
import helmet from "helmet";
import xss from "xss-clean";

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import user from "./routes/user.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handlor.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());

// security middlewares
app.use(helmet());
app.use(xss());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/v1/user", user);

// redirecting to front-end index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening at ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
