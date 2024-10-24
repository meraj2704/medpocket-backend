// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 100000000 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   },
// }).single("file");

// const checkFileType = (
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.nimetype)
// };
