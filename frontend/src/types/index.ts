
export type User = {
    email: string
    password: string
}

export type RegisterUser = Pick<User, 'email' > & {
    user: string
    password: string
    password_confirmation: string
}