import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization?.split(' ')[1];

    if (!idToken) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        if(decodedToken.auth_time === 0) {
            return res.status(401).json({ message: 'Token expired' });
        }
        req.body.adminId = decodedToken.uid;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default {verifyToken};