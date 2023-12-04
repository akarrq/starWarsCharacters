export function formatDate(date) {
	const dateObj = new Date(date);

	return dateObj.toUTCString();
}
