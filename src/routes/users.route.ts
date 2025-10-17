import express, {Router} from 'express';
import {createUser, deleteUser, editUser, getAllUsers, getProfile, setAdminPermissions} from "../controllers/users.controller";
import middlewares from "../utils/middlewares";

const router: Router = express.Router();

router.get('/', middlewares.verifyToken, getAllUsers);
router.get('/profile', middlewares.verifyToken, getProfile);
router.post('/', middlewares.verifyToken, createUser);
router.delete('/:userId', middlewares.verifyToken, deleteUser);
router.put('/:userId', middlewares.verifyToken, editUser);
router.post('/set-admin/:userId', middlewares.verifyToken, setAdminPermissions);

export default router;