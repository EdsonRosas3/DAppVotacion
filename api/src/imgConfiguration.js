//images
const multer = require("multer");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/storage/images"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

/* 
Esta funcion para redimencionar imagenes usa el modulo sharp que en su version 0.30.3 aun no es complatible con
la version 14 de node.js
export const helperImg = (filePath, fileName,direcotoryDestination,size=300)=>{
    return sharp(filePath)
            .resize(size)
            .toFile(path.join(__dirname, `/storage/optimizeimg/${direcotoryDestination}/${fileName}`))
} */

export const helperImg = async (
  filePath,
  fileName,
  direcotoryDestination,
  size = 300
) => {
  Jimp.read(filePath)
    .then((lenna) => {
      return lenna
        .resize(size, Jimp.AUTO) // resize
        .quality(60) // set JPEG quality
        .write(path.join(__dirname, `/storage/optimizeimg/${direcotoryDestination}/${fileName}`)); // save
    })
    .catch((err) => {
      console.error(err);
    });
};
//middleware
export const upload = multer({ storage });

export const deleteImage = (direccion) => {
  try {
    fs.unlinkSync(path.join(__dirname, `/storage/${direccion}`));
  } catch (error) {
    console.log(error);
  }
};
