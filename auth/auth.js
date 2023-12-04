const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'ProjectsSecretPassword'

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).send("Falta el token de Autenticación");
        return;
    }

    const [type, token] = authHeader.split(' ');

    if(type !== "Bearer"){
        res.status(401).send('Tipo de Token no es valido');
        return;
    }

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }catch{
        res.status(401).send('Token invalido');
    }
}

exports.signUp = async (req, res) => {
    try {
        // Verificar si el correo ya existe en la base de datos
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Validar si el correo contiene el símbolo "@"
        if (!req.body.email || req.body.email.indexOf('@') === -1) {
            return res.status(400).json({ error: 'Ingrese un correo válido' });
        }

        // Si el correo no está en la base de datos y contiene "@", proceder a crear el usuario
        const user = await new User({
            email: req.body.email,
            password: req.body.password
        });
        const savedUser = await user.save();
        const payload = { id: savedUser.id, email: savedUser.email };
        const token = jwt.sign(payload, SECRET_KEY);
        res.status(200).json({ savedUser, token });
    } catch (err) {
        console.log(err);
        res.status(500).send('signUp: Ocurrió un error ' + err);
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send('Credenciales inválidas');
        }

        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, SECRET_KEY);

        // Devolver solo el token en la respuesta
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        // Manejar errores de manera más específica
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(400).send('El correo ya está registrado');
        }
        res.status(500).send('Ocurrió un error en el inicio de sesión');
    }
}
