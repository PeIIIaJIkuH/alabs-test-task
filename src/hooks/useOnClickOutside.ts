import {RefObject, useEffect} from 'react'

export const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: (event: Event) => void) => {
	useEffect(() => {
		const listener = (e: Event) => {
			if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
				return
			}
			handler(e)
		}
		document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)

		return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, handler])
}
