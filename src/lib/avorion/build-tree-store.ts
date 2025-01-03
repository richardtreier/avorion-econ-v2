import { compareByNumber, compareByString } from '$lib/utils/compare-utils';
import { writable } from 'svelte/store';
import type { BuildTree, BuildTreeGoodInfo, BuildTreeItem } from './build-tree';
import type { Factory } from './data/factory';
import { findGoodByIdOrThrow, findProducersForGood } from './lookups';

/**
 * A svelte store for the current build plan
 * 
 * - Add factories
 * - Auto-add other factories to build everything from scratch
 */
export class BuildTreeStore {
  static INSTANCE = new BuildTreeStore();
  buildTree$ = writable<BuildTree>(this.buildBuildTree([]));

  resetForFactory(factory: Factory): void {
    this.buildTree$.update(() => this.buildBuildTree([this.buildTreeItem(factory)]));
  }

  addFactory(factory: Factory): void {
    this.buildTree$.update((buildTree) => {
      const items = this.withAddedFactory(buildTree.items, factory);
      return this.buildBuildTree(items);
    });
  }

  removeFactory(factory: Factory): void {
    this.buildTree$.update((buildTree) => {
      const items = this.withRemovedFactory(buildTree.items, factory);
      return this.buildBuildTree(items);
    });
  }

  autoAddMissing(): void {
    this.buildTree$.update((buildTree) =>
      this.buildBuildTree(this.autoAddAsLongAsYouCan(buildTree.items))
    );
  }

  private autoAddAsLongAsYouCan(items: BuildTreeItem[]): BuildTreeItem[] {
    let hadChange = true;
    while (hadChange) {
      hadChange = false;

      const missingGoods = this.calculateAllGoods(items).filter(
        (goodInfo) => goodInfo.diffPerCycle < 0
      );

      missingGoods.forEach((goodInfo) => {
        const producers = findProducersForGood(goodInfo.good);
        if (producers.length) {
          items = this.withAddedFactory(items, producers[0]);
          hadChange = true;
        }
      });
    }
    return items;
  }

  private withAddedFactory(items: BuildTreeItem[], factory: Factory): BuildTreeItem[] {
    const hasItem = items.some((x) => x.factory.id === factory.id);
    if (hasItem) {
      items = items.map((item) =>
        item.factory.id === factory.id ? { ...item, amount: item.amount + 1 } : item
      );
    } else {
      items = [...items, this.buildTreeItem(factory)];
    }
    return items;
  }

  private withRemovedFactory(items: BuildTreeItem[], factory: Factory): BuildTreeItem[] {
    const existing = items.find((x) => x.factory.id === factory.id);
    if (existing && existing.amount == 2) {
      items = items.filter((item) => item.factory.id !== factory.id);
    } else {
      items = items.map((item) =>
        item.factory.id === factory.id ? { ...item, amount: Math.max(2, item.amount - 1) } : item
      );
    }
    return items;
  }

  private buildBuildTree(items: BuildTreeItem[]): BuildTree {
    const allGoods = this.calculateAllGoods(items);
    const totalProfitPerCycle = allGoods.reduce(
      (sum, goodInfo) => sum + goodInfo.profitPerCycle,
      0
    );

    return {
      items: items.sort(compareByString((x) => x.factory.name)),
      allGoods,
      totalProfitPerCycle
    };
  }

  private calculateAllGoods(items: BuildTreeItem[]): BuildTreeGoodInfo[] {
    const map = new Map<number, BuildTreeGoodInfo>();

    const add = (goodId: number, amount: number) => {
      let goodInfo: BuildTreeGoodInfo = map.get(goodId);
      if (goodInfo == null) {
        goodInfo = {
          consumedPerCycle: 0,
          producedPerCycle: 0,
          diffPerCycle: 0,
          profitPerCycle: 0,
          good: findGoodByIdOrThrow(goodId)
        };
        map.set(goodId, goodInfo);
      }
      if (amount > 0) {
        goodInfo.producedPerCycle += amount;
      } else {
        goodInfo.consumedPerCycle -= amount;
      }
      goodInfo.diffPerCycle += amount;
      goodInfo.profitPerCycle = goodInfo.diffPerCycle * goodInfo.good.price;
    };

    items.forEach((item) => {
      const amount = item.amount;
      item.factory.inputs?.forEach((input) => add(input.id, -input.amount * amount));
      item.factory.outputs?.forEach((output) => add(output.id, output.amount * amount));
    });

    return [...map.values()].sort(compareByNumber((x) => -x.profitPerCycle));
  }

  private buildTreeItem(factory: Factory): BuildTreeItem {
    return { factory, amount: 2 };
  }
}
