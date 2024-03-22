import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
  try {
    res.status(200).send("Coffee Terminal Api Working");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}