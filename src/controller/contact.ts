import { Request, Response } from "express";
import { Contact } from "../model/contact";

export const contact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.find();

    res.status(200).json({ contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    res.status(200).json({ contact });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}