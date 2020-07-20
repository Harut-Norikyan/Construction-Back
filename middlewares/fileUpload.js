const multer = require("multer");
const path = require("path");
// SET STORAGE
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now());
    }
});
const upload = multer({storage: storage}).array("arr[]",20);

module.exports = upload;




