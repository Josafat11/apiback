import PetDoor from "../models/PetDoor.model";

export const createPetDoor = async (req, res) => {
    try {
        const { mac, name, closingTime, userId } = req.body;

        // Crear una nueva puerta asociada con el usuario proporcionado
        const newPetDoor = new PetDoor({
            userId,
            mac,
            name,
            closingTime
        });

        // Guardar la nueva puerta en la base de datos
        await newPetDoor.save();

        // Enviar una respuesta exitosa
        res.status(200).json({ message: 'Puerta registrada exitosamente' });

    } catch (error) {
        // Manejo de errores
        console.error('Error en la función createPetDoor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const getAllPetDoors = async (req, res) => {
    try {
        // Obtener el ID del usuario autenticado
        const userId = req.user._id;

        // Buscar todas las puertas asociadas con el usuario autenticado
        const allPetDoors = await PetDoor.find({ userId });
        res.status(200).json(allPetDoors);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getPetDoorById = async (req, res) => {
    try {
        const petDoorId = req.params.petDoorId;

        // Buscar la puerta por ID sin verificar el usuario asociado
        const petDoor = await PetDoor.findById(petDoorId);
        if (!petDoor) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }
        res.status(200).json(petDoor);
    } catch (error) {
        console.error('Error en la función getPetDoorById:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updatePetDoor = async (req, res) => {
    try {
        const petDoorId = req.params.petDoorId;
        const { mac, name, closingTime } = req.body;
        const userId = req.user._id;

        // Actualizar la puerta solo si pertenece al usuario autenticado
        console.log("Datos recibidos para actualización:", { petDoorId, mac, name, closingTime, userId });

        const updatedPetDoor = await PetDoor.findOneAndUpdate({ _id: petDoorId, userId }, { mac, name, closingTime }, { new: true });
        if (!updatedPetDoor) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }

        console.log("Puerta actualizada:", updatedPetDoor);
        res.status(200).json({ message: "Puerta actualizada exitosamente", petDoor: updatedPetDoor });
    } catch (error) {
        console.error('Error en la función updatePetDoor:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const deletePetDoor = async (req, res) => {
    try {
        const petDoorId = req.params.petDoorId;
        const userId = req.user._id;

        // Eliminar la puerta solo si pertenece al usuario autenticado
        const deletedPetDoor = await PetDoor.findOneAndDelete({ _id: petDoorId, userId });
        if (!deletedPetDoor) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }
        res.status(200).json({ message: "Puerta eliminada exitosamente" });
    } catch (error) {
        console.error('Error en la función deletePetDoor:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }



    
};

// pruebas
export const updatePetDoorData = async (req, res) => {
    try {
        const petDoorId = "65f3aa4b4a8f1b582066b244"; // ID de la puerta a actualizar (por el momento, puede ser estática)
        const { state, danger, automaticMode } = req.body;
        console.log(req.body);
        // Actualizar los datos de la puerta
        const updatedPetDoor = await PetDoor.findByIdAndUpdate(petDoorId, { state, danger, automaticMode }, { new: true });

        if (!updatedPetDoor) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }

        res.status(200).json({ message: "Datos de la puerta actualizados exitosamente", petDoor: updatedPetDoor });
    } catch (error) {
        console.error('Error en la función updatePetDoorData:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const updateClosingTime = async (req, res) => {
    try {
        const petDoorId = "65f3aa4b4a8f1b582066b244"; // ID de la puerta a actualizar (por el momento, puede ser estática)
        const { closingTime } = req.body;

        const updatedPetDoor = await PetDoor.findByIdAndUpdate(
            petDoorId, 
            { closingTime }, 
            { new: true }
        );

        if (!updatedPetDoor) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }

        res.status(200).json({ message: "Hora de cierre actualizada exitosamente", petDoor: updatedPetDoor });
    } catch (error) {
        console.error('Error en la función updateClosingTime:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const getClosingTime = async (req, res) => {
    try {
        const petDoorId = "65f3aa4b4a8f1b582066b244"; // ID de la puerta a consultar (por el momento, puede ser estática)

        const petDoor = await PetDoor.findById(petDoorId);

        if (!petDoor) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }

        const closingTime = petDoor.closingTime;

        res.status(200).json({ closingTime });
    } catch (error) {
        console.error('Error en la función getClosingTime:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
