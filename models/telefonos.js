

module.exports = (sequelize, type) => {
    return sequelize.define('telefono',{
        idtel:{type: type.BIGINT,
            primaryKey: true
        },
        etiqueta: type.STRING,
        direccion: type.STRING,
        idcontactos: {type: type.INTEGER,
            allowNull: false,
        }
    })
};