import {ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler, useRef, useState} from 'react'
import {useOnClickOutside} from '../../hooks/useOnClickOutside'
import store from '../../store/store'
import {IColumn} from '../../types/types'
import {trim} from '../../utils/trim'
import s from './AddItem.module.css'

interface AddItemProps {
	text: string
	type: 'todo' | 'column'
	column?: IColumn
}

export const AddItem: FC<AddItemProps> = ({text, type, column}) => {
	const [name, setName] = useState(''),
		[isEditMode, setIsEditMode] = useState(false),
		[isAnimated, setIsAnimated] = useState(false),
		[className, setClassName] = useState(''),
		inputRef = useRef<HTMLInputElement>(null),
		createDivRef = useRef<HTMLDivElement>(null)

	const handleOnInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setName(trim(e.target.value))
	}

	const handleOnAddClick = () => {
		setIsEditMode(true)
		setIsAnimated(true)
	}

	const closeInput = () => {
		setClassName(s.showAddBtn)
		setIsAnimated(false)
		setTimeout(() => {
			setName('')
			setIsEditMode(false)
		}, 200)
	}

	const handleOnCancelClick = () => {
		closeInput()
	}

	const createItem = (name: string) => {
		if (type === 'column') {
			store.createColumn(name.trim())
		} else if (type === 'todo') {
			store.createTodo(column!, name.trim())
		}
		setName('')
	}

	const handleOnInputKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter' && name.trim() !== '') {
			createItem(name)
		}
	}

	const handleOnInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Escape') {
			closeInput()
		}
	}

	const handleOnCreateclick: MouseEventHandler<HTMLButtonElement> = () => {
		if (name.trim() !== '') {
			createItem(name)
		}
		inputRef.current?.focus()
	}

	useOnClickOutside(createDivRef, () => {
		closeInput()
	})

	return (
		<div className={`${s.addDiv} ${isEditMode && s.expandAddDiv} ${type === 'column' ? s.addColumnDiv : s.addTodoDiv}`}>
			{!isEditMode ? (
				<button className={`${s.addBtn} ${isAnimated ? s.hideAddBtn : className} ${type === 'column' ? s.addColumnBtn : s.addTodoBtn}`}
						onClick={handleOnAddClick}>
					{text}
				</button>
			) : (
				<div className={`${s.createDiv} ${isAnimated ? s.showCreateDiv : s.hideCreateDiv}`} ref={createDivRef}>
					<input autoFocus className={s.input} type='text' value={name} onChange={handleOnInputChange} onKeyPress={handleOnInputKeyPress}
						   onKeyDown={handleOnInputKeyDown} ref={inputRef}/>
					<div className={s.actions}>
						<button className={s.createBtn} onClick={handleOnCreateclick}>
							{text}
						</button>
						<button className={s.cancelBtn} onClick={handleOnCancelClick}>
							&#10006;
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
