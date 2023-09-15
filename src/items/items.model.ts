import ShortUniqueId from 'short-unique-id';
import { BaseItem, Item } from "./items.interface";
import RedisProvider from "./../common/redis.provider";

const uid = new ShortUniqueId({ dictionary: 'number', length: 10 });

const client = RedisProvider.getClient();

class Items {
  async getAllItems(): Promise<Item[]> {
    let items: Item[] = [];
    const data = await client.hGetAll('items');
    if (data) {
      for (const item in data) {
        items.push(JSON.parse(data[item]));
      };
    }
    return items;
  };
  async getItem(id: number): Promise<Item> {
    const item = await client.hGet('items', id.toString());
    return JSON.parse(item || '{}');
  };
  async createItem(item: BaseItem): Promise<Item> {
    const id: number = parseInt(uid.rnd(), 10) // or new Date().valueOf();
    const created = await client.hSet('items', id.toString(), JSON.stringify({
      id,
      ...item,
    }));
    return { id, ...item };
  };
  async updateItem(id: number, item: BaseItem): Promise<Item> {
    const updated = await client.hSet('items', id.toString(), JSON.stringify({id, ...item}));
    return { id, ...item}
  };
  async deleteItem(id: number): Promise<null | void> {
    await client.hDel('items', id.toString());
  };
};

export default new Items();