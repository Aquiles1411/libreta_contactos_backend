const router = require('express').Router();

const { Telefono } = require('../../contactosBD');

const {check, validationResult} = require('express-validator');

router.post('/', [
    check('idcontactos','el id del contacto no es un numero o no se ha digitado').not().isEmpty().isInt(),
] ,async (req, res) =>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errores: errors.array()});
    }

    const validarNum = await Telefono.findOne({where: {
        idtel: req.body.idtel
    }});

    if (validarNum) {
        return res.status(422).json({messange: "El numero del contacto ya se encuetra registrado"});
    }
 
     const nnumero = await Telefono.create(req.body);
     res.json(nnumero);
});

router.delete('/:idtel',async (req,res) => {

    if (isNaN(req.params.idtel)) {
        return res.status(422).json({messange: "El valor enviado no es un numero"});
    }

    const validarCont = await Telefono.findOne({where: {
        idtel: req.params.idtel,
    }});

    if (!validarCont) {
        return res.status(422).json({messange: "El numero no se encuetra registrado"});
    }

    await Telefono.destroy({
        where: {
            idtel: req.params.idtel,
        }
    });
    res.json({success: 'Se ha borrado el numero del contacto'});
});

module.exports = router;