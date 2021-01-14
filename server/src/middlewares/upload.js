const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const originalnameArr = file.originalname.split('.');
    const ext = originalnameArr[originalnameArr.length - 1];
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

module.exports = multer({ storage });
