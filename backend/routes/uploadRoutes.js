// import path from 'path';
// import express from 'express';
// import multer from 'multer';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// const router = express.Router();

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, path.join(__dirname, '../frontend/public/uploads/'));  // <-- Root-level uploads folder
//     },
//     filename(req, file, cb) {
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//     },
// });

// function checkFileType(file, cb) {
//     const filetypes = /jpg|jpeg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (extname && mimetype) {
//         cb(null,true);
//     } else {
//         cb('Images only! (jpg, jpeg, png)');
//     }
// }

// const upload = multer({
//     storage,
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     },
// });


// router.post('/', upload.single('image'), (req, res) => {
//     if (!req.file) {
//         res.status(400).send({ message: 'No file uploaded' });
//         return;
//     }

//     res.send({
//         message: 'File uploaded successfully',
//         image: `/uploads/${req.file.filename}`, // save this path in DB
//     });
// });

// export default router;


import path from 'path';
import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../frontend/public/uploads/')); // ✅ correct relative path
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).send({ message: 'No file uploaded' });
    return;
  }

  res.send({
    message: 'File uploaded successfully',
    image: `/uploads/${req.file.filename}`, // path to save in DB
  });
});

export default router;
