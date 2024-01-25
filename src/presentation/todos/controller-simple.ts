import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

export class TodosController {
	constructor(private readonly todoRespository: TodoRepository) {}

	getTodos = async (req: Request, res: Response) => {
		const todos = await this.todoRespository.getAll;
		return res.json(todos);
	};

	getTodosById = async (req: Request, res: Response) => {
		const id = +req.params.id;

		try {
			const todo = await this.todoRespository.findById(id);

			return res.json(todo);
		} catch (error) {
			return res.status(400).json(error);
		}
	};

	createTodo = async (req: Request, res: Response) => {
		const [error, createTodoDto] = CreateTodoDto.create(req.body);

		if (error) return res.status(400).json({ error });

		const todo = await this.todoRespository.create(createTodoDto!);

		res.json(todo);
	};

	updateTodo = async (req: Request, res: Response) => {
		const id = +req.params.id;

		const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

		if (error) return res.status(400).json(error);

		const updateTodo = await this.todoRespository.updateById(updateTodoDto!);

		res.json(updateTodo);
	};

	deleteTodo = async (req: Request, res: Response) => {
		const id = +req.params.id;

		const deleteTodo = await this.todoRespository.deleteById(id);

		res.json(deleteTodo);
	};
}
