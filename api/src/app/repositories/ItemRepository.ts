import prismaClient from '../../prisma';

interface ItemRequest {
  amount: number;
  order_id: string;
  product_id: string;
}

class ItemRepository {
  async findById(id: string) {
    const row = await prismaClient.item.findFirst({ where: { id } });

    return row;
  }

  async findAll(order_id: string) {
    const rows = await prismaClient.item.findMany({
      where: { order_id },
      include: { product: true },
    });

    return rows;
  }

  async create({ amount, order_id, product_id }: ItemRequest) {
    const row = await prismaClient.item.create({
      data: { amount, order_id, product_id },
      include: { product: true },
    });

    return row;
  }

  async delete(id: string) {
    const deletOp = await prismaClient.item.delete({
      where: { id },
    });

    return deletOp;
  }
}

export default new ItemRepository();
