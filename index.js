import express from 'express';
import userRoute from "./routes/users.js";
import barangRoute from "./routes/mbarang.js";
import customerRoute from "./routes/mcustomer.js";
import salesRoute from "./routes/tsales.js";
import salesDetRoute from "./routes/tsalesdet.js";
import cors from "cors";
import detect from 'detect-port';

const app = express();
const defaultPort = 3005;

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(barangRoute);
app.use(customerRoute);
app.use(salesRoute);
app.use(salesDetRoute);

const startServer = (port) => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};

detect(defaultPort).then((availablePort) => {
    if (availablePort === defaultPort) {
        startServer(defaultPort);
    } else {
        console.log(`Port ${defaultPort} is in use, switching to port ${availablePort}`);
        startServer(availablePort);
    }
}).catch((err) => {
    console.error('Error detecting port:', err);
});
