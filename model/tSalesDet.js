import Sequelize from "sequelize";
import db from "../config/database.js";
import Sales from "./tSales.js";
import Barang from "./mBarang.js";
const { DataTypes } = Sequelize;

const TSalesDet = db.define('t_sales_det', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    sales_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    barang_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    harga_bandrol: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    diskon_pct: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    diskon_nilai: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    harga_diskon: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    total: {
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
Sales.hasMany(TSalesDet, {
    foreignKey: 'sales_id'
});
Barang.hasMany(TSalesDet, {
    foreignKey: 'barang_id'
});

export default TSalesDet;
(async () => {
    await db.sync();
})();