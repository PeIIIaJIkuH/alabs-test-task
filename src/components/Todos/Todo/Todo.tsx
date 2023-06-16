import clsx from 'clsx'
import {observer} from 'mobx-react-lite'
import {ChangeEventHandler, FC, useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import description from '../../../assets/icons/description.svg'
import trashCan from '../../../assets/icons/trashCan.svg'
import {store} from '../../../store/store'
import {IColumn, ITodo} from '../../../types/types'
import {trim} from '../../../utils/trim'
import {ImageButton} from '../../ImageButton/ImageButton'
import {Modal} from '../../Modal/Modal'
import {SwitchableTextarea} from '../../SwitchableTextarea/SwitchableTextarea'
import s from './Todo.module.css'

interface TodoProps {
	todo: ITodo
	column: IColumn
	index: number
}

export const Todo: FC<TodoProps> = observer(({todo, column, index}) => {
	const [isModalOpen, setIsModalOpen] = useState(false),
		[isEditModeDescription, setIsEditModeDescription] = useState(false),
		[isEditModeTitle, setIsEditModeTitle] = useState(false),
		[isDeleting, setIsDeleting] = useState(false),
		[modalClassName, setModalClassName] = useState('')

	const handleOnDeleteClick = () => {
		setIsDeleting(true)
		setTimeout(() => {
			setIsModalOpen(false)
		}, 0)
		setTimeout(() => {
			setIsDeleting(false)
			store.deleteTodo(column, todo)
		}, 200)
	}

	const handleOnTodoClick = () => {
		setIsModalOpen(true)
	}

	const handleOnModalClose = () => {
		setModalClassName(s.modalClosing)
		setTimeout(() => {
			setIsModalOpen(false)
			setIsEditModeDescription(false)
			setModalClassName('')
		}, 200)
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
		<Draggable draggableId={todo.id} index={index}>
			{({draggableProps, dragHandleProps, innerRef}, {isDragging}) => (
				<div className={clsx(s.todo, isDeleting && s.hideTodo, store.createdItemId === todo.id && s.showTodo,
					isDragging && s.draggingTodo)}
				     onClick={handleOnTodoClick} {...draggableProps} {...dragHandleProps} ref={innerRef}
				>
					<div>
						<div className={s.title}>
							{todo.title ? todo.title : 'Enter title'}
						</div>
						{todo.description?.trim() && (
							<img src={description} alt='description' className={s.descriptionIcon}/>
						)}
					</div>
					<div className={s.actions}>
						<ImageButton src={trashCan} alt='trash can' handleClick={handleOnDeleteClick} className={s.deleteBtn}/>
					</div>
				</div>
			)}
		</Draggable>

		<Modal isEditMode={isEditModeTitle ||
			isEditModeDescription} isOpen={isModalOpen} closeModal={handleOnModalClose} className={modalClassName}
		       title={(
			       <SwitchableTextarea value={store.getTodoTitle(
				       todo)} handleOnChange={handleOnTitleChange} placeholder='Enter title'
			                           isEditMode={isEditModeTitle} setIsEditMode={setIsEditModeTitle} maxRows={5} bold fontSize={20}
			       />
		       )}
		>
			<div className={s.descriptionDiv}>
				<img src={description} alt='description' className={s.descriptionIcon}/>
				<div className={s.descriptionTitle}>
					Description
				</div>
			</div>
			<SwitchableTextarea shouldExitOnEnter={false} value={store.getTodoDescription(
				todo)} handleOnChange={handleOnDescriptionChange}
			                    placeholder='Add some description' isEditMode={isEditModeDescription} setIsEditMode={setIsEditModeDescription}
			                    maxRows={15}
			/>
			<div className={s.creationDate}>
				<span className={s.creationDateSpan}>Created at: </span>
				<span className={s.date}>{new Date(todo.creationDate).toString()}</span>
			</div>
			<div>
				<span className={s.editDateSpan}>Edited at: </span>
				<span className={s.date}>{new Date(todo.editDate).toString()}</span>
			</div>
		</Modal>
	</>
})
