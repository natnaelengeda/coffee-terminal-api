import { Request, Response } from "express";
import { BranchesModel } from "../model/branches";
import path from "path";

export const getAll = async (req: Request, res: Response) => {
  try {
    const branches = await BranchesModel.find();

    res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { name, gate, description, location, locationOnMap, additional } = req.body;
    const image = req.file?.filename;

    await BranchesModel.create({
      name: name,
      gate: gate,
      image: image,
      description: description,
      location: location,
      locationOnMap: locationOnMap,
      additional: additional
    });

    res.status(200).json({ status: true, msg: "Branch Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id, name, gate, description, location, locationOnMap } = req.body;

    const branch = await BranchesModel.findById(id);

    if (!branch) {
      return res.status(403).json({ msg: "Branch Not Found" });
    }

    await BranchesModel.updateOne(
      { _id: id },
      {
        name: name,
        gate: gate,
        description: description,
        location: location,
        locationOnMap: locationOnMap
      });

    res.status(200).json({ msg: "Branch Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export const updateImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const image = req.file?.filename;

    await BranchesModel.updateOne(
      { _id: id },
      {
        image: image
      });

    res.status(200).json({ msg: "Image Updated Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await BranchesModel.findByIdAndDelete(id);

    res.status(200).json({ msg: "Branch Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export const getImage = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const location = path.join(__dirname, "../../uploads/images/branches/");

    res.sendFile(location + name);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}