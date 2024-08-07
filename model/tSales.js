import Sequelize from "sequelize";
import db from "../config/database.js";
import Customer from "./mCustomer.js";
const { DataTypes } = Sequelize;

const TSales = db.define('t_sales', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    kode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tgl: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    cust_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    diskon: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    ongkir: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    total_bayar: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updateAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    freezeTableName: true
})
Customer.hasMany(TSales, {
    foreignKey: 'cust_id'
});

export default TSales;
(async () => {
    await db.sync();
})();