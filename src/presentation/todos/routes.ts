import { Router } from 'express';
import { TodoDataSourcesImpl } from '../../infrastructure/datasource/todo.datasource.impl';

import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.respository.impl';

import { TodosController } from './controller';

export class TodosRoutes {
	static get routes(): Router {
		const router = Router();

		const datasources = new TodoDataSourcesImpl();

		const todoRespository = new TodoRepositoryImpl(datasources);

		const todosController = new TodosController(todoRespository);

		router.get('/', todosController.getTodos);

		router.get('/:id', todosController.getTodosById);

		router.post('/', todosController.createTodo);

		router.put('/:id', todosController.updateTodo);

		router.delete('/:id', todosController.deleteTodo);

		return router;
	}
}
