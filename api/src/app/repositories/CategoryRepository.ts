import prismaClient from '../../prisma';

interface CategoryRequest {
  name: string;
  user_id: string;
}

interface UpdateRequest {
  id: string;
  name: string;
}

interface FindRequest {
  id: string;
  user_id: string;
}

class CategoryRepository {
  async findAll(user_id: string) {
    const rows = await prismaClient.category.findMany({
      where: {
        user_id,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return rows;
  }

  async findById({ id, user_id }: FindRequest) {
    const row = await prismaClient.category.findFirst({ where: { id, user_id } });

    return row;
  }

  async findByName({ name, user_id }: CategoryRequest) {
    const row = await prismaClient.category.findFirst({ where: { name, user_id } });

    return row;
  }

  async create({ name, user_id }: CategoryRequest) {
    const row = await prismaClient.category.create({
      data: {
        name,
        user_id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return row;
  }

  async update({ id, name }: UpdateRequest) {
    const row = await prismaClient.category.update({
      data: { name },
      where: { id },
    });

    return row;
  }

  async delete(id: string) {
    const deleteOp = await prismaClient.category.delete({ where: { id } });

    return deleteOp;
  }
}

export default new CategoryRepository();
