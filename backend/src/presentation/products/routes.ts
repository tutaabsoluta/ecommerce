import { Router } from "express";
import { ProductsController } from "./controller";
import { ProductService } from "../services";



export class ProductRoutes {



    static get routes(): Router {

        const router = Router();

        const productService = new ProductService()

        const productController = new ProductsController( productService );

        router.get('/', productController.getProduct );
        router.get('/:id', productController.getProductById);

        router.post('/', productController.createProduct);

        router.put('/:id', productController.updateProduct);

        router.delete('/:id', productController.deleteProduct);

        return router;
    }
}