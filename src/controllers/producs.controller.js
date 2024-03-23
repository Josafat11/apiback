import Product from '../models/products.model';
import { upload } from '../config/cloudinaryConfig';

export const createProduct = async (req, res) => {
    const { name, category, price, description } = req.body;
    try {
        // Utiliza multer para subir la imagen antes de crear el producto en la base de datos
        upload.single('imagen')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Error uploading image" });
            }
            const imgURL = req.file.path; // La URL de la imagen subida en Cloudinary
            const newProduct = new Product({ name, category, price, description, imgURL });
            const productSaved = await newProduct.save();
            res.status(201).json(productSaved);
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
};

export const getProductById = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
};

export const updateProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
            new: true
        });
        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete(productId);
        if (!deleteProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
