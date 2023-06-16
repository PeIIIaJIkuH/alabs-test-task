import clsx from 'clsx'
import {FC, ReactElement, useEffect} from 'react'
import ReactDom from 'react-dom'
import close from '../../assets/icons/close.svg'
import {ImageButton} from '../ImageButton/ImageButton'
import s from './Modal.module.css'

interface ModalProps {
	isOpen: boolean
	closeModal: () => void
	title: ReactElement
	isEditMode: boolean
	className?: string
}

export const Modal: FC<ModalProps> = ({
	                                      children, className,
	                                      isOpen, closeModal, title, isEditMode,
                                      }) => {
	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && !isEditMode) {
				closeModal()
			}
		}
		document.addEventListener('keydown', listener)
		return () => {
			document.removeEventListener('keydown', listener)
		}
	}, [closeModal, isEditMode])

	if (!isOpen) return null

	const handleOnCloseClick = () => {
		closeModal()
	}

	return ReactDom.createPortal(
		<>
			<div className={clsx(s.overlay, className)} onClick={handleOnCloseClick}/>
			<div className={clsx(s.modal, className)}>
				<div className={s.modalInner}>
					<div className={s.modalTitle}>
						{title}
					</div>
					{children}
					<ImageButton src={close} alt='close' handleClick={handleOnCloseClick} className={s.modalClose}/>
				</div>
			</div>
		</>
		, document.getElementById('modal-portal') as Element)
}

