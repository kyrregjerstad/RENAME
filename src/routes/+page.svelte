<script>
	import AssignmentInputCard from '../components/AssignmentInputCard.svelte';
	import Logo from '../components/Logo.svelte';
</script>

<div
	class="flex w-full flex-col items-center justify-center gap-4 px-4 pb-12 pt-2 sm:gap-12 sm:pt-12"
>
	<div class="flex flex-col items-center justify-center sm:gap-4">
		<Logo />
		<h2 class="text-md text-center dark:text-stone-200 sm:text-2xl">
			Rapidly Enhance and Name Assignments for Maximum Efficiency
		</h2>
	</div>
	<AssignmentInputCard />
</div>

<style lang="postcss">
	h2 {
		font-family: 'Martian Mono', monospace;
		text-wrap: pretty;
	}
</style>
