import { Request, Response } from 'express';

const todos = [
	{
		id: 1,
		text: 'hola mundo!!!!',
		completedAt: new Date(),
	},
	{
		id: 2,
		text: 'compro leche',
		completedAt: null,
	},
	{
		id: 3,
		text: 'compro pan',

		completedAt: new Date(),
	},
];
export class TodosController {
	constructor() {}

	getTodos = (req: Request, res: Response) => {
		return res.json(todos);
	};

	getTodosById = (req: Request, res: Response) => {
		const id = +req.params.id;

		if (isNaN(id))
			return res.status(400).json({ error: 'ID argument is not number' });

		const todo = todos.find((todo) => todo.id === id);

		todo
			? res.json(todo)
			: res.status(404).json(`Todos with id ${id} NOT FOUND`);
	};

	createTodo = (req: Request, res: Response) => {
		const { text } = req.body;

		if (!text)
			return res.status(400).json({ error: 'Text property is required' });

		const newTodo = {
			id: todos.length + 1,
			text: text,
			completedAt: null,
		};

		res.json(newTodo);
	};

	updateTodo = (req: Request, res: Response) => {
		const id = +req.params.id;

		if (isNaN(id))
			return res.status(400).json({ error: 'ID argument is not number' });

		const todo = todos.find((todo) => todo.id === id);
		if (!todo)
			return res.status(404).json({ error: `Todo with id ${id} not found` });

		const { text, completedAt } = req.body;

		todo.text = text || todo.text;

		completedAt === 'null'
			? (todo.completedAt = null)
			: (todo.completedAt = new Date(completedAt || todo.completedAt));

		res.json(todo);
	};

	deleteTodo = (req: Request, res: Response) => {
		const id = +req.params.id;

		const todo = todos.find((todo) => todo.id === id);

		if (!todo)
			return res.status(404).json({ error: `Todo with id ${id} not found` });

		todos.splice(todos.indexOf(todo), 1);

		res.json(todo);
	};
}
