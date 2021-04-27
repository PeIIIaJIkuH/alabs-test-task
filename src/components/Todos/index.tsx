import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {IColumn, ITodo} from '../../types'
import {Todo} from './Todo'
import s from './Todos.module.css'

interface TodosProps {
	todos: ITodo[]
	column: IColumn
}

export const Todos: FC<TodosProps> = observer(({todos, column}) => {
	return (
		<div className={s.todos}>
			{todos.map((todo: ITodo) => (
				<Todo key={todo.id} todo={todo} column={column}/>
			))}
		</div>
	)
})
