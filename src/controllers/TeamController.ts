import AppDataSource from '../data-source';
import { Request, Response } from 'express';
import { Team } from "../entities/Team";
import { ILike } from "typeorm";

class TeamController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        const teams = await AppDataSource.getRepository(Team).find({
            order: {
                name: 'ASC'
            }
        })
        return res.json({ teams })
    }
    public async getAllByTerm(req: Request, res: Response): Promise<Response> {
        const term = req.params.termo;
        const teams = await AppDataSource.getRepository(Team).find({
            where: { name: ILike(`%${term}%`) },
            order: {
                name: 'ASC'
            }
        })
        return res.json({ teams })
    }
    public async create(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;
        console.log(name)
        const team = new Team()
        team.name = name
        const savedTeam = await AppDataSource.getRepository(Team).save(team).catch((e) => {
            console.log("detail", e.errno)
            if (e.errno) {
                if (e.errno == 19) {
                    return { error: 'Team name already exists' };
                } else {
                    return { error: 'Error' };
                }
            }
        })
        return res.json({ team: savedTeam })
    }
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, name } = req.body;
        console.log(name)
        const team = await AppDataSource.getRepository(Team).findOneBy({ id: id })
        team.name = name
        const updatedTeam = await AppDataSource.getRepository(Team).save(team).catch((e) => {
            if (e.errno) {
                if (e.errno == 19) {
                    return { error: 'Team name already exists' };
                } else {
                    return { error: 'Error' };
                }
            }
        })
        return res.json({ team: updatedTeam })
    }
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        const deletedTeam = await AppDataSource.getRepository(Team).delete({ id: id })

        return res.json({ team: deletedTeam })
    }
}

export default new TeamController();