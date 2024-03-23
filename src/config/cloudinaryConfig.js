// config/cloudinaryConfig.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dbs5gym0w',
  api_key: '657559134622854',
  api_secret: '2YUTrqWplQCVd3oa8b6fzxiomz4'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'productos',
    format: async (req, file) => 'png',
    public_id: (req, file) => {
      const randomName = uuidv4();
      return randomName;
    }
  }
});
const Team = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Mascoteh/Team',
    format: async (req, file) => 'png',
    public_id: (req, file) => {
      const randomName = uuidv4();
      return randomName;
    }
  }
});

const upload = multer({ storage: storage });
const uploadTeam = multer({ storage: Team });

module.exports = { upload, uploadTeam };
