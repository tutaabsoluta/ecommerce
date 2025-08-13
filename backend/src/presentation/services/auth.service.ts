
import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongo";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";



export class AuthService {


    public async registerUser( registerUserDto: RegisterUserDto ) {
        
        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if ( existUser ) throw CustomError.conflict('The user already exists');

        try {

            const user = await new UserModel( registerUserDto );

            user.password = BcryptAdapter.hashPassword( registerUserDto.password );

            await user.save();

            const { id, email } = user;

            const token = await JwtAdapter.generateToken({
                id: id
            });

            return {
                user: { id, email },
                token
            }
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    public async loginUser( loginUserDto: LoginUserDto ) {

        const user = await UserModel.findOne({ email: loginUserDto.email });

        if ( !user ) throw CustomError.notFound('User not found');

        try {
            
            const passwordMatch = BcryptAdapter.comparePassword(loginUserDto.password, user.password);
    
            if ( !passwordMatch ) throw CustomError.unauthorized('Invalid password');

            const token = await JwtAdapter.generateToken({
                id: user.id,
            })
    
            return {
                token: token
            }

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer(`${error}`);
        }

    }

}