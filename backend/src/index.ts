import express, { Application, json, urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import { sequelize } from "../models/";
import "./modulesAliasConfig";
import registerRouter from "@routes/index";


const app: Application = express();

app.use(json());

app.use(cors({origin: '*'}));
app.use(urlencoded({ extended: false }));

registerRouter(app);

export const HOST = process.env.HOST ? process.env.HOST : "localhost";
export const PORT =  5100;



const connectDB = async () => {
    console.log('checking database connection')
    try {
        await sequelize.authenticate();
        console.log("DB connection established")

    } catch(e) {
        console.log("DB connection failed", e);
        process.exit(1);
    }
}

(
   async () => {
    await connectDB();
    app.listen(PORT, () =>
    console.log(`Server listening on http://${HOST}:${PORT}/"`)
);
   }
)();
