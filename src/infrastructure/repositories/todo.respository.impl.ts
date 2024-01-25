import {
	CreateTodoDto,
	TodoDataSources,
	TodoEntity,
	TodoRepository,
	UpdateTodoDto,
} from '../../domain';

export class TodoRepositoryImpl implements TodoRepository {
	constructor(private readonly datasources: TodoDataSources) {}

	create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
		return this.datasources.create(createTodoDto);
	}
	getAll(): Promise<TodoEntity[]> {
		return this.datasources.getAll();
	}
	findById(id: number): Promise<TodoEntity> {
		return this.datasources.findById(id);
	}
	updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
		return this.datasources.updateById(updateTodoDto);
	}
	deleteById(id: number): Promise<TodoEntity> {
		return this.datasources.deleteById(id);
	}
}
