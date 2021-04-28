import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import store from '../../store/store'
import {Columns} from '../Columns/Columns'
import s from './Board.module.css'

export const Board: FC = observer(() => {
	return (
		<div className={s.board}>
			<Columns columns={store.getColumns()}/>
		</div>
	)
})
