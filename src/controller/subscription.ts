import { Request, Response } from "express";
import { EmailSubscription } from "../model/emailSubscription";

export const getALl = async (req: Request, res: Response) => {
  try {
    const subscriptions = await EmailSubscription.find();

    res.status(200).json({ subscriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const addSubscription = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const subscription = new EmailSubscription({
      email,
    });

    await subscription.save();

    res.status(200).json({ subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}