import { Request, Response } from 'express';

import aws from 'aws-sdk';

import ProductRepository from '../repositories/ProductRepository';
import CategoryRepository from '../repositories/CategoryRepository';

const s3 = new aws.S3();

class ProductController {
  async index(request: Request, response: Response) {
    const { user_id } = request;

    try {
      const products = await ProductRepository.findAll(user_id);

      response.json(products);
    } catch {
      response.status(400).json({ error: 'Erro on list products, try again' });
    }
  }

  async show(request: Request, response: Response) {
    const { category_id } = request.params;
    const { user_id } = request;

    try {
      const categoryExists = await CategoryRepository.findById({ id: category_id, user_id });
      if (!categoryExists) {
        return response.status(404).json({ error: 'Category not found' });
      }

      const products = await ProductRepository.findByCategoryId({ id: category_id, user_id });

      response.json(products);
    } catch {
      response.status(400).json({ error: 'Erro on get product, try again' });
    }
  }

  async create(request: Request, response: Response) {
    const {
      name, price, description, category_id,
    } = request.body;

    if (!request.file) {
      return response.status(400).json({ error: 'Enter a image' });
    }

    const {
      location: banner_url, key: banner_key,
    } = request.file;

    const { user_id } = request;

    try {
      const categoryExists = await CategoryRepository.findById({ id: category_id, user_id });
      if (!categoryExists) {
        return response.status(404).json({ error: 'Category not found' });
      }

      await ProductRepository.create({
        name, price, description, category_id, banner_key, banner_url, user_id,
      });

      response.sendStatus(201);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: 'Erro on create product, try again' });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const { user_id } = request;

    try {
      const productExists = await ProductRepository.findById({ id, user_id });
      if (!productExists) {
        return response.status(404).json({ error: 'Product not found' });
      }

      await s3.deleteObject({
        Bucket: String(process.env.AWS_BUCKET),
        Key: productExists.banner_key,
      }).promise();

      await ProductRepository.delete(id);

      response.sendStatus(204);
    } catch {
      response.status(400).json({ error: 'Erro on delete product, try again' });
    }
  }
}

export default new ProductController();
