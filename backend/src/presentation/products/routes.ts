import { Router } from "express";
import { ProductsController } from "./controller";
import { ProductService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class ProductRoutes {

    static get routes(): Router {

        const router = Router();

        const productService = new ProductService()

        const productController = new ProductsController(productService);

        router.get('/', productController.getProducts);
        router.get('/:id', productController.getProductById);

        // Admin routes
        router.post('/', [AuthMiddleware.authorizeToken, AuthMiddleware.authorizeRole('ADMIN_ROLE')], productController.createProduct);
        router.put('/:id', [AuthMiddleware.authorizeToken, AuthMiddleware.authorizeRole('ADMIN_ROLE')], productController.updateProduct);
        router.delete('/:id', [AuthMiddleware.authorizeToken, AuthMiddleware.authorizeRole('ADMIN_ROLE')], productController.deleteProduct);

        return router;
    }
}