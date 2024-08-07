import TSalesDet from "../model/tSalesDet.js"
import { Op } from 'sequelize';
import sequelize from "../config/database.js"; // Import sequelize if needed for Op


export const getListSalesDet = async (req, res) => {
    try {
        const query = `
            SELECT
             t.sales_id,
             t.barang_id,
             t.harga_bandrol,
             t.qty,
             t.diskon_pct,
             t.diskon_nilai,
             t.harga_diskon,
             t.total,
             ts.qty,
             m.code,
             m.nama
            FROM t_sales_det t
            INNER JOIN t_sales ts ON ts.id = t.sales_id
            INNER JOIN m_customer m ON m.id = ts.cust_id

        `;

        const [results, metadata] = await sequelize.query(query);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSalesDetBySalesId = async (req, res) => {
    try {
        const { salesId } = req.query; // Access salesId from query parameters

        const query = `
        SELECT
             t.sales_id,
             t.barang_id,
             t.harga_bandrol,
             t.qty,
             t.diskon_pct,
             t.diskon_nilai,
             t.harga_diskon,
             t.total,
             t.qty,
             m.kode,
             m.nama,
             mb.kode AS kodeBarang,
             mb.nama AS namaBarang
            FROM t_sales_det t
            INNER JOIN t_sales ts ON ts.id = t.sales_id
            INNER JOIN m_customer m ON m.id = ts.cust_id
            INNER JOIN m_barang mb ON mb.id = t.barang_id
        WHERE t.sales_id = :salesId
      `;

        const [results, metadata] = await sequelize.query(query, {
            replacements: { salesId },
        });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Sales details not found' });
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createSalesDet = async (req, res) => {
    try {
        const { sales_id, barang_id, harga_bandrol, qty, diskon_pct, diskon_nilai, harga_diskon, total } = req.body;
        const salesDet = await TSalesDet.create({ sales_id, barang_id, harga_bandrol, qty, diskon_pct, diskon_nilai, harga_diskon, total });
        res.status(201).json({ message: 'Buat sales_det berhasil!', salesDet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const searchSalesDet = async (req, res) => {
    try {
        const { q } = req.query;

        const salesDet = await TSalesDet.findAll({
            where: {
                [Op.or]: [
                    { sales_id: isNaN(q) ? -1 : parseInt(q) },
                    { barang_id: isNaN(q) ? -1 : parseInt(q) },
                    { harga_bandrol: isNaN(q) ? { [Op.like]: `%${q}%` } : parseInt(q) },
                    { qty: isNaN(q) ? -1 : parseInt(q) },
                    { diskon_pct: isNaN(q) ? -1 : parseFloat(q) },
                    { diskon_nilai: isNaN(q) ? -1 : parseFloat(q) },
                    { harga_diskon: isNaN(q) ? -1 : parseFloat(q) },
                    { total: isNaN(q) ? -1 : parseFloat(q) },
                ]
            }
        });

        res.status(200).json(salesDet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
