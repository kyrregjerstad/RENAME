<script lang="ts">
	import { formatAssignmentFilename } from '$lib/formatAssignmentFilename';
	import type { AssignmentInfo } from '$lib/types';
	import { copyToClipboard } from '$lib/utils';

	import { confetti } from '@neoconfetti/svelte';
	import { tick } from 'svelte';
	import CopyIcon from './CopyIcon.svelte';
	import toast from 'svelte-french-toast';
	import { affirmations } from '$lib/constants';

	type Props = {
		values: AssignmentInfo;
	};

	let { values } = $props<Props>();

	let formattedFileName = $derived(formatAssignmentFilename(values));
	let confettiEnabled = $state(false);

	function shuffleArray(array: Array<string>) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
	const shuffledAffirmations = shuffleArray(affirmations);

	let currentIndex = 0;

	async function handleClick(formattedFileName: string) {
		copyToClipboard(formattedFileName);

		showConfetti();

		const affirmation = shuffledAffirmations[currentIndex % shuffledAffirmations.length];
		currentIndex++;

		toast.success(`Copied to clipboard.\n${affirmation}`, {
			duration: 5000,
			style:
				'background: hsl(var(--card)); color: hsl(var(--card-foreground)); border: 1px solid hsl(var(--border));'
		});
	}

	async function showConfetti() {
		confettiEnabled = false;
		await tick();
		confettiEnabled = true;
	}

	function getRandFloat(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}
</script>

<button
	on:click={() => handleClick(formattedFileName)}
	class="group relative flex w-full items-center justify-center gap-2 rounded-md border border-opacity-0 bg-inputBg p-2 px-8 text-inputBg-foreground shadow-inner hover:border-opacity-100 hover:brightness-110"
>
	<div class="relative">
		{formattedFileName}
		<div class="absolute right-1/2">
			{#if confettiEnabled}
				<div
					use:confetti={{ particleSize: 4, particleCount: 250, force: getRandFloat(0.3, 0.9) }}
				/>
			{/if}
		</div>
	</div>
	<div
		class="absolute right-4 w-4 fill-foreground opacity-40 transition-opacity duration-300 group-hover:opacity-100"
	>
		<CopyIcon style="w-4" />
	</div>
</button>
