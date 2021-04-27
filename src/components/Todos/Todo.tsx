import {observer} from 'mobx-react-lite'
import {ChangeEventHandler, FC, MouseEventHandler, useState} from 'react'
import description from '../../assets/images/description.svg'
import trashCan from '../../assets/images/trashCan.svg'
import store from '../../store/store'
import {IColumn, ITodo} from '../../types'
import {trim} from '../../utils/trim'
import {Modal} from '../Modal'
import {SwitchableTextarea} from '../SwitchableTextarea'
import s from './Todos.module.css'

interface TodoProps {
	todo: ITodo
	column: IColumn
}

export const Todo: FC<TodoProps> = observer(({todo, column}) => {
	const [isModalOpen, setIsModalOpen] = useState(false),
		[isEditModeDescription, setIsEditModeDescription] = useState(false),
		[isEditModeTitle, setIsEditModeTitle] = useState(false)

	const handleOnDeleteClick = () => {
		store.deleteTodo(column, todo)
	}

	const handleOnTodoClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsModalOpen(true)
	}

	const handleOnModalClose = () => {
		setIsModalOpen(false)
		setIsEditModeDescription(false)
	}

	const handleOnDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		store.setTodoDescription(todo, trim(e.target.value))
		store.setTodoEditDate(todo, Date.now())
	}

	const handleOnTitleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		store.setTodoTitle(todo, trim(e.target.value))
		store.setTodoEditDate(todo, Date.now())
	}

	return <>
		<div className={s.todo} onClick={handleOnTodoClick}>
			<div className={s.todoHeader}>
				<div className={s.content}>
					<div className={s.title}>
						{todo.title ? todo.title : 'Enter title'}
					</div>
					{todo.description?.trim() && (
						<img src={description} alt='description' className={`${s.descriptionIcon} ${s.mt5}`}/>
					)}
				</div>
				<div className={s.actions}>
					<button className={s.delete} onClick={handleOnDeleteClick}>
						<img className={s.deleteIcon} src={trashCan} alt='trash can'/>
					</button>
				</div>
			</div>
		</div>
		<Modal isEditMode={isEditModeTitle || isEditModeDescription} isOpen={isModalOpen} closeModal={handleOnModalClose} title={(
			<SwitchableTextarea value={store.getTodoTitle(todo)} handleOnChange={handleOnTitleChange} placeholder='Enter title'
								isEditMode={isEditModeTitle} setIsEditMode={setIsEditModeTitle} maxRows={5} bold/>
		)}>
			<div className={s.descriptionDiv}>
				<img src={description} alt='description' className={s.descriptionIcon}/>
				<div className={s.descriptionTitle}>
					Description
				</div>
			</div>
			<SwitchableTextarea shouldExitOnEnter={false} value={store.getTodoDescription(todo)} handleOnChange={handleOnDescriptionChange}
								placeholder='Add some description' isEditMode={isEditModeDescription} setIsEditMode={setIsEditModeDescription}
								maxRows={15}/>
			<div className={s.creationDate}>
				<span className={s.creationDateSpan}>Created at: </span>
				{new Date(todo.creationDate).toString()}
			</div>
			<div className={s.editDate}>
				<span className={s.editDateSpan}>Edited at: </span>
				{new Date(todo.editDate).toString()}
			</div>
		</Modal>
	</>
})
