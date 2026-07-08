import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { FILE_UPLOAD } from '../constants/index.js';
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check file type
  if (!FILE_UPLOAD.ALLOWED_TYPES.includes(file.mimetype)) {
    cb(new Error(`Invalid file type. Allowed types: ${FILE_UPLOAD.ALLOWED_TYPES.join(', ')}`));
    return;
  }

  // Check file extension
  const ext = path.extname(file.originalname).toLowerCase();
  if (!FILE_UPLOAD.ALLOWED_EXTENSIONS.includes(ext)) {
    cb(new Error(`Invalid file extension. Allowed extensions: ${FILE_UPLOAD.ALLOWED_EXTENSIONS.join(', ')}`));
    return;
  }

  cb(null, true);
};

// Multer configuration
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: FILE_UPLOAD.MAX_SIZE,
  },
});

/**
 * Single file upload middleware
 */
export const uploadSingle = (fieldName: string) => upload.single(fieldName);

/**
 * Multiple files upload middleware
 */
export const uploadMultiple = (fieldName: string, maxCount: number = 5) => 
  upload.array(fieldName, maxCount);

/**
 * Multiple fields upload middleware
 */
export const uploadFields = (fields: { name: string; maxCount: number }[]) => 
  upload.fields(fields);
