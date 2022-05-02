import prismaClient from '../../prisma';

interface UserRequest {
  username: string;
  email: string;
  password: string;
}

interface UpdateRequest {
  id: string
  hash: string
}

class AuthRepository {
  async findByEmail(email: string) {
    const row = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    return row;
  }

  async update({ id, hash }: UpdateRequest) {
    const row = await prismaClient.user.update({
      data: {
        hash,
      },
      where: {
        id,
      },
    });

    return row;
  }

  async create({ username, email, password }: UserRequest) {
    const row = await prismaClient.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return row;
  }
}

export default new AuthRepository();
