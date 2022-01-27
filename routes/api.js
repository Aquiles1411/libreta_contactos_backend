const router = require('express').Router();

//importar el gestor
const apiContRouter = require('./api/contactos');
const apiTelRouter = require('./api/telefonos');

//Enviar al gestor el llamado correspondiente
router.use('/contactos', apiContRouter);
router.use('/telefonos', apiTelRouter);

module.exports = router;