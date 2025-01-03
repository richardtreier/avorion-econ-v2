<script context="module" lang="ts">
  import { APPLICATION_NAME } from '$lib/application-name';
  import type { Factory } from '$lib/avorion/data/factory';
  import { Good } from '$lib/avorion/data/good';
  import {
    findConsumersForGood,
    findGoodByIdOrThrow,
    findGoodOrWasteProducersForGood
  } from '$lib/avorion/lookups';
  import FactoryLabel from '$lib/FactoryLabel.svelte';
  import FactoryPlannerAddRemoveButtons from '$lib/FactoryPlannerAddRemoveButtons.svelte';
  import GoodLabel from '$lib/GoodLabel.svelte';
  import { formatNumber } from '$lib/utils/format-number';
  import type { LoadInput } from '@sveltejs/kit';

  export interface GoodInfo {
    good: Good;
    producers: Factory[];
    consumers: Factory[];
  }

  export function buildGoodInfo(good: Good): GoodInfo {
    return {
      good,
      producers: findGoodOrWasteProducersForGood(good),
      consumers: findConsumersForGood(good)
    };
  }

  export function load(input: LoadInput) {
    const good = findGoodByIdOrThrow(+input.page.params.goodId);
    const goodInfo = buildGoodInfo(good);
    return {
      props: {
        good,
        goodInfo
      }
    };
  }
</script>

<script lang="ts">
  import FactoryInputsOutputs from '$lib/FactoryInputsOutputs.svelte';

  export let good: Good;
  export let goodInfo: GoodInfo;
</script>

<svelte:head><title>{APPLICATION_NAME} - {good.name}</title></svelte:head>

<div class="flex-grow flex flex-col p-3 gap-3">
  <!-- Header Row -->
  <h1 class="flex flex-row items-center gap-3">
    <div class="flex-grow flex flex-row items-center gap-3">
      <GoodLabel {good} large={true} />
    </div>
  </h1>

  <!-- Top Section -->
  <div class="flex flex-row gap-3">
    <div class="flex flex-col gap-3 w-1/2">
      <div>
        <div class="font-bold">Type</div>
        <div>Good</div>
      </div>
      <div>
        <div class="font-bold">Price</div>
        <div>{formatNumber(good.price)}</div>
      </div>
    </div>
    <div class="flex flex-col gap-3 w-1/2">
      <div>
        <div class="font-bold">Description</div>
        <div>{good.description}</div>
      </div>
    </div>
  </div>

  <div class="flex flex-row gap-3">
    <div class="w-1/2">
      <div class="font-bold">Producers of <GoodLabel {good} /></div>
      <div class="flex flex-col gap-3">
        {#each goodInfo.producers as factory}
          <div>
            <div class="flex flex-row">
              <div class="flex-grow">
                <FactoryLabel {factory} />
              </div>
              <div>
                <FactoryPlannerAddRemoveButtons {factory} />
              </div>
            </div>
            <FactoryInputsOutputs {factory} classes="ml-4" />
          </div>
        {:else}
          No known producers
        {/each}
      </div>
    </div>
    <div class="w-1/2">
      <div class="font-bold">Consumers of <GoodLabel {good} /></div>
      <div class="flex flex-col gap-3">
        {#each goodInfo.consumers as factory}
          <div>
            <div class="flex flex-row">
              <div class="flex-grow">
                <FactoryLabel {factory} />
              </div>
              <div>
                <FactoryPlannerAddRemoveButtons {factory} />
              </div>
            </div>
            <FactoryInputsOutputs {factory} classes="ml-4" />
          </div>
        {:else}
          No known consumers
        {/each}
      </div>
    </div>
  </div>
</div>
