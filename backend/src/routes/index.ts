
import { Application } from "express";

import { usersRouter } from "./users/usersRouter";
import { DeparRouter } from "./Departments/deparRouter"



export default (app: Application) => {

    app.get("/", (_, res) => {
        res.json({ message: "API Running ! " });
    });
    
    app.use("/api/v1", [usersRouter, DeparRouter]);
};
