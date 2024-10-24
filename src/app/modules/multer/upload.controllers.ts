import { Request, Response, NextFunction } from "express";
import File from "./file.models";

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log("function hit")
    const { filename, path, size, mimetype } = req.file;

    const newFile = new File({
      filename,
      path,
      size,
      mimetype,
    });

    await newFile.save();

    res
      .status(200)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    const err = error as Error;
    console.error('Upload file error:', err.message);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
