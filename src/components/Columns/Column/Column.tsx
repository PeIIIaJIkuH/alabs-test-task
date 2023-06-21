import { ChangeEventHandler, FC, useRef, useState } from 'react'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { useDrag } from 'react-dnd'
import trashCan from '../../../assets/icons/trashCan.svg'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { store } from '../../../store'
import { ColumnItem, IColumn } from '../../../types'
import { trim } from '../../../utils/trim'
import { AddItem } from '../../AddItem/AddItem'
import { ImageButton } from '../../ImageButton/ImageButton'
import { SwitchableTextarea } from '../../SwitchableTextarea/SwitchableTextarea'
import { Todos } from '../../Todos/Todos'
import s from './Column.module.css'
import { ItemTypes } from '../../../constants/item-types'

interface ColumnProps {
	column: IColumn
	index: number
}

export const Column: FC<ColumnProps> = observer(({ column, index }) => {
	const [isEditMode, setIsEditMode] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const [{ isDragging }, drag] = useDrag<ColumnItem, void, { isDragging: boolean }>({
		type: ItemTypes.TODO,
		item: { id: column.id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

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
		<div
			className={clsx(
				s.column,
				store.createdItemId === column.id && s.showColumn,
				isDragging && s.draggingColumn,
				isDeleting && s.hideColumn,
			)}
			ref={drag}
		>
			<div className={s.header}>
				<SwitchableTextarea
					value={store.getColumnName(column)}
					handleOnChange={handleOnTextareaChange}
					placeholder='Enter column name'
					isEditMode={isEditMode}
					setIsEditMode={setIsEditMode}
					maxRows={5}
					bold
				/>
				<div className={clsx(s.actions, isDragging && s.show)}>
					<ImageButton src={trashCan} alt='trash can' handleClick={handleOnDeleteClick} />
				</div>
			</div>
			<Todos todos={store.getTodos(column)} column={column} />
			<AddItem text='Add Todo' type='todo' column={column} />
		</div>
	)
})
