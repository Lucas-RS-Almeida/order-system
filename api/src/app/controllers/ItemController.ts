import { Request, Response } from 'express';

import ItemRepository from '../repositories/ItemRepository';
import ProductRepository from '../repositories/ProductRepository';
import OrderRepotirory from '../repositories/OrderRepository';

class ItemController {
  async index(request: Request, response: Response) {
    const { order_id } = request.params;

    try {
      const items = await ItemRepository.findAll(order_id);

      response.json(items);
    } catch {
      response.status(400).json({ error: 'Erro on create item, try again' });
    }
  }

  async store(request: Request, response: Response) {
    const { amount, order_id, product_id } = request.body;
    const { user_id } = request;

    if (!amount || !order_id || !product_id) {
      return response.status(400).json({ error: 'All fields are mandatory' });
    }

    try {
      const productExists = await ProductRepository.findById({ id: product_id, user_id });
      if (!productExists) {
        return response.status(404).json({ error: 'Product not found' });
      }

      const orderExists = await OrderRepotirory.findById({ id: order_id, user_id });
      if (!orderExists) {
        return response.status(404).json({ error: 'Order not found' });
      }

      const newItem = await ItemRepository.create({ amount, order_id, product_id });

      response.status(201).json(newItem);
    } catch {
      response.status(400).json({ error: 'Erro on create item, try again' });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const itemExists = await ItemRepository.findById(id);
      if (!itemExists) {
        return response.status(404).json({ error: 'Item not found' });
      }

      await ItemRepository.delete(id);

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on delete item, try again' });
    }
  }
}

export default new ItemController();
