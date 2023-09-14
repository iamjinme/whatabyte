import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./items.interface";

export const itemsRouter = express.Router();

itemsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll();

    res.status(200).send(items);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    } else {
      res.status(500).send(`Unexpected error: ${e}`);
    }
  };
});

itemsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemService.find(id);

    if (item) return res.status(200).send(item);

    res.status(404).send('Item not found');
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    } else {
      res.status(500).send(`Unexpected error: ${e}`);
    }
  };
});

itemsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;

    const newItem: Item = await ItemService.create(item);

    res.status(201).json(newItem);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    } else {
      res.status(500).send(`Unexpected error: ${e}`);
    }
  };
});

itemsRouter.put('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Item = req.body;

    const foundItem: Item = await ItemService.find(id);

    if (foundItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    };

    const newItem: Item = await ItemService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    } else {
      res.status(500).send(`Unexpected error: ${e}`);
    }
  };
});

itemsRouter.delete('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    await ItemService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    } else {
      res.status(500).send(`Unexpected error: ${e}`);
    }
  };
});