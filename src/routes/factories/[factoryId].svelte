<script context="module" lang="ts">
  import { APPLICATION_NAME } from '$lib/application-name';
  import {
    calculateBaseCycleDuration,
    calculateOptimalProductionCapacity,
    calculateProfitPerCycle,
    MIN_CYCLE_DURATION
  } from '$lib/avorion/calculations';
  import type { Factory } from '$lib/avorion/data/factory';
  import {
    findConsumersForGood,
    findFactoryByIdOrThrow,
    findGoodOrWasteProducersForGood,
    getFactoryGoodslevel
  } from '$lib/avorion/lookups';
  import Duration from '$lib/Duration.svelte';
  import FactoryLabel from '$lib/FactoryLabel.svelte';
  import FactoryPlannerAddRemoveButtons from '$lib/FactoryPlannerAddRemoveButtons.svelte';
  import GoodLabel from '$lib/GoodLabel.svelte';
  import { formatNumber } from '$lib/utils/format-number';
  import type { LoadInput } from '@sveltejs/kit';

  export interface FactoryInfo {
    factory: Factory;
    baseCycleTime: number;
    optimalProductionCapacity: number;
    profitPerCycle: number;
  }

  export function buildFactoryInfo(factory: Factory): FactoryInfo {
    return {
      factory,
      baseCycleTime: calculateBaseCycleDuration(factory),
      optimalProductionCapacity: calculateOptimalProductionCapacity(factory),
      profitPerCycle: calculateProfitPerCycle(factory)
    };
  }

  export function load(input: LoadInput) {
    const factory = findFactoryByIdOrThrow(+input.page.params.factoryId);
    const factoryInfo = buildFactoryInfo(factory);
    return {
      props: {
        factory,
        factoryInfo
      }
    };
  }
</script>

<script lang="ts">
  import FactoryInputsOutputs from '$lib/FactoryInputsOutputs.svelte';

  export let factory: Factory;
  export let factoryInfo: FactoryInfo;
</script>

<svelte:head><title>{APPLICATION_NAME} - {factory.name}</title></svelte:head>

<div class="flex-grow flex flex-col p-3 space-y-3">
  <!-- Header Row -->
  <h1 class="flex flex-row items-center gap-3">
    <div class="flex-grow flex flex-row items-center gap-3">
      <FactoryLabel {factory} large={true} />
    </div>
    <div>
      <FactoryPlannerAddRemoveButtons {factory} />
    </div>
  </h1>
  <!-- Stats, Inputs and Outputs -->
  <div class="flex flex-row gap-3">
    <div class="flex flex-col space-y-3 w-1/2">
      <div>
        <div class="font-bold">Type</div>
        <div>{factory.type}</div>
      </div>
      <div>
        <div class="font-bold">Cost</div>
        <div>{formatNumber(factory.cost)} Cr</div>
      </div>
      <div>
        <div class="font-bold">Upgrade Cost</div>
        <div>{formatNumber(factory.upgradeCost)} Cr x Level</div>
      </div>
      <div>
        <div class="font-bold">Base Cycle Time</div>
        <div><Duration seconds={factoryInfo.baseCycleTime} /></div>
      </div>
      <div>
        <div class="font-bold">Goodslevel</div>
        <div>{formatNumber(getFactoryGoodslevel(factory))}</div>
      </div>
    </div>

    <div class="space-y-3 w-1/2">
      <div>
        <div class="font-bold">Cost Per Cycle</div>
        <div>{formatNumber(factory.inputCost)}</div>
      </div>
      <div>
        <div class="font-bold">Proceeds Per Cycle</div>
        <div>{formatNumber(factory.outputCost)}</div>
      </div>
      <div>
        <div class="font-bold">Profit Per Cycle</div>
        <div>{formatNumber(factoryInfo.profitPerCycle)}</div>
      </div>
      <div>
        <div class="font-bold" title="Production Capacity for {MIN_CYCLE_DURATION}s cycle">
          Optimal Production Capacity
        </div>
        <div>{formatNumber(factoryInfo.optimalProductionCapacity)}</div>
      </div>
    </div>
  </div>

  <div>
    <div class="font-bold">Production</div>
    <FactoryInputsOutputs {factory} />
  </div>

  <div class="flex flex-row gap-3">
    <div class="flex flex-col gap-3 w-1/2">
      {#each factory?.inputs as factoryInput}
        <div>
          <div class="font-bold">Producers of <GoodLabel good={factoryInput} /></div>
          {#each findGoodOrWasteProducersForGood(factoryInput) as producingFactory}
            <div class="flex flex-row">
              <div class="flex-grow">
                <FactoryLabel factory={producingFactory} />
              </div>
              <div>
                <FactoryPlannerAddRemoveButtons factory={producingFactory} />
              </div>
            </div>
          {:else}
            <div>No known producers</div>
          {/each}
        </div>
      {/each}
    </div>

    <div class="flex flex-col gap-3 w-1/2">
      {#each factory?.outputs as factoryOutput}
        <div>
          <div class="font-bold">Consumers of <GoodLabel good={factoryOutput} /></div>
          {#each findConsumersForGood(factoryOutput) as consumingFactory}
            <div class="flex flex-row">
              <div class="flex-grow">
                <FactoryLabel factory={consumingFactory} />
              </div>
              <div>
                <FactoryPlannerAddRemoveButtons factory={consumingFactory} />
              </div>
            </div>
          {:else}
            <div>No known consumers</div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
