
export type User = {
    email: string
    password: string
}

export type RegisterUser = Pick<User, 'email' > & {
    user: string
    password: string
    password_confirmation: string
}

export type AuthUser = {
  user: string;
  email: string;
  id?: string;
}


export type Product = {
  id?: number
  _id?: number
  name: string
  price: number
  description?: string
  imageUrl?: string
}

