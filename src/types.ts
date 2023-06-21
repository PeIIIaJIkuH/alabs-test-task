export interface ITodo {
	id: string
	title: string
	description?: string
	creationDate: number
	editDate: number
}

export interface IColumn {
	id: string
	name: string
	todos: Set<ITodo>
}

export interface IDBColumn {
	id: string
	name: string
	todos: ITodo[]
}

export interface TodoItem {
	id: string
	index: number
	srcColumnId: string
}

export interface ColumnItem {
	id: string
	index: number
}
