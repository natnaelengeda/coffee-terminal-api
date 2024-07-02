import { Response, Request } from "express";
import { Food } from "../model/foods";
import { FoodList } from "../model/foodList";
import { randIdGenerator } from "../utils/randIdGenerator";
import path from "path";

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

export const updateFood = async (req: Request, res: Response) => {
  try {
    const { id, name, price } = req.body;

    const food = await Food.findOne({ "foodList._id": id });

    if (!food) {
      return res.status(404).json({ msg: 'Food not found' });
    }

    await Food.updateOne({ "foodList._id": id },
      {
        $set: {
          "foodList.$.name": name,
          "foodList.$.price": price
        }
      }
    );

    res.status(200).json({ msg: 'Food updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}

export const updateFoodImage = async (req: Request, res: Response) => {
  const { id } = req.body;
  const image = req.file?.filename;

  await Food.updateOne(
    { "foodList._id": id },
    {
      $set: { "foodList.$.image": image }
    }
  );

  res.status(200).json({ msg: 'Image updated successfully' });
}

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const food = await Food.findOne({ "foodList._id": id });

    if (!food) {
      return res.status(404).json({ msg: 'Food not found' });
    }

    await Food.updateOne(
      { "foodList._id": id },
      {
        $pull: { foodList: { _id: id } },
      },
    )

    res.status(200).json({ msg: 'Food deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export const getImage = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const location = path.join(__dirname, "../../uploads/images/food/");

    res.sendFile(location + name);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}