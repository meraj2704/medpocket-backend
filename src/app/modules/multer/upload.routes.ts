import { Router } from 'express';
import upload from '../../config/multer.config';
import { uploadFile } from './upload.controllers';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);

export const uploadRouter = router;
