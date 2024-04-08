import type { AssignmentInfo } from './types';

export function formatAssignmentFilename(values: AssignmentInfo) {
	const { firstName, lastName, course, assignmentShortcode, date, fileType } = values;

	const dateOutput = date?.toString() || '';
	const courseOutput = course.trim().toLowerCase().replace(/\s+/g, '-');
	const assignmentShortcodeOutput = assignmentShortcode.trim().toLowerCase().replace(/\s+/g, '-');
	const firstNameOutput = firstName.trim().toLowerCase().replace(/\s+/g, '-');
	const lastNameOutput = lastName.trim().toLowerCase().replace(/\s+/g, '-');
	const fileTypeOutput = fileType.trim().toLowerCase().replace(/\s+/g, '-');
	const output = `${dateOutput}_${courseOutput}_${assignmentShortcodeOutput}_${firstNameOutput}-${lastNameOutput}_${fileTypeOutput}`;
	return output.trim();
}
