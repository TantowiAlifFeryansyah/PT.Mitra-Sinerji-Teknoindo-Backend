import db from "../config/database.js"
import Users from "../model/users.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getListUsers = async (req, res) => {
    try {
        const user = await Users.findAll({
            attributes: ['nickname', 'name', 'email', 'is_admin']
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { nickname, name, email, is_admin, password } = req.body;
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({ nickname, name, email, is_admin, password: hashedPassword });
        // res.status(201).json(user);
        res.status(201).json({ message: 'Registrasi berhasil!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(500).json({ error: 'User tidak ditemukan' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(500).json({ error: 'Password salah' });
        }

        const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '2h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
