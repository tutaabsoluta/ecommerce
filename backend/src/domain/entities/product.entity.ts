import { CustomError } from "../errors/custom.error";


export class ProductEntity {

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public imageUrl: string,
  ) {}

  public static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, description, price, imageUrl } = object;

    const validId = id || _id;
    if (!validId) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');
    if (!description) throw CustomError.badRequest('Missing description');
    if (price === undefined || isNaN(price)) throw CustomError.badRequest('Invalid or missing price');
    if (!imageUrl) throw CustomError.badRequest('Missing imageUrl');

    return new ProductEntity(validId.toString(), name, description, price, imageUrl);
  }
}
