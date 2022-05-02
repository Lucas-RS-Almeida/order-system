import { Request, Response } from 'express';

import OrderRepository from '../repositories/OrderRepository';

class OrderController {
  async index(request: Request, response: Response) {
    const { user_id } = request;

    try {
      const orders = await OrderRepository.findAll(user_id);

      response.json(orders);
    } catch {
      response.status(400).json({ error: 'Erro on create order, try again' });
    }
  }

  async show(request: Request, response: Response) {
    const { table } = request.params;
    const { user_id } = request;

    try {
      const order = await OrderRepository.findByTable({ table: Number(table), user_id });
      if (!order) {
        return response.status(404).json({ error: 'Order not found' });
      }

      response.json(order);
    } catch {
      response.status(400).json({ error: 'Erro on get table, try again' });
    }
  }

  async showDrafts(request: Request, response: Response) {
    const { user_id } = request;

    try {
      const orders = await OrderRepository.findDrafts(user_id);

      response.json(orders);
    } catch {
      response.status(400).json({ error: 'Erro on list drafts, try again' });
    }
  }

  async store(request: Request, response: Response) {
    const { table } = request.body;
    const { user_id } = request;

    if (!table) {
      return response.status(400).json({ error: 'Table is required' });
    }

    try {
      const orderExists = await OrderRepository.findByTable({ table, user_id });
      if (orderExists) {
        return response.status(409).json({ error: 'Order opened' });
      }

      const newOrder = await OrderRepository.create({ table, user_id });

      const { id } = newOrder;

      response.status(201).json({ order: { id } });
    } catch {
      response.status(400).json({ error: 'Erro on create order, try again' });
    }
  }

  async send(request: Request, response: Response) {
    const { id } = request.params;
    const { user_id } = request;

    try {
      const orderExists = await OrderRepository.findById({ id, user_id});
      if (!orderExists) {
        return response.status(400).json({ error: 'Order not found' });
      }

      const order = await OrderRepository.send(id);

      const { table } = order;

      if (orderExists.draft === false) {
        return response.status(201).json({ order: { table } });
      }

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on send order, try again' });
    }
  }

  async conclude(request: Request, response: Response) {
    const { id } = request.params;
    const { user_id } = request;

    try {
      const orderExists = await OrderRepository.findById({ id, user_id});
      if (!orderExists) {
        return response.status(400).json({ error: 'Order not found' });
      }

      if (orderExists.status === true) {
        return response.status(400).json({ error: 'Your already conclude this order' });
      }

      await OrderRepository.conclude(id);

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on conclude order, try again' });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const { user_id } = request;

    try {
      const orderExists = await OrderRepository.findById({ id, user_id});
      if (!orderExists) {
        return response.status(400).json({ error: 'Order not found' });
      }

      await OrderRepository.delete(id);

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on delete order, try again' });
    }
  }
}

export default new OrderController();
