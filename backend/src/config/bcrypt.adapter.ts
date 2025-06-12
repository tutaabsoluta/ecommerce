import { compareSync, genSaltSync, hashSync } from 'bcryptjs'


export class BcryptAdapter {


    public static hashPassword( password: string ): string {

        const salt = genSaltSync();

        return hashSync( password, salt );

    }

    public static comparePassword( password: string, hash: string ) {

        return compareSync(password, hash)

    }
}