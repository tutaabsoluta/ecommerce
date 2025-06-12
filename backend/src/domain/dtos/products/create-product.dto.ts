export class CreateProductDto {

    
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly imageUrl: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, description, price, imageUrl } = object;

    if (!name || name.trim().length === 0) {
      return ['The name property is required', undefined];
    }

    if (!description || description.trim().length === 0) {
      return ['The description property is required', undefined];
    }

    if (price == null || isNaN(price) || price <= 0) {
      return ['The price must be a number greater than 0', undefined];
    }

    if (!imageUrl || imageUrl.trim().length === 0) {
      return ['The image URL property is required', undefined];
    }

    return [undefined, new CreateProductDto(name, description, price, imageUrl)];
  }
}
