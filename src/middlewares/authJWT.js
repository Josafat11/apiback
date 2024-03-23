import jwt from "jsonwebtoken"
import config from "../config"
import UserModel from "../models/User.model";
import config2 from "../config2"; // Importa la configuración



export const verifyToken = async (req, res, next) => {
   try {
       const token = req.headers["x-access-token"];
       
       if (!token) return res.status(401).json({ message: "No token provider authjw" });
       
       const decoded = jwt.verify(token, config.SECRET);
       req.user = decoded; // Guarda la información del usuario en el objeto de solicitud para acceder a ella en otros middleware y controladores

       next();
   } catch (error) {
       return res.status(401).json({ message: 'Unauthorized' });
   }
}


export const getUserId = async (token) => {
   try {
      if (!token) return "no token";
      
      const decode = jwt.verify(token, config.SECRET);
  
      const user = await UserModel.findById(decode.id, { password: 0 });
  
      if (!user) return "no user found";

      return user._id; // Devuelve el ID del usuario

   } catch (error) {
      return null;
   }
}


export const isAdmin = (req, res, next) => {
   const userRole = req.user.role; // Obtén el rol del usuario del objeto de solicitud
   if (userRole !== "admin") {
      return res.status(403).json({ message: "Forbidden" }); // Si el usuario no es administrador, devuelva un código de estado 403 (Prohibido)
   }
   next();
}

 
 export const generateAuthToken = (userId, role) => {
   return jwt.sign({ id: userId, role: role }, config2.secretKey, { expiresIn: "1h" });
};
