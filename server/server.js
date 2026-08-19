import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import applicationRoutes from "./routes/applicationRoutes.js";
import cvRoutes from "./routes/cvRoutes.js";
import fitScoreRoutes from "./routes/fitScoreRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api/applications", applicationRoutes);
app.use("/api/cvs", cvRoutes);
app.use("/api/fitscore", fitScoreRoutes);
app.use("/api/users", userRoutes);
app.use("/api/interview-questions", interviewRoutes);
app.use("/api/companies", companyRoutes);

app.get("/",(req,res)=>{
    res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});
