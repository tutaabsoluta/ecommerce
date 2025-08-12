import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { ProductRoutes } from "./products/routes";



export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use( '/auth', AuthRoutes.routes );
        router.use( '/products', ProductRoutes.routes );

        return router
    }
}