import prismaClient from '../../prisma';

interface ReqUpdate {
  user_id: string;
  email?: string;
  password?: string;
}

interface ForgotPassword {
  id: string;
  token: string;
  expires: Date;
}

class UserRepository {
  async findById(id: string) {
    const row = await prismaClient.user.findFirst({ where: { id } });

    return row;
  }

  async findByHash(hash: string) {
    const row = await prismaClient.user.findFirst({ where: { hash } });

    return row;
  }

  async findByEmail(email: string) {
    const row = await prismaClient.user.findFirst({ where: { email } });

    return row;
  }

  async updateEmail({ user_id, email }: ReqUpdate) {
    const row = await prismaClient.user.update({
      data: { email },
      where: { id: user_id },
    });

    return row;
  }

  async updatePassword({ user_id, password }: ReqUpdate) {
    const row = await prismaClient.user.update({
      data: { password },
      where: { id: user_id },
    });

    return row;
  }

  async forgotPassword({ id, token, expires }: ForgotPassword) {
    await prismaClient.user.update({
      data: {
        password_reset_token: token,
        password_reset_expires: expires,
      },
      where: {
        id,
      },
    });
  }

  async delete(user_id: string) {
    const deleteOp = await prismaClient.user.delete({ where: { id: user_id } });

    return deleteOp;
  }
}

export default new UserRepository();
