import clsx from 'clsx'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import {IColumn, ITodo} from '../../types/types'
import {Todo} from './Todo/Todo'
import s from './Todos.module.css'

interface TodosProps {
	todos: ITodo[]
	column: IColumn
}

export const Todos: FC<TodosProps> = observer(({todos, column}) => {
	return (
		<Droppable droppableId={column.id} type='todo'>
			{({droppableProps, placeholder, innerRef}, {isDraggingOver}) => (
				<div className={clsx(s.todos, isDraggingOver && s.draggingOverTodos)} {...droppableProps} ref={innerRef}>
					{todos.map((todo: ITodo, index) => (
						<Todo key={todo.id} todo={todo} column={column} index={index}/>
					))}
					{placeholder}
				</div>
			)}
		</Droppable>
	)
})
