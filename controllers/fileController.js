const File = require('../models/fileModel');

const fileUpload = async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const file = new File({
            filename: originalname,
            path: path,
        });
        await file.save();
        res.status(200).send('Archivo subido correctamente');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fileUpload,
};
