"use server";

import User from "../models/User";

import dbConnect from "../db";

export async function createUser(user: any) {
  try {
    await dbConnect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(email: string, updatedData: any) {
  try {
    await dbConnect();
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      updatedData,
      {
        new: true,
      },
    );

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}
