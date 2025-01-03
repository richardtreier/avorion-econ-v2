<script lang="ts">
  export let seconds: number = 0;
  const SECONDS_IN_ONE_HOUR = 60.0 * 60.0;
  const SECONDS_IN_ONE_MINUTE = 60.0;

  let hours: number = 0;
  let minutes: number = 0;
  let displaySeconds: number = 0;

  $: {
    hours = Math.floor((seconds || 0) / SECONDS_IN_ONE_HOUR);
    minutes = Math.floor(((seconds || 0) % SECONDS_IN_ONE_HOUR) / SECONDS_IN_ONE_MINUTE);
    displaySeconds = Math.floor((seconds || 0) % SECONDS_IN_ONE_MINUTE);
  }
</script>

{#if hours}
  {hours} hours
{/if}{#if minutes}
  {minutes} minutes
{/if}
{displaySeconds} seconds
