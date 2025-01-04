<script lang="ts">
  import { APPLICATION_NAME } from '$lib/application-name';
  import type { Factory } from '$lib/avorion/data/factory';
  import type { Good } from '$lib/avorion/data/good';
  import {
    findConsumersForGood,
    findGoodByIdOrThrow,
    findGoodOrWasteProducersForGood
  } from '$lib/avorion/lookups';
  import FactoryLabel from '$lib/FactoryLabel.svelte';
  import FactoryPlannerAddRemoveButtons from '$lib/FactoryPlannerAddRemoveButtons.svelte';
  import GoodLabel from '$lib/GoodLabel.svelte';
  import { formatNumber } from '$lib/utils/format-number';
  import FactoryInputsOutputs from '$lib/FactoryInputsOutputs.svelte';
  import { page } from '$app/stores';

  interface GoodInfo {
    producers: Factory[];
    consumers: Factory[];
  }

  let good: Good;
  let goodInfo: GoodInfo;

  $: {
    good = findGoodByIdOrThrow(+$page.params.goodId);
    goodInfo = {
      producers: findGoodOrWasteProducersForGood(good),
      consumers: findConsumersForGood(good)
    };
  }
</script>

<svelte:head><title>{APPLICATION_NAME} - {good.name}</title></svelte:head>

<div class="flex grow flex-col gap-3 p-3">
  <!-- Header Row -->
  <h1 class="flex flex-row items-center gap-3">
    <div class="flex grow flex-row items-center gap-3">
      <GoodLabel {good} large={true} />
    </div>
  </h1>

  <!-- Top Section -->
  <div class="flex flex-row gap-3">
    <div class="flex w-1/2 flex-col gap-3">
      <div>
        <div class="font-bold">Type</div>
        <div>Good</div>
      </div>
      <div>
        <div class="font-bold">Price</div>
        <div>{formatNumber(good.price)}</div>
      </div>
    </div>
    <div class="flex w-1/2 flex-col gap-3">
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
              <div class="grow">
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
              <div class="grow">
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
