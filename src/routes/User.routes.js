import { Router } from "express";
import * as userController from "../controllers/User.controller";
import * as jwt from "../middlewares/authJWT";

// Importa el middleware isAdmin
import { isAdmin } from "../middlewares/authJWT";

const router = Router();

// Rutas públicas
router.post('/signup', userController.singUp);
router.post('/signin', userController.singIn);
router.post('/signin/confirm', userController.confirmSingIn);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/forgotPassword/confirm', userController.forgotPasswordVerify);
router.post('/forgotPasswordEmail', userController.requestPasswordRecovery);
router.post('/changePassword', userController.verifyAndChangePassword);

router.post('/forgotPasswordBySecretQuestion', userController.forgotPasswordBySecretQuestion);
router.post('/recoverPasswordBySecretQuestion', userController.recoverPasswordBySecretQuestion);

// Rutas protegidas que requieren autenticación
router.get('/profile/:email', userController.getUserProfileByEmail); // Obtener perfil de usuario por correo electrónico
router.put('/profile', userController.updateUserProfile); // Actualizar perfil de usuario

// Rutas protegidas que requieren autenticación
router.put('/forgotPassword/update', jwt.verifyToken, userController.updatePassword);
router.get('/', jwt.verifyToken, userController.getUser);

// Rutas adicionales para la administración de usuarios (requieren autenticación y permisos de administrador)
// Rutas protegidas que requieren autenticación y permisos de administrador
router.get('/users', userController.getAll);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId',  userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);


export default router;
