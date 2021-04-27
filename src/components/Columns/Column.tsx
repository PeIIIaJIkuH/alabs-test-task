import {observer} from 'mobx-react-lite'
import {ChangeEventHandler, FC, MouseEventHandler, useRef, useState} from 'react'
import trashCan from '../../assets/images/trashCan.svg'
import {useOnClickOutside} from '../../hooks/useOnClickOutside'
import store from '../../store/store'
import {IColumn} from '../../types'
import {trim} from '../../utils/trim'
import {AddItem} from '../AddItem'
import {SwitchableTextarea} from '../SwitchableTextarea'
import {Todos} from '../Todos'
import s from './Columns.module.css'

interface ColumnProps {
	column: IColumn
}

export const Column: FC<ColumnProps> = observer(({column}) => {
	const [isEditMode, setIsEditMode] = useState(false),
		textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleOnDeleteClick: MouseEventHandler<HTMLButtonElement> = () => {
		store.deleteColumn(column)
	}

	const handleOnTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		store.setColumnName(column, trim(e.target.value))
	}

	useOnClickOutside(textareaRef, () => {
		setIsEditMode(false)
	})

	return (
		<div className={s.column}>
			<div className={s.header}>
				<SwitchableTextarea value={store.getColumnName(column)} handleOnChange={handleOnTextareaChange} placeholder='Enter column name'
									isEditMode={isEditMode} setIsEditMode={setIsEditMode} maxRows={5} bold/>
				<div className={s.actions}>
					<button className={s.deleteColumn} onClick={handleOnDeleteClick}>
						<img className={s.deleteIcon} src={trashCan} alt='trash can'/>
					</button>
				</div>
			</div>
			<Todos todos={store.getTodos(column)} column={column}/>
			<AddItem text='Add Todo' type='todo' column={column}/>
		</div>
	)
})
