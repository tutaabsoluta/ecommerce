import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SECRET = envs.JWT_SEED;

export class JwtAdapter {
  
  static async generateToken(payload: { id: string; }, duration: SignOptions['expiresIn'] = '2h'): Promise<string> {
    return jwt.sign(payload, JWT_SECRET as Secret, { expiresIn: duration });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET as Secret, (error, decoded) => {
        if (error) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
