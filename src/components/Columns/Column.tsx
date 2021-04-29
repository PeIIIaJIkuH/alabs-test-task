import clsx from 'clsx'
import {observer} from 'mobx-react-lite'
import {ChangeEventHandler, FC, useRef, useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import dots from '../../assets/images/dots.svg'
import trashCan from '../../assets/images/trashCan.svg'
import {useOnClickOutside} from '../../hooks/useOnClickOutside'
import store from '../../store/store'
import {IColumn} from '../../types/types'
import {trim} from '../../utils/trim'
import {AddItem} from '../AddItem/AddItem'
import {ImageButton} from '../ImageButton/ImageButton'
import {SwitchableTextarea} from '../SwitchableTextarea/SwitchableTextarea'
import {Todos} from '../Todos/Todos'
import s from './Columns.module.css'

interface ColumnProps {
	column: IColumn
	index: number
}

export const Column: FC<ColumnProps> = observer(({column, index}) => {
	const [isEditMode, setIsEditMode] = useState(false),
		[isDeleting, setIsDeleting] = useState(false),
		textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleOnDeleteClick = () => {
		setIsDeleting(true)
		setTimeout(() => {
			store.deleteColumn(column)
		}, 200)
	}

	const handleOnTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		store.setColumnName(column, trim(e.target.value))
	}

	useOnClickOutside(textareaRef, () => {
		setIsEditMode(false)
	})

	return (
		<Draggable draggableId={column.id} index={index}>
			{({draggableProps, dragHandleProps, innerRef}, {isDragging}) => (
				<div className={clsx(s.column, store.createdItemId === column.id && s.showColumn, isDragging && s.draggingColumn,
					isDeleting && s.hideColumn)} ref={innerRef} {...draggableProps}>
					<div className={s.header}>
						<SwitchableTextarea value={store.getColumnName(column)} handleOnChange={handleOnTextareaChange}
											placeholder='Enter column name' isEditMode={isEditMode} setIsEditMode={setIsEditMode} maxRows={5} bold/>
						<div className={clsx(s.actions, isDragging && s.show)}>
							<ImageButton src={trashCan} alt='trash can' handleClick={handleOnDeleteClick} className={s.deleteColumn}/>
							<div className={clsx(s.dragColumn, isDragging && s.draggingColumnThumb)} {...dragHandleProps}>
								<img src={dots} alt='dots' className={s.dragIcon}/>
							</div>
						</div>
					</div>
					<Todos todos={store.getTodos(column)} column={column}/>
					<AddItem text='Add Todo' type='todo' column={column}/>
				</div>
			)}
		</Draggable>
	)
})
