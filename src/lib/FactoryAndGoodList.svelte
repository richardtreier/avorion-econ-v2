<script lang="ts">
  import { page } from '$app/stores';
  import type { Factory } from '$lib/avorion/data/factory';
  import { FACTORY_LIST } from './avorion/data/factory-list';
  import { Good } from './avorion/data/good';
  import { GOOD_LIST } from './avorion/data/good-list';
  import FactoryIcon from './FactoryIcon.svelte';
  import GoodIcon from './GoodIcon.svelte';
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
    .sort(compareWith(
      // prefer factories popping up before goods
      compareByString(it => it.type),
      compareByString(it => it.searchAndSortTarget)
    ))
    .filter((it) => searchTerms.every((searchTerm) => it.searchAndSortTarget.includes(searchTerm)));
</script>

<div class="flex-grow flex flex-col gap-2">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    bind:value={searchText}
    type="text"
    class="border bg-gray-100 py-2 px-4 outline-none focus:ring-2 focus:ring-indigo-400 rounded w-full"
    placeholder="Search"
    autofocus
    autocomplete="off"
  />

  <div class="flex-grow flex flex-col overflow-y-scroll pr-3">
    {#each visibleFactoriesAndGoods as factoryOrGood}
      {#if factoryOrGood.type === 'FACTORY'}
        <a
          href="/factories/{factoryOrGood.factory.id}"
          class="py-2 px-3 space-x-2 hover:bg-gray-200 rounded {$page.path ===
          '/factories/' + factoryOrGood.factory.id
            ? 'font-semibold bg-gray-100'
            : ''}"
        >
          <FactoryIcon
            factory={factoryOrGood.factory}
            additionalClasses="w-6 h-6 inline align-middle"
          />
          {factoryOrGood.factory.name}
        </a>
      {:else}
        <a
          href="/goods/{factoryOrGood.good.id}"
          class="py-2 px-3 space-x-2 hover:bg-gray-200 rounded {$page.path ===
          '/goods/' + factoryOrGood.good.id
            ? 'font-semibold bg-gray-100'
            : ''}"
        >
          <GoodIcon good={factoryOrGood.good} additionalClasses="w-6 h-6 inline align-middle" />
          {factoryOrGood.good.name}
        </a>
      {/if}
    {/each}
  </div>
</div>
