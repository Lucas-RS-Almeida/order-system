import { Request, Response } from 'express';

import CategoryRepository from '../repositories/CategoryRepository';

class CategoryController {
  async index(request: Request, response: Response) {
    const { user_id } = request;

    try {
      const categories = await CategoryRepository.findAll(user_id);

      response.json(categories);
    } catch {
      response.status(400).json({ error: 'Erro on get categories, try again' });
    }
  }

  async store(request: Request, response: Response) {
    const { name } = request.body;
    const { user_id } = request;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    try {
      const categoryExists = await CategoryRepository.findByName({ name, user_id });
      if (categoryExists) {
        return response.status(400).json({ error: 'This category already exists' });
      }

      const newCategory = await CategoryRepository.create({ name, user_id });

      response.status(201).json(newCategory);
    } catch {
      response.status(400).json({ error: 'Erro on create category, try again' });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;
    const { user_id } = request;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    try {
      const category = await CategoryRepository.findById({ id, user_id });
      if (!category) {
        return response.status(404).json({ error: 'Category not found' });
      }

      const nameExists = await CategoryRepository.findByName({ name, user_id });
      if (nameExists) {
        return response.status(404).json({ error: 'This category already exists' });
      }

      await CategoryRepository.update({ id, name });

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on updated category, try again' });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const { user_id } = request;

    try {
      const category = await CategoryRepository.findById({ id, user_id });
      if (!category) {
        return response.status(404).json({ error: 'Category not found' });
      }

      await CategoryRepository.delete(id);

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on delete category, try again' });
    }
  }
}

export default new CategoryController();
