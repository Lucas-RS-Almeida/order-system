import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import UserRepository from '../repositories/UserRepository';

import mailer from '../../modules/mailer';

class UserController {
  async getMe(request: Request, response: Response) {
    const { user_id } = request;

    try {
      const user = await UserRepository.findById(user_id);
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }

      const { username, email } = user;

      response.json({
        user: { username, email },
      });
    } catch {
      response.status(400).json({ error: 'Erro on get user, try again' });
    }
  }

  async changeEmail(request: Request, response: Response) {
    const { currentEmail, newEmail } = request.body;
    const { user_id }= request;

    if (!currentEmail || !newEmail) {
      return response.status(400).json({ error: 'All fields are mandatory' });
    }

    try {
      const user = await UserRepository.findById(user_id);
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }

      const userByEmail = await UserRepository.findByEmail(currentEmail);
      if (!userByEmail) {
        return response.status(404).json({ error: 'Not exists user white this e-mail' });
      }

      if (userByEmail.email !== user.email) {
        return response.status(400).json({ error: 'Invalid current e-mail' });
      }

      const emailExists = await UserRepository.findByEmail(newEmail);
      if (emailExists && emailExists.id !== user_id) {
        return response.status(400).json({ error: 'This e-mai is already in use' });
      }

      if (currentEmail === newEmail) {
        return response.status(400).json({ error: 'Enter a different e-mail of current' });
      }

      await UserRepository.updateEmail({ user_id, email: newEmail });

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on change email, try again' });
    }
  }

  async changePassword(request: Request, response: Response) {
    const { currentPassword, newPassword } = request.body;
    const { user_id } = request;

    if (!currentPassword || !newPassword) {
      return response.status(400).json({ error: 'All fields are mandatory' });
    }

    if (newPassword.length < 6) {
      return response.status(400).json({ error: 'Enter a stronger password' });
    }

    try {
      const user = await UserRepository.findById(user_id);
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }

      if (!await bcrypt.compare(currentPassword, user.password)) {
        return response.status(400).json({ error: 'Invalid current password' });
      }

      if (currentPassword === newPassword) {
        return response.status(400).json({ error: 'Enter a different password of current' });
      }

      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_GEN_SALT));
      const passwordHahed = await bcrypt.hash(newPassword, salt);

      await UserRepository.updatePassword({ user_id, password: passwordHahed });

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on change password, try again' });
    }
  }

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({ error: 'E-mail is required' });
    }

    try {
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return response.status(404).json({ error: 'Your user not found' });
      }

      const token = crypto.randomBytes(4).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await UserRepository.forgotPassword({ id: user.id, token, expires: now });

      await mailer.sendMail({
        to: email,
        from: 'ordersystem@gmail.com',
        subject: 'Forgot Password',
        text: 'Use this token to reset password',
        html: `
          <p>
            Use esse o seguinte token para resetar sua senha:
            <strong>${token}</strong>
          </p>
        `,
      });

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on forgot password, try again' });
    }
  }

  async resetPassword(request: Request, response: Response) {
    const { email, token, password } = request.body;

    if (!password || !token) {
      return response.status(400).json({ error: 'All fields are mandatory' });
    }

    if (password.length < 6) {
      return response.status(400).json({ error: 'Enter a stronger password' });
    }

    try {
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return response.status(404).json({ error: 'Your user not found' });
      }

      const now = new Date();

      if (user.password_reset_expires && now > user.password_reset_expires) {
        return response.status(404).json({ error: 'Token expires, try again with other token' });
      }

      if (token !== user.password_reset_token) {
        return response.status(400).json({ error: 'Invalid token, try again' });
      }

      if (await bcrypt.compare(password, user.password)) {
        return response.status(400).json({ error: 'Enter a password different of current' });
      }

      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_GEN_SALT));
      const passwordHashed = await bcrypt.hash(password, salt);

      await UserRepository.updatePassword({ user_id: user.id, password: passwordHashed });

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on reset password, try again' });
    }
  }

  async delete(request: Request, response: Response) {
    const { user_id } = request;

    try {
      const user = await UserRepository.findById(user_id);
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }

      await UserRepository.delete(user_id);

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on delete user, try again' });
    }
  }

}

export default new UserController();
