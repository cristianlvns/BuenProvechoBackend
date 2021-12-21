const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        //Generar payload
        const payload = {uid};

        //Firmar el jwt
        jwt.sign(payload, process.env.JWT_KEY, {
            //Tiempo de expiracion
            expiresIn: '20m'
        }, (err, token) => {
            if (err) {
                reject('No se generó el JWT');
            }
            else {
                resolve(token);
            }
        });
    });
}

const comprobarJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}