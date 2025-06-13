import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('⛔ No token provided');
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  const decoded = await JwtAdapter.validateToken<{ id: string; role: string }>(token);

  if (!decoded) {
    console.log('⛔ Token inválido o expirado');
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }

  req.user = decoded;
  next();
}

export function authorizeAdmin(req: AuthRequest, res: Response, next: NextFunction): void {


  if (req.user?.role !== 'ADMIN_ROLE') {
    console.log('⛔ Acceso denegado: no es admin');
    res.status(403).json({ message: 'Access denied. Admins only.' });
    return; 
  }

  console.log('✅ Acceso autorizado: es admin');
  next();
}
