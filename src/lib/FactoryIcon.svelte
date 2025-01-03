<script context="module" lang="ts">
  export const FACTORY_ICONS = {
    mine: 'rock.png',
    collector: 'hydrogen.png',
    factory: 'gears.png',
    solarpowerplant: 'solar-cell.png',
    farm: 'shiny-apple.png',
    ranch: 'meat.png'
  };
</script>

<script lang="ts">
  import type { Factory } from './avorion/data/factory';

  export let factory: Factory;
  export let additionalClasses = '';

  let src: string;
  $: src = '/icons/' + FACTORY_ICONS[factory.type.toLowerCase()];
</script>

<img {src} alt={factory.name} class={additionalClasses} />
