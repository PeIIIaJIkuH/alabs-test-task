import {FC} from 'react'
import s from './ImageButton.module.css'

interface ImageButtonProps {
	src: string
	alt: string
	size?: number
	handleClick?: () => void
	className?: string
}

export const ImageButton: FC<ImageButtonProps> = ({src, alt, size = 15, handleClick, className}) => {
	return (
		<button className={`${s.btn} ${className}`} onClick={handleClick}>
			<img className={s.img} src={src} alt={alt} width={size} height={size}/>
		</button>
	)
}
