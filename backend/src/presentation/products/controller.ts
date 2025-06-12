import { Request, Response } from "express"
import { ProductService } from "../services"
import { CreateProductDto, CustomError, UpdateProductDto } from "../../domain"


export class ProductsController {

    constructor(
        public readonly productService: ProductService
    ) { }

    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })
    }

    createProduct = (req: Request, res: Response) => {
        const [error, createProduct] = CreateProductDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.productService.createProduct(createProduct!)
            .then((product) => res.status(200).json(product))
            .catch((error) => this.handleError(error, res))
    }

    getProducts = (req: Request, res: Response) => {
        this.productService.getProducts()
            .then((products) => res.json(products))
            .catch((error) => this.handleError(error, res))
    }

    getProductById = (req: Request, res: Response) => {
        this.productService.getProductById(req.params.id)
            .then((product) => res.json(product))
            .catch((error) => this.handleError(error, res))
    }

    updateProduct = (req: Request, res: Response) => {
        const [error, updateProductDto] = UpdateProductDto.create({ id: req.params.id, ...req.body });

        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.productService.updateProduct(updateProductDto!)
            .then((updatedProduct) => res.json(updatedProduct))
            .catch((error) => this.handleError(error, res));
    };

    deleteProduct = (req: Request, res: Response) => {
        this.productService.deleteProduct(req.params.id)
            .then((product) => res.json(product))
            .catch((error) => this.handleError(error, res))
    }
}