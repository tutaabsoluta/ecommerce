
export type User = {
    user: string
    email: string
}

export type RegisterUser = Pick<User, 'email' | 'user' > & {
    password: string
    password_confirmation: string
}