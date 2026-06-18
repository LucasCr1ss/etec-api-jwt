import { Router } from 'express';
import { generateToken } from '../utils.js';

const router = Router();

// Banco de usuários simulado (em produção, use um banco de dados real)
const USERS = [
  { id: 1, username: 'admin', password: '1234', role: 'admin' },
  { id: 2, username: 'user',  password: 'abcd', role: 'user'  },
];

/**
 * POST /auth/login
 * Autentica o usuário e retorna um JWT.
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  const token = generateToken({ id: user.id, username: user.username, role: user.role });

  return res.json({
    message: 'Login realizado com sucesso.',
    token,
  });
});

export default router;
