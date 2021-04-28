import {observer} from 'mobx-react-lite'
import {FC, useState} from 'react'
import refresh from '../../assets/images/refresh.svg'
import store from '../../store/store'
import {Columns} from '../Columns/Columns'
import {ImageButton} from '../ImageButton/ImageButton'
import s from './Board.module.css'

export const Board: FC = observer(() => {
	const [className, setClassName] = useState('')

	const handleOnClick = () => {
		setClassName(s.rotate)
		store.changeBgImageUrl()
		setTimeout(() => {
			setClassName('')
		}, 1000)
	}

	return (
		<div className={s.board} style={{backgroundImage: `url(${store.bgImageUrl})`}}>
			<Columns columns={store.getColumns()}/>
			<ImageButton src={refresh} alt='refresh' handleClick={handleOnClick} className={`${s.changeBackgroundBtn} ${className}`} size={25}/>
		</div>
	)
})
