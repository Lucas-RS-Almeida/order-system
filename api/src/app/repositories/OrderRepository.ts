import prismaClient from '../../prisma';

interface OrderRequest {
  table: number;
  user_id: string;
}

interface FindRequest {
  id: string;
  user_id: string;
}

class OrderRepository {
  async findAll(user_id: string) {
    const rows = await prismaClient.order.findMany({
      where: { user_id, draft: false, status: false },
      orderBy: { created_at: 'desc' },
    });

    return rows;
  }

  async findDrafts(user_id: string) {
    const rows = await prismaClient.order.findMany({
      where: { user_id, draft: true, status: false },
    });

    return rows;
  }

  async findConcludes(user_id: string) {
    const rows = await prismaClient.order.findMany({
      where: { user_id, status: true },
    });

    return rows;
  }

  async findById({ id, user_id }: FindRequest) {
    const row = await prismaClient.order.findFirst({ where: { id, user_id } });

    return row;
  }

  async findByTable({ table, user_id }: OrderRequest) {
    const row = await prismaClient.order.findFirst({
      where: {
        table,
        user_id,
        status: false,
        draft: false,
      },
    });

    return row;
  }

  async send(id: string) {
    const row = await prismaClient.order.update({
      data: { draft: false },
      where: { id },
    });

    return row;
  }

  async conclude(id: string) {
    const row = await prismaClient.order.update({
      data: { status: true },
      where: { id },
    });

    return row;
  }

  async create({ table, user_id }: OrderRequest) {
    const row = await prismaClient.order.create({
      data: {
        table,
        user_id,
      },
    });

    return row;
  }

  async delete(id: string) {
    const deleteOp = await prismaClient.order.delete({ where: { id } });

    return deleteOp.created_at;
  }
}

export default new OrderRepository();
