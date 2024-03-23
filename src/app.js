import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//importacion de las rutas
// Importación de las rutas
import user from "./routes/User.routes";
import workspace from "./routes/workspace.routes";
import products from "./routes/producs.routes";
import comment from "./routes/comment.routes";
import contact from "./routes/contact.routes";
import petDoor from "./routes/PetDoor.routes"; 
import nosotros from "./routes/nosotros.routes"; 
import politicas from "./routes/politicas.routes"; 
import faq from "./routes/faq.routes"; 

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({
        msg: "Welcome to petApi"
    });
});

// Rutas
app.use('/api/auth', user);
app.use('/api/products', products);
app.use('/api/workspace', workspace);
app.use('/api/comment', comment);
app.use('/api/contact', contact);
app.use('/api/petdoor', petDoor); 
app.use('/api/nosotros', nosotros)
app.use('/api/politicas', politicas)
app.use('/api/faq', faq)

app.use((req, res, next) => {
    res.status(404).json({ message: "Routa incorrecta" });
});

export default app;
