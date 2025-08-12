

export class RegisterUserDto {

    constructor(
        public readonly user: string,
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {

        if (!object) return ['Missing user, email and password', undefined]

        const { user, email, password } = object;

        if (!user) return ['Missing user'];

        if (!email) return ['Missing email'];

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return ['Invalid email format'];

        if (!password) return ['Missing password'];

        if (password.length < 8) return ['The password is too short'];


        return [undefined, new RegisterUserDto( user, email, password )];

    }
}