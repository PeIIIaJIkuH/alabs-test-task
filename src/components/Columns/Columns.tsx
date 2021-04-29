import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd'
import store from '../../store/store'
import {IColumn} from '../../types/types'
import {AddItem} from '../AddItem/AddItem'
import {Column} from './Column/Column'
import s from './Columns.module.css'

interface ColumnsProps {
	columns: IColumn[]
}

export const Columns: FC<ColumnsProps> = observer(({columns}) => {
	const handleOnDragEnd = ({destination, source, draggableId, type}: DropResult) => {
		if (!destination)
			return
		if (destination.droppableId === source.droppableId && destination.index === source.index)
			return
		if (type === 'todo') {
			store.swapTodos(source.droppableId, destination.droppableId, draggableId, destination.index)
		} else if (type === 'column') {
			store.swapColumns(source.index, destination.index)
		}
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId={store.droppableId} direction='horizontal' type='column'>
				{({droppableProps, innerRef, placeholder}) => (
					<div className={s.columns} {...droppableProps} ref={innerRef}>
						{columns.map((column: IColumn, index) => (
							<Column key={column.id} column={column} index={index}/>
						))}
						{placeholder}
						<AddItem text='Add Column' type='column'/>
					</div>

				)}
			</Droppable>
		</DragDropContext>
	)
})
