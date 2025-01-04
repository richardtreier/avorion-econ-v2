<script lang="ts">
  import { base } from '$app/paths';
  import type { Factory } from './avorion/data/factory';

  const FACTORY_ICONS = {
    mine: 'rock.png',
    collector: 'hydrogen.png',
    factory: 'gears.png',
    solarpowerplant: 'solar-cell.png',
    farm: 'shiny-apple.png',
    ranch: 'meat.png'
  };

  export let factory: Factory;
  export let additionalClasses = '';

  let src: string;
  $: src = base + '/icons/' + FACTORY_ICONS[factory.type.toLowerCase()];
</script>

<img {src} alt={factory.name} class={additionalClasses} />
