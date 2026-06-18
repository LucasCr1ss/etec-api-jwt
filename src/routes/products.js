import { Router } from 'express';
import { authenticateToken } from '../utils.js';

const router = Router();

// Dados simulados
const PRODUCTS = [
  { id: 1, name: 'Notebook', price: 4500 },
  { id: 2, name: 'Mouse',    price: 120  },
  { id: 3, name: 'Teclado',  price: 250  },
];

/**
 * GET /products
 * Retorna todos os produtos. Requer autenticação JWT.
 */
router.get('/', authenticateToken, (req, res) => {
  return res.json({
    user: req.user,
    products: PRODUCTS,
  });
});

/**
 * GET /products/:id
 * Retorna um produto pelo ID. Requer autenticação JWT.
 */
router.get('/:id', authenticateToken, (req, res) => {
  const product = PRODUCTS.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }

  return res.json({ user: req.user, product });
});

export default router;
