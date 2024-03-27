<script lang="ts">
	import Label from '$components/ui/label/label.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { Calendar as CalendarIcon } from 'lucide-svelte';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long',
	});

	type Props = {
		date: DateValue;
	};

	let { date = $bindable() }: Props = $props();
</script>

<div class="grid w-full items-center gap-1.5">
	<Label for={'datePicker'}>{'Date'}</Label>
	<Popover.Root>
		<Popover.Trigger asChild let:builder>
			<Button
				variant="outline"
				class={`${cn('justify-start text-left font-normal', !date && 'text-muted-foreground')} bg-validateSuccess text-black dark:text-white`}
				builders={[builder]}
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{date ? df.format(date.toDate(getLocalTimeZone())) : 'Pick a date'}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0">
			<Calendar bind:value={date} initialFocus />
		</Popover.Content>
	</Popover.Root>
</div>
