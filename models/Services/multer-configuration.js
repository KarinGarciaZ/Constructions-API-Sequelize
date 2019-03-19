const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './storage/services/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname );
  }
});

const fileFilter = (req, file, cb) => {
  if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' )
    cb(null, true);
  else
    cb(null, false);
}

const upload = multer({storage, fileFilter}).single('image')

module.exports = upload;