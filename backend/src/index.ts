import express from 'express';
import dotenv from "dotenv";
import cors from "cors"
import connectDB from './config/db';
import memberRoutes from "./routes/memberRoutes";
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());

app.use(cors()); 

dotenv.config();
const PORT = process.env.PORT || 5001;

// Routes
app.use("/api/member", memberRoutes);
app.use("/api/auth", authRoutes); 

app.listen(PORT, ()=> {
    console.log(`running on port ${PORT}`);
    connectDB();
})