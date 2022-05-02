import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
import CategoryController  from './app/controllers/CategoryController';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';
import ItemController from './app/controllers/ItemController';
import EmployeeController from './app/controllers/EmployeeController';

import auth from './middlewares/auth';
import verifyUser from './middlewares/verifyUser';

const routes = Router();

// Routes to authenticated
routes.post('/auth/sign-up', AuthController.signUp);
routes.post('/auth/sign-in', AuthController.signIn);
routes.post('/auth/employee/sign-in', EmployeeController.signIn);

// Routes to user
routes.get('/users', auth, verifyUser, UserController.getMe);
routes.put('/users/change-email', auth, verifyUser, UserController.changeEmail);
routes.put('/users/change-password', auth, verifyUser, UserController.changePassword);
routes.post('/users/forgot-password', UserController.forgotPassword);
routes.post('/users/reset-password', UserController.resetPassword);
routes.delete('/users', auth, verifyUser, UserController.delete);

// Routes to categories
routes.post('/categories', auth, verifyUser, CategoryController.store);
routes.get('/categories', auth, verifyUser, CategoryController.index);
routes.put('/categories/:id', auth, verifyUser, CategoryController.update);
routes.delete('/categories/:id', auth, verifyUser, CategoryController.delete);

// Routes to product
routes.get('/products', auth, verifyUser, ProductController.index);
routes.get('/products/:category_id', auth, verifyUser, ProductController.show);
routes.post(
  '/products',
  auth,
  verifyUser,
  multer(multerConfig).single('file'),
  ProductController.create,
);
routes.delete('/products/:id', auth, verifyUser, ProductController.delete);

// Routes to order
routes.get('/orders', auth, verifyUser, OrderController.index);
routes.get('/orders/drafts', auth, verifyUser, OrderController.showDrafts);
routes.get('/orders/opened/:table', auth, verifyUser, OrderController.show);
routes.post('/orders', auth, verifyUser, OrderController.store);
routes.put('/orders/send/:id', auth, verifyUser, OrderController.send);
routes.put('/orders/conclude/:id', auth, verifyUser, OrderController.conclude);
routes.delete('/orders/:id', auth, verifyUser, OrderController.delete);

// Routes to item
routes.get('/items/:order_id', auth, verifyUser, ItemController.index);
routes.post('/items', auth, verifyUser, ItemController.store);
routes.delete('/items/:id', auth, verifyUser, ItemController.delete);

export default routes;
