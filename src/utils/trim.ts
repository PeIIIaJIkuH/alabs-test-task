export const trim = (str: string): string => {
	let endsWithSpace = str[str.length - 1] === ' '
	str = str.trim()
	if (endsWithSpace)
		str += ' '
	return str
}
