import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { Application } from "express";
import path from "path";
import { usersRouter } from "./users/usersRouter";

export default (app: Application) => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Start Node API",
                version: "1.0.0",
                description:
                    "This page is dedicated to the route list in the application",
            },
            servers: [
                {
                    url: `http://${process.env.HOST ? process.env.HOST : "localhost"}:${process.env.PORT}/api/v1`,
                },
            ],
        },
        apis: [
            `${__dirname}/*/*${path.extname(path.basename(__filename))}`,
            `${__dirname}/*/*/*${path.extname(path.basename(__filename))}`,
        ],
    };

    const specs = swaggerJsDoc(options);

    app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));

    app.get("/", (_, res) => {
        res.json({ message: "API Running ! " });
    });

    app.use("/api/v1", [usersRouter]);
};
