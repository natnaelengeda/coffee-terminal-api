import { Response, Request } from "express";
import { Food } from "../model/foods";
import { FoodList } from "../model/foodList";
import { randIdGenerator } from "../utils/randIdGenerator";

export const getAll = async (req: Request, res: Response) => {
  try {
    const FoodData = await Food.find();
    res.status(200).json(FoodData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}

export const createCatagory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;

    const food = await Food.findOne({ title: category });

    if (food) {
      return res.status(400).json({ msg: 'Category already exists' });
    }

    const newFood = new Food({
      title: category
    });

    const savedFood = await newFood.save();

    res.status(200).json(savedFood);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}

export const addFood = async (req: any, res: Response) => {
  try {

    const { category, name, price } = req.body;
    const image = req.files[0].filename;
    const food = await Food.findById(category);

    if (!food) {
      return res.status(404).json({ msg: 'Food not found' });
    }

    await Food.updateOne({ _id: category },
      {
        $push: {
          foodList: {
            _id: randIdGenerator(),
            name: name,
            price: price,
            image: image,
          }
        }
      }
    );

    res.status(200).json({ msg: 'Food added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}