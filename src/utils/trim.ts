export const trim = (str: string): string => {
	let endsWithSpace = /\s/.test(str[str.length - 1])
	const char = str[str.length - 1]
	str = str.trim()
	if (endsWithSpace) str += char
	return str
}
