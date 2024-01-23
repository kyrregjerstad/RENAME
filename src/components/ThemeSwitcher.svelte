<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Sun, Moon } from 'lucide-svelte';

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};
</script>

<div class="absolute self-start p-2">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button builders={[builder]} variant="ghost" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end" class="border-opacity-30">
			<form method="POST" use:enhance={submitUpdateTheme}>
				<DropdownMenu.Item class="p-0">
					<button formaction="/?/setTheme&theme=light" class="w-full p-2 text-start">Light</button>
				</DropdownMenu.Item>
				<DropdownMenu.Item class="p-0">
					<button formaction="/?/setTheme&theme=dark" class="w-full p-2 text-start">Dark</button>
				</DropdownMenu.Item>
				<DropdownMenu.Item class="p-0">
					<button formaction="/?/setTheme&theme=noroff" class="w-full p-2 text-start">Noroff</button
					>
				</DropdownMenu.Item>
				<DropdownMenu.Item class="p-0">
					<button formaction="/?/setTheme&theme=system" class="w-full p-2 text-start">System</button
					>
				</DropdownMenu.Item>
			</form>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
