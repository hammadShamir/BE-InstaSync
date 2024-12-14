import "reflect-metadata";
import express from "express";
import * as bodyParser from "body-parser";
import routes from "./middleware/routes";
import { notFoundHandler } from "./middleware/invalidRoute";
import errorMiddleware from "./middleware/error";
import responseMiddleware from "./middleware/response";
import paginationMiddleware from "./middleware/pagination";
import cors from "cors";
import { AppDataSource } from "./data-source";

const app = express();

const PORT = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(async () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(paginationMiddleware);
    app.use("/api/v1", routes);
    app.use(errorMiddleware);
    app.use(notFoundHandler); //for unknown route
    app.use(responseMiddleware);
    app.listen(PORT);
    console.log(`Express server has started on port ${PORT}.`);
  })
  .catch((error) => console.log("connection error:", error));
