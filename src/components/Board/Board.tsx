import clsx from 'clsx'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import refresh from '../../assets/icons/refresh.svg'
import store from '../../store/store'
import {getRandomInt} from '../../utils/getRandomInt'
import {Columns} from '../Columns/Columns'
import {ImageButton} from '../ImageButton/ImageButton'
import s from './Board.module.css'

export const Board: FC = observer(() => {
	const [bgImgUrl, setBgImgUrl] = useState(''),
		[imgClassName, setImgClassName] = useState(''),
		[degree, setDegree] = useState(0)

	const handleOnClick = () => {
		const {innerWidth, innerHeight} = window,
			id = getRandomInt(0, 50)
		setBgImgUrl(`https://picsum.photos/id/${id}/${innerWidth}/${innerHeight}`)
	}

	useEffect(() => {
		let intervalId: number
		if (bgImgUrl !== '')
			intervalId = window.setInterval(() => {
				setDegree(prev => prev - 1000)
			}, 100)
		const img = new Image()
		img.src = bgImgUrl
		img.onload = () => {
			setImgClassName(s.hide)
			clearInterval(intervalId)
			setTimeout(() => {
				setImgClassName('')
				store.setBgImageUrl(bgImgUrl)
			}, 200)
		}
		return () => {
			clearInterval(intervalId)
		}
	}, [bgImgUrl])

	return (
		<div className={s.board}>
			<img src={store.bgImageUrl} alt='background' className={clsx(s.backgroundImg, imgClassName)}/>
			<Columns columns={store.getColumns()}/>
			<ImageButton src={refresh} alt='refresh' handleClick={handleOnClick} className={s.changeBackgroundBtn} size={25}
			             style={{transform: `rotate(${degree}deg)`}}
			/>
		</div>
	)
})
