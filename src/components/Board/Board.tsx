import clsx from 'clsx'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import refresh from '../../assets/images/refresh.svg'
import store from '../../store/store'
import {Columns} from '../Columns/Columns'
import {ImageButton} from '../ImageButton/ImageButton'
import s from './Board.module.css'

export const Board: FC = observer(() => {
	const [btnClassName, setBtnClassName] = useState('')

	const handleOnClick = () => {
		setBtnClassName(s.rotate)
		store.changeBgImageUrl()
	}

	useEffect(() => {
		setBtnClassName(s.rotate)
		const img = new Image()
		img.src = store.bgImageUrl
		img.onload = () => {
			setBtnClassName('')
		}
		// eslint-disable-next-line
	}, [store.bgImageUrl])

	return (
		<div className={s.board} style={{backgroundImage: `url(${store.bgImageUrl})`}}>
			<Columns columns={store.getColumns()}/>
			<ImageButton src={refresh} alt='refresh' handleClick={handleOnClick} className={clsx(s.changeBackgroundBtn, btnClassName)} size={25}/>
		</div>
	)
})
