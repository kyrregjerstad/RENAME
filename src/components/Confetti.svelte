<script lang="ts">
	import { emojis } from '$lib/emojis';

	let confettiEmojis = $state<string[]>([]);

	$effect(() => {
		let interval = setInterval(() => {
			confettiEmojis = [...confettiEmojis, emojis[Math.floor(Math.random() * emojis.length)]];
		}, 10);

		setTimeout(() => {
			clearInterval(interval);
		}, 1000);
	});
</script>

<div>
	{#each confettiEmojis as emoji, i}
		<div class="emoji absolute" style={`animation: move${i % 5} 2s linear;`}>
			{emoji}
		</div>
	{/each}
</div>

<style>
	.emoji {
		font-size: 2rem;
	}
	@keyframes move0 {
		/* Define movement for animation 0 */

		0% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(100vw, 100vh);
		}
	}

	@keyframes move1 {
		/* Define movement for animation 1 */

		0% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(-100vw, -100vh);
		}
	}

	@keyframes move2 {
		/* Define movement for animation 2 */

		0% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(-100vw, 100vh);
		}
	}

	@keyframes move3 {
		/* Define movement for animation 3 */

		0% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(100vw, -100vh);
		}
	}

	@keyframes move4 {
		/* Define movement for animation 4 */

		0% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(100vw, 0);
		}
	}
</style>
