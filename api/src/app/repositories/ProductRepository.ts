import prismaClient from '../../prisma';

interface ProductRequest {
  name: string;
  description: string;
  price: string;
  banner_key: string;
  banner_url: string;
  category_id: string;
  user_id: string;
}

interface RequestFind {
  id: string;
  user_id: string;
}

class ProductRepository {
  async findAll(user_id: string) {
    const rows = await prismaClient.product.findMany({
      where: { user_id },
      include: { category: true },
      orderBy: { created_at: 'desc' },
    });

    return rows;
  }

  async findById({ id, user_id }: RequestFind) {
    const row = await prismaClient.product.findFirst({ where: { id, user_id } });

    return row;
  }

  async findByCategoryId({ id, user_id }: RequestFind) {
    const rows = await prismaClient.product.findMany({
      where: { category_id: id, user_id },
      include: { category: true },
    });

    return rows;
  }

  async create({
    name, description, price, banner_key, banner_url, category_id, user_id,
  }: ProductRequest) {
    const row = await prismaClient.product.create({
      data: {
        name,
        description,
        price,
        banner_key,
        banner_url,
        category_id,
        user_id,
      },
    });

    return row;
  }

  async delete(id: string) {
    const deleteOp = await prismaClient.product.delete({ where: { id } });

    return deleteOp;
  }
}

export default new ProductRepository();
