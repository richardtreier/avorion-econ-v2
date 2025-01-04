import { compareByString } from '$lib/utils/compare-utils';
import type { Factory, FactoryInput, FactoryOutput } from './data/factory';
import { FACTORY_LIST } from './data/factory-list';
import type { Good } from './data/good';
import { GOOD_LIST } from './data/good-list';

const goodProducers = new Map<number, Factory[]>(
  GOOD_LIST.map((good) => [
    good.id,
    FACTORY_LIST.filter((factory) => factory.outputs.some((output) => output.id === good.id))
  ])
);

const goodOrWasteProducers = new Map<number, Factory[]>(
  GOOD_LIST.map((good) => [
    good.id,
    FACTORY_LIST.filter(
      (factory) =>
        factory.garbages.some((output) => output.id === good.id) ||
        factory.inputs.some((input) => input.id === good.id)
    )
  ])
);

const goodConsumers = new Map<number, Factory[]>(
  GOOD_LIST.map((good) => [
    good.id,
    FACTORY_LIST.filter((factory) => factory.inputs.some((input) => input.id === good.id))
  ])
);

const goodById = new Map<number, Good>(GOOD_LIST.map((good) => [good.id, good]));
const factoryById = new Map<number, Factory>(FACTORY_LIST.map((factory) => [factory.id, factory]));

function throwIfNull<T>(obj: T | null | undefined, msgFn: () => string): T {
  if (obj == null) {
    throw new Error(msgFn());
  }
  return obj;
}

export function findFactoryByIdOrThrow(factoryId: number): Factory {
  return throwIfNull(factoryById.get(factoryId), () => `Factory with ID ${factoryId} not found`);
}

export function findGoodByIdOrThrow(goodId: number): Good {
  return throwIfNull(goodById.get(goodId), () => `Good with ID ${goodId} not found`);
}

export function findProducersForGood(good: Good | FactoryInput | FactoryOutput): Factory[] {
  return (goodProducers.get(good.id) || []).sort(compareByString((x) => x.name));
}

// this needs to be distinguished for the auto-fill algorithm to not loop itself
// feel free to find an actual algorithm using some weird fuzzing and circle-detections
export function findGoodOrWasteProducersForGood(
  good: Good | FactoryInput | FactoryOutput
): Factory[] {
  return (goodOrWasteProducers.get(good.id) || []).sort(compareByString((x) => x.name));
}

export function findConsumersForGood(good: Good | FactoryInput | FactoryOutput): Factory[] {
  return (goodConsumers.get(good.id) || []).sort(compareByString((x) => x.name));
}

export function getFactoryGoodslevel(factory: Factory): number {
  return (factory.outputs || [])
    .map((output) => findGoodByIdOrThrow(output.id))
    .map((good) => good.level)
    .reduce((a, b) => Math.max(a, b), 1);
}
