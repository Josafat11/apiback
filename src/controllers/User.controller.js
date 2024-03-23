import User from "../models/User.model";
import Confirm from "../models/confirm.model";
import  jwt  from "jsonwebtoken";
import config from "../config";
import {verifyEmail} from "../middlewares/authEmail"
import WorkSpace from "../models/workSpace.model";
import { generateAuthToken } from "../middlewares/authJWT";
import crypto from 'crypto';

// Función para registrar un nuevo usuario
export const singUp = async (req, res) => {
    try {
        console.log("Datos recibidos del frontend:", req.body);
        const {
            nombre,
            apellidos,
            email,
            password,
            fechaNacimiento,
            nombreusuario,
            telefono,
            preguntaSecreta,
            respuestaSecreta // Agrega la respuesta a la pregunta secreta recibida del frontend
        } = req.body;
        
        if (!nombre || !apellidos || nombre.length < 3 || apellidos.length < 3) {
            return res.status(400).json({ message: "Datos Incompletos" });
        }        
        
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Crear un nuevo usuario con los datos proporcionados
        const newUser = new User({
            name: nombre,
            lastName: apellidos,
            email,
            password: await User.encryptPassword(password),
            fechaNacimiento,
            user: nombreusuario,
            telefono,
            preguntaSecreta,
            respuestaSecreta // Guarda la respuesta a la pregunta secreta en el nuevo usuario
        });

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();
        
        // Genera un token de autenticación
        const token = generateAuthToken(newUser._id);

        // Envía el token de autenticación en la respuesta
        res.status(200).json({ message: 'Usuario registrado exitosamente', token });

    } catch (error) {
        // Manejo de errores
        console.error('Error en la función signUp:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Función para iniciar sesión
// Función para iniciar sesión
export const singIn  = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        // Verificar si la contraseña es correcta
        const matchPassword = await User.comparePassword(password, user.password);

        if (!matchPassword) return res.status(400).json({ message: "Contraseña inválida", token: null });

        // Si la contraseña es correcta, enviar el token de autenticación junto con el rol del usuario
        const token = generateAuthToken(user._id, user.role);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token, role: user.role, id: user.id });
    } catch (error) {
        // Código de error 500 para errores internos del servidor
        // Se utiliza cuando no se puede determinar un código de estado más específico.
        res.status(500).json({ message: "Error interno del servidor" });
    }
}




export const confirmSingIn = async (req,res) =>{
    try{
        const {email,secretCode} = req.body;

        const response = await Confirm.findOne({secretCode})
        if (!response) return res.status(400).json({message:"No se encontro el codigo"})

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message:"usuario no encontrado"})
    
        // Crear un token para el usuario
        const token = jwt.sign({id: user._id},config.SECRET,{
            expiresIn: 86400
        })
        const deleteCode = await Confirm.findOneAndDelete({email,secretCode})

        res.status(200).json({token,message:"ok"});

    }catch(err){
        res.status(500).json({token:null,message:"Error interno del servidor"});
    }
    
    
}


export const getAll = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const forgotPassword = async (req,res) =>{
    try {
        const {email} = req.body;

        // Verificar si el usuario existe
        const response = await User.findOne({email})
        if (!response) return res.status(400).json({message:"Usuario no encontrado"})

        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigoSecreto = '';
        for (let i = 0; i < 8; i++) {
            codigoSecreto += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }

        await verifyEmail(email, codigoSecreto);

        res.status(200).json({message:'correcto'})

    } catch (error) {
        // Código de error 500 para errores internos del servidor
        // Se utiliza cuando no se puede determinar un código de estado más específico.
        res.status(500).json({message: "Error interno del servidor"});
    }   
}

export const forgotPasswordVerify = async (req,res) =>{
    try{
        const {email,secretCode} = req.body;

        const response = await Confirm.findOne({secretCode})
        if (!response) return res.status(400).json({message:"No se encontro el codigo"})

        const userData = await User.findOne({email});
        if(!userData) return res.status(400).json({message:'usuario no encontrado'})

        // Crear un token para el usuario
        const token = jwt.sign({id: userData._id},config.SECRET,{
            expiresIn: 300
        })

        const deleteCode = await Confirm.findOneAndDelete({email,secretCode})

        res.status(200).json({token,message:"ok"});


    }catch(err){
        res.status(500).json({token:null,message:"Error interno del servidor",err});
    }
    
}
export const updatePassword = async (req,res) =>{
    try{
        const {email,password} = req.body;

        const encrypt = await User.ecryptPassword(password)

        const response = await User.findOneAndUpdate({email},{password:encrypt})
        
        const token = jwt.sign({id: response._id},config.SECRET,{
            expiresIn: 86400
        })

        res.status(200).json({message:'ok', token})
        

    }catch(err){
        res.status(500).json({token:null,message:"Error interno del servidor"});
    }
}

export const getUser = async (req,res) =>{
   
    try {
        const token = req.headers["x-access-token"];
        
        if(!token) return res.status(403).json({message:"No token provider controlador"})
        
        const decode = jwt.verify(token,config.SECRET)
    
        const user = await User.findById(decode.id, {password:0})
    
        if(!user) return res.status(404).json({message:"no user found"})
    
        res.status(200).json({user});

    } catch (error) {
        res.status(500).json({message:"error interno del servidor"})
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error en la función getUserById:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para actualizar un usuario
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { name, lastName, email, password, role } = req.body;
        const updatedUserData = { name, lastName, email, password, role };
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario actualizado exitosamente", user: updatedUser });
    } catch (error) {
        console.error('Error en la función updateUser:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error('Error en la función deleteUser:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const getUserProfileByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }); // Busca al usuario por correo electrónico
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error en la función getUserProfileByEmail:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
  
  // Función para actualizar el perfil del usuario por su email
  export const updateUserProfile = async (req, res) => {
    try {
      const userEmail = req.params.userEmail; // Extraemos el email del usuario de los parámetros de la solicitud
      const { name, lastName, password, telefono } = req.body;
      
      // Creamos un objeto con los campos que se pueden actualizar
      const updatedUserData = {};
      
      // Solo permitimos actualizar los campos que son proporcionados en la solicitud
      if (name) updatedUserData.name = name;
      if (lastName) updatedUserData.lastName = lastName;
      if (password) updatedUserData.password = await User.encryptPassword(password);
      if (telefono) updatedUserData.telefono = telefono;
      
      // Actualizamos el perfil del usuario con los datos actualizados
      const updatedUser = await User.findOneAndUpdate({ email: userEmail }, updatedUserData, { new: true });
      
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      
      res.status(200).json({ message: "Perfil de usuario actualizado exitosamente", user: updatedUser });
    } catch (error) {
      console.error('Error en la función updateUserProfileByEmail:', error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };




// Función para generar un código único
const generateRecoveryCode = () => {
    return crypto.randomBytes(20).toString('hex');
};
export const requestPasswordRecovery = async (req, res) => {
    const { email } = req.body;

    try {
        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No se encontró ningún usuario con ese correo electrónico.' });
        }

        // Verificar si el usuario ya tiene un código de recuperación
        if (user.recoveryCode) {
            // Enviar el código de recuperación existente por correo electrónico
            const emailSent = await verifyEmail(email, user.recoveryCode);

            if (emailSent) {
                return res.status(200).json({ message: 'Se ha reenviado el código de recuperación a tu correo electrónico.' });
            } else {
                return res.status(500).json({ message: 'Hubo un error al reenviar el correo electrónico de recuperación.' });
            }
        }

        // Si el usuario no tiene un código de recuperación, generar uno nuevo
        const recoveryCode = generateRecoveryCode();

        // Almacenar el nuevo código de recuperación en el usuario
        user.recoveryCode = recoveryCode;
        await user.save();

        // Enviar el nuevo código de recuperación por correo electrónico
        const emailSent = await verifyEmail(email, recoveryCode);

        if (emailSent) {
            return res.status(200).json({ message: 'Se ha enviado un código de recuperación a tu correo electrónico.' });
        } else {
            return res.status(500).json({ message: 'Hubo un error al enviar el correo electrónico de recuperación.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Hubo un error al procesar tu solicitud.' });
    }
};



// Controlador para verificar y cambiar la contraseña del usuario
export const verifyAndChangePassword = async (req, res) => {
    const { email, secretCode: code, newPassword } = req.body;

    try {
        console.log("Código secreto recibido:", code); // Agrega esta línea para imprimir el código secreto recibido

        // Verificar si el código proporcionado por el usuario es correcto
        const user = await User.findOne({ email, recoveryCode: code });

        if (!user) {
            return res.status(400).json({ message: 'El código de verificación es incorrecto o ha expirado.' });
        }

        // El código es correcto, ahora cambiamos la contraseña del usuario

        // Encriptar la nueva contraseña
        const encryptedPassword = await User.encryptPassword(newPassword);

        // Actualizar la contraseña del usuario
        user.password = encryptedPassword;
        user.recoveryCode = undefined; // Eliminar el código de recuperación después de usarlo
        await user.save();

        return res.status(200).json({ message: 'Contraseña cambiada exitosamente.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Hubo un error al procesar tu solicitud.' });
    }
};


export const forgotPasswordBySecretQuestion = async (req, res) => {
    try {
        const { email } = req.body;

        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar si el usuario tiene una pregunta secreta establecida
        if (!user.preguntaSecreta || !user.respuestaSecreta) {
            return res.status(400).json({ message: "El usuario no tiene una pregunta secreta configurada" });
        }

        // Retornar la pregunta secreta del usuario
        res.status(200).json({ preguntaSecreta: user.preguntaSecreta });
    } catch (error) {
        console.error('Error en la función forgotPasswordBySecretQuestion:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



export const recoverPasswordBySecretQuestion = async (req, res) => {
    try {
        const { email, preguntaSecreta, respuestaSecreta, newPassword } = req.body;

        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar si la pregunta secreta y la respuesta coinciden con las del usuario
        if (user.preguntaSecreta !== preguntaSecreta || user.respuestaSecreta !== respuestaSecreta) {
            return res.status(400).json({ message: "La pregunta secreta o la respuesta no son correctas" });
        }

        // Encriptar y guardar la nueva contraseña
        user.password = await User.encryptPassword(newPassword);
        await user.save();

        res.status(200).json({ message: "Contraseña actualizada exitosamente" });
    } catch (error) {
        console.error('Error en la función recoverPasswordBySecretQuestion:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
