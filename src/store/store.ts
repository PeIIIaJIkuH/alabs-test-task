import {makeAutoObservable} from 'mobx'
import {v4} from 'uuid'
import {IColumn, ITodo} from '../types'

class Store {
	columns = new Set<IColumn>()

	constructor() {
		makeAutoObservable(this)
	}

	getColumns() {
		return Array.from(this.columns)
	}

	getColumnName(column: IColumn) {
		return column.name
	}

	setColumnName(column: IColumn, name: string) {
		column.name = name
	}

	createColumn(name: string) {
		this.columns.add({
			id: v4(),
			name,
			todos: new Set()
		})
	}

	deleteColumn(column: IColumn) {
		this.columns.delete(column)
	}

	createTodo(column: IColumn, name: string) {
		column.todos.add({
			id: v4(),
			title: name,
			description: '',
			creationDate: Date.now(),
			editDate: Date.now()
		})
	}

	getTodos(column: IColumn) {
		return Array.from(column.todos)
	}
	
	getTodoTitle(todo: ITodo) {
		return todo.title
	}
	
	setTodoTitle(todo: ITodo, title: string) {
		todo.title = title
	}
	
	setTodoEditDate(todo: ITodo, date: number) {
		todo.editDate = date
	}

	getTodoDescription(todo: ITodo) {
		return todo.description
	}

	setTodoDescription(todo: ITodo, description: string) {
		todo.description = description
	}

	deleteTodo(column: IColumn, todo: ITodo) {
		column.todos.delete(todo)
	}
}

export default new Store()
