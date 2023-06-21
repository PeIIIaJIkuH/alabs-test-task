import { FC } from 'react'
import { Board } from './components/Board/Board'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const App: FC = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<Board />
		</DndProvider>
	)
}
