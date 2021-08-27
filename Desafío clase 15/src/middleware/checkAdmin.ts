import { Request, Response, NextFunction } from 'express';

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    const admin = req.body.admin.toLowerCase() == 'true';
    if (admin) {
        next();
    } else {
        return res.json({
            error: 'No tiene privilegios de administrador',
        });
    }
};