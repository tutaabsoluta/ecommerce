import { Router } from "express";
import { ProductsController } from "./controller";
import { ProductService } from "../services";
import { authenticateToken, authorizeAdmin } from "../middlewares/auth.middleware";



export class ProductRoutes {



    static get routes(): Router {

        const router = Router();

        const productService = new ProductService()

        const productController = new ProductsController(productService);

        router.get('/', productController.getProducts);
        router.get('/:id', productController.getProductById);

        // Admin routes
        router.post('/', authenticateToken, authorizeAdmin, productController.createProduct);
        router.put('/:id', authenticateToken, authorizeAdmin, productController.updateProduct);
        router.delete('/:id', authenticateToken, authorizeAdmin, productController.deleteProduct);

        return router;
    }
}