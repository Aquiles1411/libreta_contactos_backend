//tabla contactos a generar

module.exports = (sequelize, type) => {
    return sequelize.define('contacto',{
        id:{type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombres: {type: type.STRING,
            allowNull: false
        },
        apellidos: type.STRING,
        tipoCon: type.STRING,
        correo: type.STRING,
    })
};