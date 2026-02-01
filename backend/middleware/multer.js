const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/")
    }
}
);
const upload = multer({ storage });  

module.exports= upload