import { describe, it, expect, vi } from 'vitest';
import { formatAssignmentFilename } from './formatAssignmentFilename';
import type { DateValue } from '@internationalized/date';

function createMockDate(date: string) {
	return {
		toString: vi.fn(() => date),
	} as unknown as DateValue;
}

describe('formatAssignmentFilename', () => {
	it('formats the filename correctly', () => {
		const mockDate = createMockDate('2023-01-01');

		const assignmentInfo = {
			firstName: 'John',
			lastName: 'Doe',
			course: 'Web Development',
			assignmentShortcode: 'WD101',
			date: mockDate,
			fileType: 'pdf',
		};

		const expectedOutput = '2023-01-01_web-development_wd101_john-doe_pdf';
		expect(formatAssignmentFilename(assignmentInfo)).toBe(expectedOutput);
		expect(mockDate.toString).toHaveBeenCalled();
	});

	it('handles varying string cases and spaces', () => {
		const mockDate = createMockDate('2023-01-01');

		const assignmentInfo = {
			firstName: 'Jane',
			lastName: 'Van Doe',
			course: 'Advanced Math',
			assignmentShortcode: 'AM 202',
			date: mockDate,
			fileType: 'DocX',
		};

		const expectedOutput = '2023-01-01_advanced-math_am-202_jane-van-doe_docx';
		expect(formatAssignmentFilename(assignmentInfo)).toBe(expectedOutput);
	});

	it('handles special characters in input strings', () => {
		const mockDate = createMockDate('2023-02-02');

		const assignmentInfo = {
			firstName: 'O’Neil',
			lastName: 'Smith-Jones',
			course: 'Physics & Astronomy',
			assignmentShortcode: 'P&A 303',
			date: mockDate,
			fileType: 'pdf',
		};

		const expectedOutput = '2023-02-02_physics-&-astronomy_p&a-303_o’neil-smith-jones_pdf';
		expect(formatAssignmentFilename(assignmentInfo)).toBe(expectedOutput);
	});

	it('handles empty or null inputs', () => {
		const mockDate = createMockDate('2023-03-03');

		const assignmentInfo = {
			firstName: '',
			lastName: '',
			course: ' ',
			assignmentShortcode: '',
			date: mockDate,
			fileType: ' ',
		};

		const expectedOutput = '2023-03-03___';
		expect(formatAssignmentFilename(assignmentInfo)).toBe(expectedOutput);
	});
});
