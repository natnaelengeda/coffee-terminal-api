import { Response, Request } from "express";
import { Admin } from "../model/admin";
import argon2 from 'argon2';
import { generateUserAccessToken } from "../utils/userAccessToken";

export const getAll = async (req: Request, res: Response) => {
  try {
    const AdminData = await Admin.find();

    res.status(200).json(AdminData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please fill all fields' });
    }

    const adminExist = await Admin.findOne({ email: email });

    if (adminExist) {
      return res.status(400).json({ msg: 'Admin already exist' });
    }

    const hashedPassword = await argon2.hash(password);

    const admin = new Admin({
      name: name,
      email: email,
      password: hashedPassword,
      role: "SA"
    });

    await admin.save();

    res.status(200).json({ msg: 'Admin created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}

export const login = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).json({ msg: 'Please fill all fields' });
    }

    const admin = await Admin.findOne
      ({
        email
      });

    if (!admin) {
      return res.status(400).json({ msg: 'Admin not found' });
    }

    const passwordValid = await argon2.verify(admin.password, password);

    if (!passwordValid) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const accessToken = generateUserAccessToken(
      admin._id,
      admin.name,
      admin.email
    );

    res.status(200).json({ msg: 'Admin logged in', accessToken: accessToken });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}