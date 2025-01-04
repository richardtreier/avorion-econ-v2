<script lang="ts">
  import type { Factory } from '$lib/avorion/data/factory';
  import { FACTORY_LIST } from './avorion/data/factory-list';
  import type { Good } from './avorion/data/good';
  import { GOOD_LIST } from './avorion/data/good-list';
  import FactoryIcon from './FactoryIcon.svelte';
  import GoodIcon from './GoodIcon.svelte';
  import InternalLink from './InternalLink.svelte';
  import { compareByString, compareWith } from './utils/compare-utils';

  interface FactoryOrGood {
    type: 'FACTORY' | 'GOOD';
    factory?: Factory;
    good?: Good;

    searchAndSortTarget: string;
  }

  const allFactoriesAndGoods: FactoryOrGood[] = [
    ...FACTORY_LIST.map(
      (factory): FactoryOrGood => ({
        type: 'FACTORY',
        factory,
        searchAndSortTarget: factory.name.toLocaleLowerCase()
      })
    ),
    ...GOOD_LIST.map(
      (good): FactoryOrGood => ({
        type: 'GOOD',
        good,
        searchAndSortTarget: good.name.toLocaleLowerCase()
      })
    )
  ];

  let visibleFactoriesAndGoods: FactoryOrGood[];
  let searchText = '';

  $: searchTerms = searchText
    .split(' ')
    .map((x) => x.trim().toLocaleLowerCase())
    .filter((word) => !!word.length);

  $: visibleFactoriesAndGoods = [...allFactoriesAndGoods]
    .sort(
      compareWith(
        // prefer factories popping up before goods
        compareByString((it) => it.type),
        compareByString((it) => it.searchAndSortTarget)
      )
    )
    .filter((it) => searchTerms.every((searchTerm) => it.searchAndSortTarget.includes(searchTerm)));
</script>

<div class="flex grow flex-col gap-2">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    bind:value={searchText}
    type="text"
    class="w-full rounded border bg-gray-100 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
    placeholder="Search"
    autofocus
    autocomplete="off"
  />

  <div class="flex grow flex-col overflow-y-scroll pr-3">
    {#each visibleFactoriesAndGoods as factoryOrGood}
      {#if factoryOrGood.type === 'FACTORY'}
        <InternalLink
          href="/factories/{factoryOrGood.factory.id}"
          cls="space-x-2 rounded px-3 py-2 hover:bg-gray-200"
          clsActive="bg-gray-100 font-semibold"
        >
          <FactoryIcon
            factory={factoryOrGood.factory}
            additionalClasses="w-6 h-6 inline align-middle"
          />
          {factoryOrGood.factory.name}
        </InternalLink>
      {:else}
        <InternalLink
          href="/goods/{factoryOrGood.good.id}"
          cls="space-x-2 rounded px-3 py-2 hover:bg-gray-200"
          clsActive="bg-gray-100 font-semibold"
        >
          <GoodIcon good={factoryOrGood.good} additionalClasses="w-6 h-6 inline align-middle" />
          {factoryOrGood.good.name}
        </InternalLink>
      {/if}
    {/each}
  </div>
</div>
