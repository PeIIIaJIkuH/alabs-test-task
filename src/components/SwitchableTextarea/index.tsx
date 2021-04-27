import {ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler, useRef} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {useOnClickOutside} from '../../hooks/useOnClickOutside'
import s from './SwitchableTextarea.module.css'

interface Props {
	shouldExitOnEnter?: boolean
	value: string | undefined
	handleOnChange: ChangeEventHandler<HTMLTextAreaElement>
	placeholder: string
	isEditMode: boolean
	setIsEditMode: (mode: boolean) => void
	maxRows: number
	bold?: boolean
}

export const SwitchableTextarea: FC<Props> = ({
												  shouldExitOnEnter = true, value, handleOnChange, placeholder,
												  isEditMode, setIsEditMode, maxRows, bold = false
											  }) => {
	const ref = useRef<HTMLTextAreaElement>(null)

	const handleOnClick: MouseEventHandler<HTMLTextAreaElement> = () => {
		setIsEditMode(true)
		ref.current?.select()
	}

	const handleOnKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
		if ((shouldExitOnEnter && e.key === 'Enter') || (!shouldExitOnEnter && e.key === 'Enter' && e.ctrlKey)) {
			e.preventDefault()
			setIsEditMode(false)
			ref?.current?.blur()
		} else if (e.key === 'Escape') {
			setIsEditMode(false)
			ref.current?.blur()
		}
	}

	useOnClickOutside(ref, () => {
		setIsEditMode(false)
	})

	return <TextareaAutosize className={`${s.textarea} ${isEditMode && s.active} ${bold && s.fw600}`} value={value} onChange={handleOnChange}
							 onClick={handleOnClick} ref={ref} onKeyDown={handleOnKeyDown} placeholder={placeholder} maxRows={maxRows}/>
}
