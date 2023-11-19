import express from "express";
import Connection from "./database/db.js";
import cors from 'cors';
import authRoutes from "./routes/authRoute.js";
import recipeRoutes from "./routes/reciepeRoute.js";
import commentRoutes from "./routes/commentsRoute.js";

const app=express();

const PORT=5000;
Connection();

app.use(cors());
app.use(express.json())


// app.use('/',(req,res)=>{
//     res.send("Welcome to Reciepe app")
// })
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/recipe", recipeRoutes);
app.use("/api/v1/comment", commentRoutes);

app.listen(PORT,()=>{
    console.log(`APP IS STARTED AT PORT ${PORT}`)
})