import MCustomer from "../model/mCustomer.js"

export const getListCustomer = async (req, res) => {
    try {
        const customer = await MCustomer.findAll();
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCustomer = async (req, res) => {
    try {
        const { kode, nama, telp } = req.body;

        const customer = await MCustomer.create({ kode, nama, telp });
        res.status(201).json({ message: 'Buat Customer berhasil!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};