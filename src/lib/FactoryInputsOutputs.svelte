<script lang="ts">
  import type { Factory } from './avorion/data/factory';
  import GoodLabel from './GoodLabel.svelte';

  export let factory: Factory;
  export let classes = '';
</script>

<div class="flex flex-row gap-3 items-center {classes}">
  <div>
    {#if !factory.inputs?.length}
      No inputs
    {/if}
    {#each factory?.inputs as factoryInput}
      <div>
        <GoodLabel good={factoryInput}>
          {factoryInput.amount}x
        </GoodLabel>
      </div>
    {/each}
  </div>

  <div class="text-4xl">&gt;</div>

  <div>
    {#if !factory.outputs?.length && !factory.garbages.length}
      No outputs
    {/if}
    {#each factory?.outputs as factoryOutput}
      <div>
        <GoodLabel good={factoryOutput}>
          {factoryOutput.amount}x
        </GoodLabel>
      </div>
    {/each}
    {#each factory?.garbages as factoryGarbage}
      <div>
        <GoodLabel good={factoryGarbage}>
          {factoryGarbage.amount}x
        </GoodLabel>
      </div>
    {/each}
  </div>
</div>
