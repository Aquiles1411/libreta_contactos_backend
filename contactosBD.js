const Sequelize = require('sequelize');

const ContsModel = require('./models/contactos');
const TelModel = require('./models/telefonos');

/*TelModel.belongsTo(ContsModel,{foreignKey: "idcontactos"});
ContsModel.hasMany(TelModel,{foreignKey: "idcontactos"});*/

//credenciales BD
const sequelize = new Sequelize('agenda','root','',{
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    },
});

//lamada de modelos
const Contacto = ContsModel(sequelize, Sequelize);
const Telefono = TelModel(sequelize, Sequelize);

//relaciones
Telefono.belongsTo(Contacto,{foreignKey: "idcontactos", onDelete: 'CASCADE'});
Contacto.hasMany(Telefono,{foreignKey: "idcontactos", onDelete: 'CASCADE'});

//sincronizacion
sequelize.sync({force: false})
.then( ()=>{console.log('Sincronizacion completa');});

module.exports = {
    Contacto,
    Telefono
};