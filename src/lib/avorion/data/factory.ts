/**
 * Factory entry from productionsindex.lua
 */

export interface Factory {
  id: number;
  name: string;
  type: string;
  inputs: FactoryInput[];
  outputs: FactoryOutput[];
  garbages: FactoryOutput[];
  cost: number;
  upgradeCost: number;
  inputCost: number;
  outputCost: number;
  productionTime: number;
}

export interface FactoryInput {
  name: string;
  amount: number;
  optional: number;
  id: number;
}

export interface FactoryOutput {
  name: string;
  amount: number;
  id: number;
}
