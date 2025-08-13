

export class RegisterUserDto {

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {

        if (!object) return ['Missing name, email and password', undefined]

        const { name, email, password } = object;

        if (!name) return ['Missing name'];

        if (!email) return ['Missing email'];

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return ['Invalid email format'];

        if (!password) return ['Missing password'];

        if (password.length < 8) return ['The password is too short'];


        return [undefined, new RegisterUserDto(name, email, password)];

    }
}