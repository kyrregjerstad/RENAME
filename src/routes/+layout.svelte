<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import '../app.pcss';
	import AnimatedIconGitHub from '../components/AnimatedIconGitHub.svelte';
	import ThemeSwitcher from '../components/ThemeSwitcher.svelte';
</script>

<svelte:head>
	<script
		defer
		data-domain="rename.noroff.dev"
		src="https://analytics.kyrre.dev/js/script.js"
	></script>
</svelte:head>

<Toaster />

<main
	class="from flex min-h-svh flex-col items-center bg-background dark:bg-gradient-to-tr dark:from-stone-950 dark:to-background"
>
	<ThemeSwitcher />
	<slot />
	<div class="flex-grow"></div>
	<a href="https://github.com/kyrregjerstad/RENAME" class="p-4">
		<AnimatedIconGitHub />
	</a>
</main>
