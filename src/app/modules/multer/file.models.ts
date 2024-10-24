import { Schema, model, Document } from 'mongoose';

interface IFile extends Document {
  filename: string;
  path: string;
  size: number;
  mimetype: string;
}

const fileSchema = new Schema<IFile>({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
});

const File = model<IFile>('File', fileSchema);

export default File;
