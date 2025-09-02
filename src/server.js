import express from "express"
import dotenv from "dotenv"
import { initDB, sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionRoute from "./routes/transactionRoute.js"

const app = express();

dotenv.config();

app.use(rateLimiter)
app.use(express.json());



app.use("/api/transactions", transactionRoute)

const PORT = process.env.PORT || 5001;

initDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT:", PORT);
    })
})