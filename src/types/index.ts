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
