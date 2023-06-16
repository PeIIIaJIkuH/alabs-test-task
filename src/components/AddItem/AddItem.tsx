import clsx from 'clsx'
import {ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler, useRef, useState} from 'react'
import {useOnClickOutside} from '../../hooks/useOnClickOutside'
import {store} from '../../store/store'
import {IColumn} from '../../types/types'
import {trim} from '../../utils/trim'
import {ImageButton} from '../ImageButton/ImageButton'
import s from './AddItem.module.css'
import close from '../../assets/icons/close.svg'

interface AddItemProps {
	text: string
	type: 'todo' | 'column'
	column?: IColumn
}

export const AddItem: FC<AddItemProps> = ({text, type, column}) => {
	const [name, setName] = useState(''),
		[isEditMode, setIsEditMode] = useState(false),
		[isAnimated, setIsAnimated] = useState(false),
		[itemWasCreated, setItemWasCreated] = useState(false),
		[btnClassName, setBtnClassName] = useState(''),
		inputRef = useRef<HTMLInputElement>(null),
		createDivRef = useRef<HTMLDivElement>(null)

	const handleOnInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setName(trim(e.target.value))
	}

	const handleOnAddClick = () => {
		setIsEditMode(true)
		setIsAnimated(true)
		setBtnClassName(s.showAddBtn)
	}

	const closeInput = () => {
		setIsAnimated(false)
		setTimeout(() => {
			setIsEditMode(false)
			setName('')
		}, 200)
	}

	const handleOnCancelClick = () => {
		closeInput()
	}

	const createItem = (name: string) => {
		if (type === 'column') {
			setItemWasCreated(true)
			setTimeout(() => {
				store.createColumn(name)
				setItemWasCreated(false)
			}, 200)
		} else if (type === 'todo') {
			store.createTodo(column!, name)
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
		<div
			className={clsx(s.addDiv, isEditMode && s.expandAddDiv, type === 'column' ? s.addColumnDiv : s.addTodoDiv,
				itemWasCreated && s.moveRight)}
		>
			{!isEditMode ? (
				<button className={clsx(s.addBtn, isAnimated ? s.hideAddBtn : btnClassName,
					type === 'column' ? s.addColumnBtn : s.addTodoBtn)}
				        onClick={handleOnAddClick}
				>
					{text}
				</button>
			) : (
				<div className={clsx(s.createDiv, isAnimated ? s.showCreateDiv : s.hideCreateDiv)} ref={createDivRef}>
					<input autoFocus className={s.input} type='text' value={name} onChange={handleOnInputChange} onKeyPress={handleOnInputKeyPress}
					       onKeyDown={handleOnInputKeyDown} ref={inputRef}
					/>
					<div className={s.actions}>
						<button className={s.createBtn} onClick={handleOnCreateclick}>
							{text}
						</button>
						<ImageButton src={close} alt='close' handleClick={handleOnCancelClick}/>
					</div>
				</div>
			)}
		</div>
	)
}
