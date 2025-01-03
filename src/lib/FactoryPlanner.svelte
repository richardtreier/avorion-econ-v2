<script lang="ts">
  import FactoryLabel from '$lib/FactoryLabel.svelte';
  import GoodIcon from '$lib/GoodIcon.svelte';
  import GoodLabel from '$lib/GoodLabel.svelte';
  import { formatNumber } from '$lib/utils/format-number';
  import { BuildTreeStore } from './avorion/build-tree-store';
  import FactoryPlannerAddRemoveButtons from './FactoryPlannerAddRemoveButtons.svelte';

  const buildTreeStore = BuildTreeStore.INSTANCE;
  const buildTree = buildTreeStore.buildTree$;
</script>

<h2 class="text-3xl">Factory Planner</h2>
<div>
  <table class="table-small">
    <thead>
      <tr>
        <th>Factory</th>
        <th>Produces</th>
        <th>Consumes</th>
        <th class="text-right">Parallel Cycles</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each $buildTree?.items as buildTreeItem}
        <tr>
          <td>
            <FactoryLabel factory={buildTreeItem.factory} />
          </td>
          <td>
            {#if !buildTreeItem.factory?.outputs?.length}
              -
            {/if}
            {#each buildTreeItem.factory?.outputs as factoryOutput}
              <GoodIcon good={factoryOutput} />
            {/each}
          </td>
          <td>
            {#if !buildTreeItem.factory?.inputs?.length}
              -
            {/if}
            {#each buildTreeItem.factory?.inputs as factoryInput}
              <GoodIcon good={factoryInput} />
            {/each}
          </td>
          <td class="text-right">{formatNumber(buildTreeItem.amount)}</td>
          <td class="text-center">
            <FactoryPlannerAddRemoveButtons factory={buildTreeItem.factory} />
          </td>
        </tr>
      {:else}
        <tr><td colspan="5" class="text-center">No factories planned.</td></tr>
      {/each}
    </tbody>
  </table>
</div>
<div>
  <table class="table-small">
    <thead>
      <tr>
        <th>Good</th>
        <th class="text-right">Diff per Cycle</th>
        <th class="text-right">Profit per Cycle</th>
      </tr>
    </thead>
    <tbody>
      {#each $buildTree?.allGoods as goodInfo}
        <tr>
          <td>
            <GoodLabel good={goodInfo.good} />
          </td>
          <td
            class="text-right"
            class:text-red-600={goodInfo.diffPerCycle < 0}
            title={`Total Production ${formatNumber(
              goodInfo.producedPerCycle
            )}. Total Consumption: ${formatNumber(goodInfo.consumedPerCycle)}`}
          >
            {formatNumber(goodInfo.diffPerCycle)}
          </td>
          <td class="text-right" class:text-red-600={goodInfo.diffPerCycle < 0}>
            {formatNumber(goodInfo.profitPerCycle)}
          </td>
        </tr>
      {:else}
        <tr><td colspan="3" class="text-center">No goods tracked.</td></tr>
      {/each}
      <tr>
        <td colspan="2" class="font-bold">Total Profit per Cycle</td>
        <td class="text-right">{formatNumber($buildTree.totalProfitPerCycle)}</td>
      </tr>
    </tbody>
  </table>
</div>
<div>
  <button on:click={() => buildTreeStore.autoAddMissing()} class="btn btn-indigo"
    >Autofill supply chain</button
  >
</div>
