const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    // Otros campos que desees guardar sobre el archivo
});

const File = mongoose.model('File', fileSchema);

module.exports = File;