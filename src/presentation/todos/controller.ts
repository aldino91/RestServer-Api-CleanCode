import { Request, Response } from 'express';

export class TodosController {
	constructor() {}

	getTodos = (req: Request, res: Response) => {
		return res.json([
			{
				id: 1,
				text: 'hola mundo!!!!',
				createdAt: new Date(),
			},
			{
				id: 2,
				text: 'compro leche',
				createdAt: new Date(),
			},
			{
				id: 1,
				text: 'compro pan',

				createdAt: new Date(),
			},
		]);
	};
}
