<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initializeAuth } from '$lib/pocketbase';

	onMount(() => initializeAuth());

	let { children } = $props();
</script>

{@render children()}
