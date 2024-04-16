<script lang="ts">
	import '../app.pcss';
	import Analytics from './Analytics.svelte';
	import { Toaster } from 'svelte-french-toast';
	import AnimatedIconGitHub from '../components/AnimatedIconGitHub.svelte';
	import ThemeSwitcher from '../components/ThemeSwitcher.svelte';
</script>

<Analytics />
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
