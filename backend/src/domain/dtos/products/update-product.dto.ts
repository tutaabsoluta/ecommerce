export class UpdateProductDto {


  private constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly description?: string,
    public readonly price?: number,
    public readonly imageUrl?: string,
  ) {}


  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.name !== undefined) returnObj.name = this.name;
    if (this.description !== undefined) returnObj.description = this.description;
    if (this.price !== undefined) returnObj.price = this.price;
    if (this.imageUrl !== undefined) returnObj.imageUrl = this.imageUrl;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { id, name, description, price, imageUrl } = props;

    if (!id || typeof id !== 'string') return ['The id must be a valid string'];

    if (
      name === undefined &&
      description === undefined &&
      price === undefined &&
      imageUrl === undefined
    ) {
      return ['At least one property must be provided to update', undefined];
    }

    if (name !== undefined && name.trim().length === 0)
      return ['The name property cannot be empty', undefined];

    if (description !== undefined && description.trim().length === 0)
      return ['The description property cannot be empty', undefined];

    if (price !== undefined && (isNaN(price) || price <= 0))
      return ['The price must be a number greater than 0', undefined];

    if (imageUrl !== undefined && imageUrl.trim().length === 0)
      return ['The image URL cannot be empty', undefined];

    return [undefined, new UpdateProductDto(id, name, description, price, imageUrl)];
  }
}
