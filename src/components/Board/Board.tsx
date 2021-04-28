import {observer} from 'mobx-react-lite'
import {FC, useState} from 'react'
import refresh from '../../assets/images/refresh.svg'
import store from '../../store/store'
import {Columns} from '../Columns/Columns'
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
			<button className={`${s.changeBackgroundBtn} ${className}`} onClick={handleOnClick}>
				<img src={refresh} alt='refresh' className={s.refreshIcon}/>
			</button>
		</div>
	)
})
