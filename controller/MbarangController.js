import MBarang from "../model/mBarang.js"

export const getListBarang = async (req, res) => {
    try {
        const barang = await MBarang.findAll();
        res.status(200).json(barang);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createBarang = async (req, res) => {
    try {
        const { kode, nama, harga } = req.body;

        const barang = await MBarang.create({ kode, nama, harga });
        res.status(201).json({ message: 'Buat barang berhasil!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};