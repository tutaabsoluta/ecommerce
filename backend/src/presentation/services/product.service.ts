import mongoose from "mongoose";
import { ProductModel } from "../../data/mongo/models/product.model";
import { CreateProductDto, CustomError, UpdateProductDto } from "../../domain";
import { ProductEntity } from "../../domain/entities/product.entity";



export class ProductService {


    public async createProduct(createProductDto: CreateProductDto) {

        try {

            const product = new ProductModel(createProductDto);

            await product.save();

            const productEntity = ProductEntity.fromObject(product)

            return {
                productEntity
            }

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async getProducts() {
        try {

            const products = await ProductModel.find();
            if (products.length === 0) throw CustomError.notFound('No products found, try creating one');
            return products;

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async getProductById(id: string) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw CustomError.notFound('Product not found'); // o un error específico de id inválido
            }

            const product = await ProductModel.findById(id);

            if (!product) throw CustomError.notFound('Product not found');

            return product;

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async updateProduct(updateProductDto: UpdateProductDto) {
        try {
            const { id, ...fieldsToUpdate } = updateProductDto.values;

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                updateProductDto.id,
                fieldsToUpdate,
                { new: true }
            );

            if (!updatedProduct) throw CustomError.notFound('Product not found');

            const productEntity = ProductEntity.fromObject(updatedProduct);

            return productEntity;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async deleteProduct(id: string) {

        try {
            const product = await ProductModel.findById(id);
            if (!product) throw CustomError.notFound('Product not found');

            await ProductModel.findByIdAndDelete(product.id)

            return { message: 'Book deleted succesfully' }

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer(`${error}`)
        }

    }
}