<script lang="ts">
	import { formatAssignmentFilename } from '$lib/formatAssignmentFilename';
	import type { AssignmentInfo } from '$lib/types';
	import { copyToClipboard } from '$lib/utils';

	import { Confetti } from 'svelte-confetti';

	import { getNextAffirmation } from '$lib/getRandomAffirmation';
	import { tick } from 'svelte';
	import toast from 'svelte-french-toast';
	import CopyIcon from './CopyIcon.svelte';

	type Props = {
		values: AssignmentInfo;
	};

	let { values } = $props<Props>();

	let formattedFileName = $derived(formatAssignmentFilename(values));
	let confettiEnabled = $state(false);

	async function handleClick(formattedFileName: string) {
		copyToClipboard(formattedFileName);

		showConfetti();

		const affirmation = getNextAffirmation();

		toast.success(`Copied to clipboard.\n${affirmation}`, {
			duration: 5000,
			style:
				'background: hsl(var(--card)); color: hsl(var(--card-foreground)); border: 1px solid hsl(var(--border));',
		});
	}

	async function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleClick(formattedFileName);
		}
	}

	async function showConfetti() {
		confettiEnabled = false;
		await tick();
		confettiEnabled = true;
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<button
	on:click={() => handleClick(formattedFileName)}
	class="group relative flex w-full items-center justify-center gap-2 rounded-md border border-opacity-0 bg-inputBg p-2 px-8 text-inputBg-foreground shadow-inner hover:border-opacity-100 hover:brightness-110"
>
	<div class="relative">
		{formattedFileName}
		<div class="absolute right-1/2">
			{#if confettiEnabled}
				<Confetti
					delay={[0, 150]}
					x={[-2, 2]}
					y={[3, 0]}
					duration={2200}
					amount={250}
					size={5}
					xSpread={0.1}
					rounded={true}
					fallDistance={'100px'}
				/>
			{/if}
		</div>
	</div>

	<div
		class="absolute right-4 w-4 dark:fill-white fill-black opacity-40 transition-opacity duration-300 group-hover:opacity-100 text-black"
	>
		<CopyIcon style="w-4" />
	</div>
</button>
