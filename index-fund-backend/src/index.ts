import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";

import * as routes from "./routes";

import * as indexFundController from "./modules/index-fund/index-fund.controller";

import 'reflect-metadata';
import 'es6-shim';

import { errorHandler } from "./utils/error-handler/error-handler";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.use(errorHandler);

const port = process.env.SERVER_PORT; // default port to listen

app.set("views", path.join( __dirname, "views"));
app.set("view engine", "ejs");

routes.register(app);

indexFundController.indexFundController(app);
// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});