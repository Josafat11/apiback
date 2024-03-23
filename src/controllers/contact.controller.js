import Contacto from '../models/contact.model';

export const getContactDetails = async (req, res) => {
    try {
        const contactDetails = await Contacto.findOne();
        res.status(200).json(contactDetails);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los detalles de contacto" });
    }
};

export const createContacto = async (req, res) => {
    try {
        const { direccion, correoElectronico, telefono } = req.body;
        const newContacto = new Contacto({ direccion, correoElectronico, telefono });
        const savedContacto = await newContacto.save();
        res.status(201).json(savedContacto);
    } catch (error) {
        res.status(500).json({ message: "Error al guardar el contacto" });
    }
};

export const updateContactDetails = async (req, res) => {
    try {
        const updatedContact = await Contacto.findOneAndUpdate({}, req.body, { new: true });
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar los detalles de contacto" });
    }
};

export const deleteContacto = async (req, res) => {
    try {
        await Contacto.deleteMany(); // Borra todos los detalles de contacto, ya que no hay una forma específica de identificarlos
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar los detalles de contacto" });
    }
};
