import mongoose from "mongoose";
import { FolderData, IFolder } from "./folder.interface";
import { Folders } from "./folder.models";

const existFolderWithName = async (name: string) => {
  const folder = await Folders.findOne({ name });
  return folder;
};

const folderById = async (id: mongoose.Types.ObjectId) => {
  const folder = await Folders.findById(id);
  return folder;
};

const createFolder = async (data: FolderData) => {
  const folder = await Folders.create(data);
  return folder;
};

const foldersByUserId = async (userId: mongoose.Types.ObjectId) => {
  const folders = await Folders.find({ user_id: userId })
    .select("_id name createdAt")
    .lean();
  return folders;
};

const folderUpdate = async (id: string, data: { name: string }) => {
  const folder = await Folders.findByIdAndUpdate(
    id,
    { name: data.name },
    { new: true }
  );
  return folder;
};

const folderDelete = async (id: string) => {
  const folder = await Folders.findByIdAndDelete(id);
  return folder;
};

export const FolderServices = {
  existFolderWithName,
  createFolder,
  foldersByUserId,
  folderUpdate,
  folderDelete,
  folderById,
};
