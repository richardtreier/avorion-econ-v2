<script lang="ts">
  import type { Factory } from './avorion/data/factory';
  import FactoryIcon from './FactoryIcon.svelte';

  export let factory: Factory;
  export let large = false;

  $: iconClasses = large ? 'w-8 h-8' : 'w-4 h-4 inline align-middle';
  $: textClasses = large ? 'text-3xl' : '';
</script>

<FactoryIcon {factory} additionalClasses={iconClasses} />
<a href="/factories/{factory.id}" class="{textClasses} hover:underline">{factory.name}</a>
