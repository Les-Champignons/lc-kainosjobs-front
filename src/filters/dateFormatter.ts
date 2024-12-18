export function dateFormatter(timestamp: number): string {
	const date = new Date(timestamp);
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	console.log(`${day}/${month}/${year}`);
	return `${day}/${month}/${year}`;
}
