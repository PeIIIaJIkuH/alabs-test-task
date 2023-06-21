import clsx from 'clsx'
import { CSSProperties, FC } from 'react'
import s from './ImageButton.module.css'

interface ImageButtonProps {
	src: string
	alt: string
	size?: number
	handleClick?: () => void
	className?: string
	style?: CSSProperties
}

export const ImageButton: FC<ImageButtonProps> = ({ src, alt, size = 15, handleClick, className, style }) => {
	return (
		<button className={clsx(s.btn, className)} onClick={handleClick} style={style}>
			<img className={s.img} src={src} alt={alt} width={size} height={size} />
		</button>
	)
}
