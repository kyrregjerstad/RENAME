<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { AssignmentInfo } from '$lib/types';
	import { getLocalTimeZone, today } from '@internationalized/date';
	import InputField from './InputField.svelte';
	import DatePicker from './DatePicker.svelte';
	import OutputField from './OutputField.svelte';

	const { firstName, lastName } = $props<{ firstName: string | null; lastName: string | null }>();

	let data = $state<AssignmentInfo>({
		firstName: firstName ?? 'John',
		lastName: lastName ?? 'Doe',
		course: '',
		assignmentShortcode: '',
		date: today(getLocalTimeZone()),
		fileType: '',
	});

	// Save the first and last name to a cookie instead of using local storage
	// so that it's server-side rendered with the initial page load
	$effect(() => {
		document.cookie = `firstName=${data.firstName}; path=/; max-age=31536000`;
		document.cookie = `lastName=${data.lastName}; path=/; max-age=31536000`;
	});
</script>

<Card.Root
	class="w-full max-w-[800px] border-opacity-50 shadow-md dark:border-noroff dark:border-opacity-35 sm:w-fit sm:min-w-[600px]"
>
	<Card.Header />
	<Card.Content>
		<div class="flex flex-col gap-2 sm:gap-4">
			<div class="flex flex-col gap-4 sm:flex-row">
				<InputField
					label="First Name"
					name="firstName"
					placeholder="John"
					bind:value={data.firstName}
				/>
				<InputField
					label="Last Name"
					name="lastName"
					placeholder="Doe"
					bind:value={data.lastName}
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<InputField label="Course" name="course" placeholder="Design1" bind:value={data.course} />
				<InputField
					label="Assignment Shortcode"
					name="assignmentShortcode"
					placeholder="CA"
					bind:value={data.assignmentShortcode}
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<DatePicker bind:date={data.date} />
				<InputField
					label="File Type"
					name="fileType"
					placeholder="Report"
					bind:value={data.fileType}
				/>
			</div>
		</div>
	</Card.Content>
	<Card.Footer>
		<OutputField values={data} />
	</Card.Footer>
</Card.Root>
