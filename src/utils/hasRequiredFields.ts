export default function hasRequiredFields(
	obj: Record<string, any>,
	requiredFields: string[]
): boolean {
	return requiredFields.every((field) => {
		return Object.hasOwn(obj, field);
		// return field in obj;
		// return obj.hasOwnProperty(field);
	});
}
