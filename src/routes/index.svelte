<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { APPLICATION_NAME } from '$lib/application-name';
</script>

<svelte:head>
  <title>{APPLICATION_NAME}</title>
</svelte:head>

<div class="flex-grow flex">
  <div class="m-auto text-gray-600">No Factory Selected!</div>
</div>
