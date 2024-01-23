import { type DateValue } from '@internationalized/date';

export type AssignmentInfo = {
	firstName: string;
	lastName: string;
	course: string;
	assignmentShortcode: string;
	date: DateValue;
	fileType: string;
};

export type Theme = 'light' | 'dark' | 'noroff' | 'system';
