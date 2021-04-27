import {FC, ReactElement, useEffect} from 'react'
import ReactDom from 'react-dom'
import close from '../../assets/images/close.svg'
import s from './Modal.module.css'

interface ModalProps {
	isOpen: boolean
	closeModal: () => void
	title: ReactElement
	isEditMode: boolean
}

export const Modal: FC<ModalProps> = ({
										  children,
										  isOpen, closeModal, title, isEditMode
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

	return ReactDom.createPortal(
		<>
			<div className={s.overlay} onClick={() => closeModal()}/>
			<div className={s.modal}>
				<div className={s.modalInner}>
					<div className={s.modalTitle}>
						{title}
					</div>
					{children}
					<button className={s.modalClose} onClick={() => closeModal()}>
						<img className={s.closeIcon} src={close} alt='close'/>
					</button>
				</div>
			</div>
		</>
		, document.getElementById('modal-portal') as Element)
}

