const router = require('express').Router();

const { Contacto } = require('../../contactosBD');
const { Telefono } = require('../../contactosBD');

//Validaciones
const {check, param ,validationResult} = require('express-validator');

//Obtener contacto
router.get('/', async (req, res) => {
    //se unen las tablas y se envia el array en un json
    const contactos = await Contacto.findAll({include: [Telefono]});
    res.json(contactos);
});


//Crear Contacto
router.post('/', [
    check('nombres','el nombre no puede estar vacio').not().isEmpty(),
    check('idtel','debe de asignarle un numero al contacto').not().isEmpty().isInt()
] ,async (req, res) =>{
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errores: errors.array()});
    }

    const validarCont = await Contacto.findOne({where: {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos
    }});

    if (validarCont) {
        return res.status(422).json({messange: "El contacto se encuetra registrado"});
    }

   const validarNum = await Telefono.findOne({where: {
       idtel: req.body.idtel
   }});
   
   if (validarNum) {
    return res.status(422).json({messange: "El numero del contacto ya se encuetra registrado"});
   }

    const ncontacto = await Contacto.create(req.body);
    res.json(ncontacto);
       
    const nnumero = await Telefono.create(req.body);
    res.json(nnumero);
    
    
});

//Editar contacto
router.put('/:id', [
    check('id','no se ha selecionado un contacto').not().isEmpty().isInt()
] ,async (req, res) =>{
    await Contacto.update(req.body,{
        where: { id: req.params.id}
    });
    //res.json(req.body);
    res.json({success: 'Se ha modificado el contacto'});

    await Telefono.update(req.body,{
        where: { idcontactos: req.params.id}
    });
    //res.json({success: 'Se ha modificado el numero'});
});


//Eliminar contacto
router.delete('/:id', async (req,res) => {

    if (isNaN(req.params.id)) {
        return res.status(422).json({messange: "El valor enviado no es un numero"});
    }

    const validarCont = await Contacto.findOne({where: {
        id: req.params.id,
    }});

    if (!validarCont) {
        return res.status(422).json({messange: "El contacto no se encuetra registrado"});
    }

    await Contacto.destroy({
        where: {id: req.params.id}
    });
    res.json({success: 'Se ha borrado el contacto'});
});

module.exports = router;