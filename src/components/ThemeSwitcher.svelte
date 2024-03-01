<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { themeSchema, themeStore } from '$lib/stores/theme';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Sun, Moon } from 'lucide-svelte';

  const submitUpdateTheme: SubmitFunction = ({ action }) => {
    const data = action.searchParams.get('theme');
    const result = themeSchema.safeParse(data);

    if (!result.success) {
      return;
    }

    const theme = result.data;
    themeStore.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  $effect(() => {
    const dataTheme = document.documentElement.getAttribute('data-theme');

    const result = themeSchema.safeParse(dataTheme);

    if (!result.success) {
      return;
    }
    const currentTheme = result.data;

    themeStore.set(currentTheme);
  });
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
          <button formaction="/?/setTheme&theme=light" class="w-full p-2 text-start">
            Alpine
            {$themeStore === 'light' ? '✓ ' : ''}
          </button>
        </DropdownMenu.Item>
        <DropdownMenu.Item class="p-0">
          <button formaction="/?/setTheme&theme=dark" class="w-full p-2 text-start"
            >Midnight
            {$themeStore === 'dark' ? '✓ ' : ''}
          </button>
        </DropdownMenu.Item>
        <DropdownMenu.Item class="p-0">
          <button formaction="/?/setTheme&theme=noroff" class="w-full p-2 text-start"
            >Noroff
            {$themeStore === 'noroff' ? '✓ ' : ''}
          </button>
        </DropdownMenu.Item>
      </form>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
