import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import AuthRepository from '../repositories/AuthRepository';

class AuthController {
  async signUp(request: Request, response: Response) {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      return response.status(400).json({ error: 'All fields are mandatory' });
    }

    try {
      const emailExists = await AuthRepository.findByEmail(email);
      if (emailExists) {
        return response.status(400).json({ error: 'This e-mail is already in user' });
      }

      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_GEN_SALT));
      const passwordHashed = await bcrypt.hash(password, salt);

      const newUser = await AuthRepository.create({
        username, email, password: passwordHashed,
      });

      response.sendStatus(201);
    } catch {
      response.status(400).json({ error: 'Erro on sign up, try again' });
    }
  }

  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ error: 'All fields are mandatory' });
    }

    try {
      const user = await AuthRepository.findByEmail(email);
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }

      if (!await bcrypt.compare(password, user.password)) {
        return response.status(400).json({ error: 'Invalid password' });
      }

      const hash = crypto.randomBytes(Number(process.env.CRYPTO_BYTES))
        .toString('hex');

      const userUpdated = await AuthRepository.update({ id: user.id, hash });

      const { username, email: emailuser } = userUpdated;

      const token = jwt.sign({ hash: userUpdated.hash }, String(process.env.JWT_SECRET));

      response.json({
        user: { username, email: emailuser },
        token,
      });
    } catch {
      response.status(400).json({ error: 'Erro on sign in, try again' });
    }
  }
}

export default new AuthController();
