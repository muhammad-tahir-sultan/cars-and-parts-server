import {Request, Response} from 'express';
import admin from "firebase-admin";
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userList = await admin.auth().listUsers();
        const users = userList.users.filter(user => user.uid !== req.body.adminId)

        res.status(200).json({
            success: true,
            users,
            error: null
        })
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
};
export const getProfile = async (req: Request, res: Response) => {
    try {
        const user = await admin.auth().getUser(req.body.adminId)
        res.status(200).json({
            success: true,
            user,
            error: null
        })
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await admin.auth().createUser({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName
        });
        await admin.auth().setCustomUserClaims(user.uid,{
            scopes: req.body.scopes,
        })
        res.status(201).json({
            success: true,
            user: user,
            error: null
        })
    } catch (e) {
        res.status(400).json(e)
    }
};
export const editUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const user = await admin.auth().updateUser(userId,{
            displayName: req.body.displayName
        });
        await admin.auth().setCustomUserClaims(userId,{
            scopes: req.body.scopes,
        })
        res.status(200).json({
            success: true,
            user: user,
            error: null
        })
    } catch (e) {
        res.status(400).json(e)
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await admin.auth().deleteUser(req.params.userId)
        res.status(200).json({
            success: true,
            error: null
        })
    } catch (e) {
        res.status(400).json(e)
    }
};

// New function to set admin permissions
export const setAdminPermissions = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const { isAdmin } = req.body;
        
        // Define admin scopes
        const adminScopes = [
            'add-product',
            'edit-product',
            'delete-product',
            'add-category',
            'add-user',
            'edit-user',
            'delete-user'
        ];
        
        // Define regular user scopes (optional)
        const userScopes = [];
        
        // Set custom claims based on isAdmin flag
        await admin.auth().setCustomUserClaims(userId, {
            scopes: isAdmin ? adminScopes : userScopes
        });
        
        res.status(200).json({
            success: true,
            message: `Permissions ${isAdmin ? 'granted' : 'revoked'} successfully`
        });
    } catch (e) {
        console.error('Error setting permissions:', e);
        res.status(500).json({
            success: false,
            message: 'Failed to set permissions',
            error: e instanceof Error ? e.message : 'Unknown error'
        });
    }
};