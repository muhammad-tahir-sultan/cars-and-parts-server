require('dotenv').config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

require("./config/firebase.config");

const app = express();
app.use(express.json());
app.use(cors({ origin: ["https://cars-and-parts-2f77b.web.app", "http://localhost:5173"] }))


const routesDir = path.join(__dirname, 'routes');
fs.readdirSync(routesDir).forEach(file => {
    const routePath = path.join(routesDir, file);
    const route = require(routePath).default;
    const routeName = file.split('.')[0];
    app.use(`/api/${routeName}`, route);
});

app.get('/', async (req: Request, res: Response) => {
    res.send('Carts & Parts API Up & Running!');
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
