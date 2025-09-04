import express from "express"
import dotenv from "dotenv"
import { initDB, sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionRoute from "./routes/transactionRoute.js"
import job from "./config/cron.js"

const app = express();

if(process.env.NODE_ENV==="production") job.start();

dotenv.config();

app.use(rateLimiter)
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res)=>{
    res.status(200).json({status:"ok"})
})

app.use("/api/transactions", transactionRoute)

initDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT:", PORT);
    })
})