<script lang="ts">
  import type { Factory } from './avorion/data/factory';
  import FactoryIcon from './FactoryIcon.svelte';
  import InternalLink from './InternalLink.svelte';

  export let factory: Factory;
  export let large = false;

  $: iconClasses = large ? 'w-8 h-8' : 'w-4 h-4 inline align-middle';
  $: textClasses = large ? 'text-3xl' : '';
</script>

<FactoryIcon {factory} additionalClasses={iconClasses} />
<InternalLink href="/factories/{factory.id}" cls="{textClasses} hover:underline"
  >{factory.name}</InternalLink
>
