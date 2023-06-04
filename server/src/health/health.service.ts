import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class HealthService {
    async check(req: Request, res: Response) {
        return res.status(200).send("OK");
    }
}
