<script lang="ts">
  import { BuildTreeStore } from './avorion/build-tree-store';
  import type { Factory } from './avorion/data/factory';

  export let factory: Factory;
  const buildTreeStore = BuildTreeStore.INSTANCE;
  const buildTree = buildTreeStore.buildTree$;
  $: amount = $buildTree.items.find((item) => item.factory.id === factory?.id)?.amount || 0;
</script>

<button on:click={() => buildTreeStore.addFactory(factory)} class="text-indigo-600 hover:underline"
  >Add</button
>
|
<button
  on:click={() => buildTreeStore.removeFactory(factory)}
  class={amount === 0 ? 'text-gray-600' : 'text-indigo-600 hover:underline'}>Remove</button
>
