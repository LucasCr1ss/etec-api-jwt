import 'dotenv/config';
import express from 'express';

import authRoutes    from './routes/auth.js';
import productRoutes from './routes/products.js';

const app  = express();
const PORT = process.env.PORT ?? 3000;

// ─── Middlewares globais ───────────────────────────────────────────────────────
app.use(express.json());

// ─── Rotas ────────────────────────────────────────────────────────────────────
app.use('/auth',     authRoutes);
app.use('/products', productRoutes);

// Rota raiz (pública)
app.get('/', (_req, res) => {
  res.json({ message: 'API funcionando. Use POST /auth/login para obter seu token.' });
});

// ─── Handler de rotas não encontradas ─────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// ─── Inicialização ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
