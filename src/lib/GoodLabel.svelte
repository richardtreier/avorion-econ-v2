<script lang="ts">
  import { FactoryInput, FactoryOutput } from './avorion/data/factory';
  import type { Good } from './avorion/data/good';
  import GoodIcon from './GoodIcon.svelte';

  export let good: FactoryInput | FactoryOutput | Good;
  export let large = false;

  $: iconClasses = large ? 'w-8 h-8' : 'w-4 h-4 inline align-middle';
  $: textClasses = large ? 'text-3xl' : '';
</script>

<GoodIcon {good} additionalClasses={iconClasses} />
<slot />
<a href="/goods/{good.id}" class="{textClasses} hover:underline">{good.name}</a>
