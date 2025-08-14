import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config';
import { UserEntity } from '../../domain';
import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../../data/mongo';


declare global {
  namespace Express {
    interface Request {
      user?: UserEntity
    }
  }
}

export class AuthMiddleware {

  public static authorizeToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


    try {
      const bearer = req.headers.authorization

      if (!bearer) {
        res.status(401).json({ error: "There is no Bearer" });
        return;
      }
      const [, token] = bearer!.split(' ');

      if (!token) {
        res.status(401).json({ error: "There is no Token" });
        return;
      }
      const decoded = await JwtAdapter.validateToken(token);

      if (!decoded) {
        res.status(401).json({ error: "Invalid Token" })
        return;
      }

      const { id } = decoded as JwtPayload;

      const user = await UserModel.findById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const userEntity = await UserEntity.fromObject(user);


      req.user = userEntity;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }

  }

  static authorizeRole = (role: string) => {

    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      if (req.user.role !== role) {
        res.status(403).json({ message: `Access denied. Only Admins can access this resource` });
        return;
      }

      next();
    };
  }
}

