import { Router, Request, Response } from "express";
import team from './team';
import match from './match';


const routes = Router();

routes.use("/team", team);
routes.use("/match", match);

routes.use((req: Request, res: Response) => res.json({ error: "Unknown Request" }));

export default routes;
