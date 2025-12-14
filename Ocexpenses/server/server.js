import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './src/db.js';
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/user.js';
import paymentModeRoutes from './src/routes/paymentModeRoutes.js';
import expenseAccountRoutes from './src/routes/expenseAccountRoutes.js';
import headRoutes from "./src/routes/headRoutes.js";
import subHeadRoutes from "./src/routes/subHeadRoutes.js";
import voucherEntryRoutes from "./src/routes/voucherEntryRoutes.js";


const app = express();
const PORT = process.env.PORT || 4000;


app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
origin: 'http://localhost:3001',
credentials: true
}));


app.get('/', (_req, res) => {
res.json({ status: 'ok', message: 'API running' });
});


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment-modes', paymentModeRoutes);
app.use("/api/expense-accounts", expenseAccountRoutes);
app.use("/api/heads", headRoutes);
app.use("/api/sub-heads", subHeadRoutes);
app.use("/api/voucher-entries", voucherEntryRoutes);
app.use("/uploads", express.static("uploads"));




await connectDB();
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));