const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({email}); //para mirar si el email que se quiere registrar ya esta registrado

        if(usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            });
        }

        usuario = new Usuario (req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt); 

        await usuario.save();

        //Generar JWT (jason web token)
        const token = await generarJWT(usuario.id, usuario.name);


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }
        // condifrmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //Generar JWT (jason web token)
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const revalidarToken = async (req, res = response) => {

    const {uid, name} = req;

    //Generar un nuevo JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

const getUsuarios = async (req, res = response) =>{

    const usuarios  = await Usuario.find()
                                // .populate('user', 'name');
    const nameUser = usuarios.map( (user) => (
        {
            uid: user._id,
            name: user.name,
            email: user.email
        }
    ))

    res.json({
        ok: true,
        usuarios: nameUser
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    getUsuarios
}










// const crearUsuario = (req, res = response) => {
//     const { name, email, password } = req.body;

//     // if ( name.length < 3 ){ // forma manual de manejar errores
//     //     return res.status(400).json({
//     //         ok: false,
//     //         msg: 'el nombre debe tener mas de 3 letras'
//     //     })
//     // }

//     // manejo de errores
//     // const errors = validationResult(req);
    
//     // if( !errors.isEmpty() ) {
//     //     return res.status(400).json({
//     //         ok: false,
//     //         errors: errors.mapped()
//     //     })
//     // }

//     res.status(201).json({
//         ok: true,
//         mgs: 'register',
//         name,
//         email,
//         password
//     })
// }