
import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { UserModel } from "../../data/mongo";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";



export class AuthService {


    public async registerUser( registerUserDto: RegisterUserDto ) {
        
        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if ( existUser ) throw CustomError.conflict('The user already exists');

        try {

            const user = await new UserModel( registerUserDto );

            user.password = BcryptAdapter.hashPassword( registerUserDto.password );

            await user.save();

            const { password, ...userEntity } = UserEntity.fromObject( user );


            return {
                user: userEntity
            }
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    public async loginUser() {

    }

}