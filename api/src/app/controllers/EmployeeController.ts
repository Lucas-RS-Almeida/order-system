import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserRepository from '../repositories/UserRepository';

class EmployeeController {
  async signIn(request:Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ error: 'All fields are mandatory' })
    }

    try {
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return response.status(404).json({ error: 'User not found' })
      }

      if (!await bcrypt.compare(password, user.password)) {
        return response.status(400).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ hash: user.hash }, String(process.env.JWT_SECRET));

      const { username, email: emailUser } = user;

      response.json({
        user: { username, email: emailUser },
        token,
      });
    } catch {
      response.status(400).json({ error: 'Erro on sign in employee, tru again' });
    }
  }
}

export default new EmployeeController();
