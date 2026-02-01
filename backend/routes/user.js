const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../modal/user.model.js");
const { Friends } = require("../modal/friends.model.js");
const cloudinary = require("../cloudinary.js");
const upload  = require("../middleware/multer.js");
const { Authorization } = require("../middleware/Authorization.js");


route.post("/uploadprofile",upload.single("profile"),Authorization,async (req,res)=>{
    try {
        console.log(req.file)
        const result = await cloudinary.v2.uploader.upload_stream(
            req.file.path,
            {folder:"public/"},
        )

        const data = User.updateOne({_id:req.userId},{Dp:result.secure_url});
        res.status(200).json({url:result.secure_url,message:"Image updated"})
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
});

route.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let data = await User.findOne({ email: email })
        if (data) {
            if (!await bcrypt.compare(password, data.password)) {
                res.status(400).json({ message: "incorrect password" })
                return
            }
            if (name !== data.name) {
                return res.status(400).json({ message: "Username mismatch " })
            }
            const token = jwt.sign({ id: data._id }, process.env.TOKEN_KEY);
            res.status(200).json({ name: name, token: token, id: data._id });
            return;
        }
        data = await User.findOne({name:name})
        if(data) return res.status(400).json({ message: "Username already exists please choose another" })
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        data = await User.create({ name: name, password: hashedPass, email: email });
        const create = await Friends.create({userId:data._id})
        const token = jwt.sign({ id: data._id }, process.env.TOKEN_KEY)
        res.status(200).json({ id: data._id, name: name, token: token })

    } catch (error) {
        res.status(500).json({ message: "server Exception" + error.toString() })
    }
})


route.get("/:username", async (req, res) => {
    try {
        const {username}=req.params;
        const data = await User.find({ name: { $regex:username, $options: "i" } },
    { _id: 1, name: 1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "server Exception" })
    }
})


module.exports = route