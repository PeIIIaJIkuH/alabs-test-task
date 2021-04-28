import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import {IColumn, ITodo} from '../../types/types'
import {Todo} from './Todo'
import s from './Todos.module.css'

interface TodosProps {
	todos: ITodo[]
	column: IColumn
}

export const Todos: FC<TodosProps> = observer(({todos, column}) => {
	return (
		<Droppable droppableId={column.id} type='todo'>
			{(provided, snapshot) => (
				<div className={`${s.todos} ${snapshot.isDraggingOver && s.draggingOver}`} {...provided.droppableProps} ref={provided.innerRef}>
					{todos.map((todo: ITodo, index) => (
						<Todo key={todo.id} todo={todo} column={column} index={index}/>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	)
})
