<script lang="ts">
  import { base } from '$app/paths';
  import type { FactoryInput, FactoryOutput } from './avorion/data/factory';
  import type { Good } from './avorion/data/good';
  import { findGoodByIdOrThrow } from './avorion/lookups';

  export let good: Good | FactoryInput | FactoryOutput;
  export let additionalClasses: string = 'w-4 h-4 inline align-middle';

  let fullGood: Good;
  $: fullGood = findGoodByIdOrThrow(good.id);
  $: src = base + '/icons/' + fullGood.icon;
</script>

<img {src} alt={good.name} title={good.name} class={additionalClasses} />
