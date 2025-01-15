import { FolderData, IFolder } from "./folder.interface";
import { Folders } from "./folder.models";

const existFolderWithName = async (name: string) => {
  const folder = await Folders.findOne({ name });
  return folder;
};

const createFolder = async (data: FolderData) => {
  const folder = await Folders.create(data);
  return folder;
};

const foldersByUserId = async (userId: string) => {
  const folders = await Folders.findById({ user_id: userId })
    .select("_id name createdAt")
    .lean();
  return folders;
};

export const FolderServices = {
  existFolderWithName,
  createFolder,
  foldersByUserId
};
