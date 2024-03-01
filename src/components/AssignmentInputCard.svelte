<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { AssignmentInfo } from '$lib/types';
	import { getLocalTimeZone, today } from '@internationalized/date';
	import InputField from './InputField2.svelte';
	import DatePicker from './DatePicker.svelte';
	import OutputField from './OutputField.svelte';

	let values = $state<AssignmentInfo>({
		firstName: '',
		lastName: 'Doe',
		course: 'Design1',
		assignmentShortcode: 'CA',
		date: today(getLocalTimeZone()),
		fileType: 'Report',
	});
</script>

<Card.Root
	class="w-full max-w-[800px] border-opacity-50 shadow-md dark:border-noroff dark:border-opacity-35 sm:w-fit sm:min-w-[600px]"
>
	<Card.Header />
	<Card.Content>
		<form class="flex flex-col gap-2 sm:gap-4">
			<div class="flex flex-col gap-4 sm:flex-row">
				<InputField
					label="First Name"
					name="firstName"
					placeholder="John"
					bind:value={values.firstName}
				/>
				<InputField
					label="Last Name"
					name="lastName"
					placeholder="Doe"
					bind:value={values.lastName}
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<InputField label="Course" name="course" placeholder="Design1" bind:value={values.course} />
				<InputField
					label="Assignment Shortcode"
					name="assignmentShortcode"
					placeholder="CA"
					bind:value={values.assignmentShortcode}
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<DatePicker bind:date={values.date} />
				<InputField
					label="File Type"
					name="fileType"
					placeholder="Report"
					bind:value={values.fileType}
				/>
			</div>
		</form>
	</Card.Content>
	<Card.Footer>
		<OutputField {values} />
	</Card.Footer>
</Card.Root>
