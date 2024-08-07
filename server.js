import express from "express"
import 'dotenv/config';
const app = express();
import userRoutes from "./routes/userRoutes.js"
import riderRoutes from "./routes/riderRoutes.js"
import connectDb from "./config/dbConnection.js";

const PORT = process.env.PORT || 5000;

connectDb();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/rider', riderRoutes);




app.listen(PORT,()=>{
    console.log(`RUNNING OVER ${PORT}`);
})