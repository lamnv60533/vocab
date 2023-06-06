import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { HealthService } from "./health.service";

@Controller("health")
export class HealthController {
    constructor(private healthService: HealthService) {}

    @Get("/")
    async health(@Req() req: Request, @Res() res: Response) {
        return this.healthService.check(req, res);
    }
}
