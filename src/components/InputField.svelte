<script lang="ts">
	import { Input, type InputEvents } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	type Props = {
		label: string;
		name: string;
		placeholder: string;
		value: string;
	};

	let { label, name, placeholder, value = $bindable() }: Props = $props();

	function checkIfValid(value: string, isTouched: boolean) {
		if (isTouched === false && value === '') {
			return null;
		}

		if (value === '') {
			return false;
		} else if (value.trim() === '') {
			return false;
		} else {
			return true;
		}
	}

	let isTouched = $state(false);
	let isValid = $derived(checkIfValid(value, isTouched));
</script>

<div class="grid w-full items-center gap-1.5">
	<Label for={name}>{label}</Label>
	<Input
		type="text"
		id={name}
		{placeholder}
		class={cn(
			isValid === null ? 'bg-validateNeutral' : isValid ? 'bg-validateSuccess' : 'bg-validateError',
		)}
		required
		on:input={() => (isTouched = true)}
		bind:value
	/>
</div>
