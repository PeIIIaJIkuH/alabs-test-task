import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {IColumn} from '../../types'
import {AddItem} from '../AddItem'
import {Column} from './Column'
import s from './Columns.module.css'

interface ColumnsProps {
	columns: IColumn[]
}

export const Columns: FC<ColumnsProps> = observer(({columns}) => {
	return (
		<div className={s.columns}>
			{columns.map((column: IColumn) => (
				<Column key={column.id} column={column}/>
			))}
			<AddItem text='Add Column' type='column'/>
		</div>
	)
})
