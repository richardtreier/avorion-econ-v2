/**
 * Good entry from goodsindex.lua
 */
export interface Good {
  name: string;
  plural: string;
  description: string;
  icon: string;
  price: number;
  size: number;
  level?: number | null;
  importance: number;
  illegal: boolean;
  dangerous: boolean;
  tags: GoodTypeFlags;
  chains: GoodTypeFlags;
  id: number;
}

export interface GoodTypeFlags {
  industrial?: boolean;
  military?: boolean;
  technology?: boolean;
  basic?: boolean;
  consumer?: boolean;
}
