import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useDrop } from 'react-dnd'
import { ColumnItem, IColumn } from '../../types'
import { AddItem } from '../AddItem/AddItem'
import { Column } from './Column/Column'
import s from './Columns.module.css'
import { ItemTypes } from '../../constants/item-types'

interface ColumnsProps {
	columns: IColumn[]
}

export const Columns: FC<ColumnsProps> = observer(({ columns }) => {
	const [{ isOver }, drop] = useDrop<ColumnItem, void, { isOver: boolean }>({
		accept: ItemTypes.COLUMN,
		drop: ({ id, index }) => {},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	})

	return (
		<div className={s.columns} ref={drop}>
			{columns.map((column: IColumn, index) => (
				<Column key={column.id} column={column} index={index} />
			))}
			<AddItem text='Add Column' type='column' />
		</div>
	)
})
