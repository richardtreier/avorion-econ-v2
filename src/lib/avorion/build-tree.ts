import type { Factory } from './data/factory';
import type { Good } from './data/good';

export interface BuildTree {
  items: BuildTreeItem[];
  allGoods: BuildTreeGoodInfo[];
  totalProfitPerCycle: number;
}

export interface BuildTreeItem {
  amount: number;
  factory: Factory;
}

export interface BuildTreeGoodInfo {
  good: Good;
  consumedPerCycle: number;
  producedPerCycle: number;
  diffPerCycle: number;
  profitPerCycle: number;
}
