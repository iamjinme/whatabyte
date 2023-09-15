import { BaseItem, Item, Items } from "./items.interface";
import modelItems from "./items.model";
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ dictionary: 'number', length: 10 });

/**
 * In memory store
 */
let items: Items = {
  1: {
    id: 1,
    name: "Burger",
    price: 599,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 299,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
  },
  3: {
    id: 3,
    name: "Tea",
    price: 199,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
  }
};

/**
 * Service methods
 */
export const findAll = async (): Promise<Item[]> => modelItems.getAllItems();

export const find = async (id: number): Promise<Item> => modelItems.getItem(id);

export const create = async (newItem: BaseItem): Promise<Item> => modelItems.createItem(newItem);

export const update = async (id: number, itemUpdate: BaseItem): Promise<Item | null> => {
  const item = await find(id);

  if (!item) return null;

  return await modelItems.updateItem(id, itemUpdate);
};

export const remove = async (id: number): Promise<null | void> => {
  const item = await find(id);

  if (!item) return null;

  modelItems.deleteItem(id);
};