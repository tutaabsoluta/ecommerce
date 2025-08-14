import { CustomError } from "../errors/custom.error";

export class UserEntity {

    
    constructor(
        public id: string,
        public email: string,
        public password: string,
        public role?: string,
    ) { }


    public static fromObject( object: { [ key: string ]: any } ) {

        const { id, _id, email, password, role } = object;

        if ( !id && _id ) throw CustomError.badRequest('Missing id');
        if ( !email ) throw CustomError.badRequest('Missing email');
        if ( !password ) throw CustomError.badRequest('Missing password');

        return new UserEntity( id || _id, email, password, role );

    }
}