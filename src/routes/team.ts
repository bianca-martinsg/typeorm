import { Router } from "express";
import TeamController from "../controllers/TeamController";

const routes = Router();

routes.get('/', TeamController.getAll);
routes.post('/', TeamController.create);
routes.get('/:term', TeamController.getAllByTerm);
routes.put('/', TeamController.update);
routes.delete('/', TeamController.delete);

export default routes;