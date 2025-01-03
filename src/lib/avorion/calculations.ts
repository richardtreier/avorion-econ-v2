import type { Factory } from './data/factory';

export const BASE_FACTORY_PRODUCTION = 100;
export const MIN_CYCLE_DURATION = 15;

export function calculateBaseCycleDuration(factory: Factory): number {
  const cycleDuration = factory.productionTime / BASE_FACTORY_PRODUCTION;
  return Math.max(cycleDuration, MIN_CYCLE_DURATION);
}

export function calculateOptimalProductionCapacity(factory: Factory): number {
  if (factory.productionTime <= MIN_CYCLE_DURATION * BASE_FACTORY_PRODUCTION) {
    return 0;
  }

  return Math.ceil(factory.productionTime / MIN_CYCLE_DURATION);
}

export function calculateProfitPerCycle(factory: Factory): number {
  return factory.outputCost - factory.inputCost;
}
