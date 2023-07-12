
import express from "express";
import appConfig from "./2-utils/app-config";
import dal from "./2-utils/dal"
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import controller from "./6-controllers/controller";
import cors from "cors"

dal.connect()

const server = express();
server.use(cors())
server.use(express.json()); // creates request.body object if exists
server.use("/api", controller);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

