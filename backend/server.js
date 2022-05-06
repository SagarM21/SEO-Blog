import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import blogRoutes from "./routes/blog.js";
import authRoutes from "./routes/auth.js";

// app
const app = express();

// db
mongoose
	.connect(process.env.DATABASE, {})
	.then(() => console.log("Database connected"))
	.catch((err) => console.log("DB Error => ", err));

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
});
