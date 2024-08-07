import TSales from "../model/tSales.js"
import MCustomer from "../model/mCustomer.js"
import { Op } from 'sequelize'; // Import Op from Sequelize
import sequelize from "../config/database.js"; // Import sequelize if needed for Op

export const getListSales = async (req, res) => {
    try {
        const query = `
            SELECT
             t.id,
             t.kode,
             t.tgl,
             t.subtotal,
             t.diskon,
             t.ongkir,
             t.total_bayar,
             t.cust_id,
             m.nama,
             ts.qty,
             SUM(CAST(ts.qty AS INTEGER)) AS total_qty,
             SUM(CAST(ts.harga_diskon AS INTEGER)) AS total_harga_diskon

            FROM t_sales t
            LEFT JOIN m_customer m ON m.id = t.cust_id
            LEFT JOIN t_sales_det ts ON ts.sales_id = t.id
            GROUP BY t.id, t.kode, t.tgl, t.subtotal, t.diskon, t.ongkir, t.total_bayar, t.cust_id, m.nama, ts.qty;

        `;

        const [results, metadata] = await sequelize.query(query);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const generateKodeSales = async () => {
    const date = new Date();
    const yearMonth = date.toISOString().slice(0, 7).replace("-", "");
    const lastSales = await TSales.findOne({
        order: [['kode', 'DESC']],
        where: {
            kode: {
                [Op.like]: `${yearMonth}%`
            }
        }
    });

    let newNumber;
    if (lastSales) {
        const lastKode = lastSales.kode;
        const lastNumber = parseInt(lastKode.slice(-4), 10);
        newNumber = lastNumber + 1;
    } else {
        newNumber = 1;
    }

    const formattedNumber = newNumber.toString().padStart(4, '0');
    return `${yearMonth}-${formattedNumber}`;
};

export const createSales = async (req, res) => {
    try {
        const { cust_id, subtotal, diskon, ongkir } = req.body;
        const subtotalInt = parseInt(subtotal, 10);
        const diskonInt = parseInt(diskon, 10);
        const ongkirInt = parseInt(ongkir, 10);
        const tgl = new Date();
        const kode = await generateKodeSales();
        const total_bayar = subtotalInt - diskonInt + ongkirInt

        const sales = await TSales.create({ kode, tgl, cust_id, subtotal, diskon, ongkir, total_bayar });
        res.status(201).json({ message: 'Buat sales berhasil!', sales });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

