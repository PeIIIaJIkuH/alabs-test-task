import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { IColumn, ITodo, TodoItem } from '../../types'
import { Todo } from './Todo/Todo'
import s from './Todos.module.css'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../constants/item-types'
import { store } from '../../store'

interface TodosProps {
	todos: ITodo[]
	column: IColumn
}

export const Todos: FC<TodosProps> = observer(({ todos, column }) => {
	const [{ isOver }, drop] = useDrop<TodoItem, void, { isOver: boolean }>({
		accept: ItemTypes.TODO,
		drop: ({ id, index, srcColumnId }) => {
			console.log('drop', id, index, srcColumnId)
			store.moveTodo(srcColumnId, column.id, id, index)
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	})

	return (
		<div className={clsx(s.todos, isOver && s.draggingOverTodos)} ref={drop}>
			{todos.map((todo: ITodo, index) => (
				<Todo key={todo.id} todo={todo} column={column} index={index} />
			))}
		</div>
	)
})
