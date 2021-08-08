const {extend} = require("lodash");
const { User } = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.json({ success: true, users })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get users", errorMessage: err.message })
    }

  }

  exports.createNewUser = async (req, res) => {
    try {
      const user = req.body;
      const NewUser = new User(user);
      const savedUser = await NewUser.save();
      res.json({ success: true, data: savedUser })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add user", errorMessage: err.message })
    }
  }

  exports.loginUser = async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email: email, password: password});
      if(!user){
        return res.status(200).json({ success: false, message: "Ivalid email/password"});
      }else {
        res.status(200).json({ success: true, data: user})
      }

    }catch(err){
      res.status(400).json({success: false, message: "could not retrieve user information ", errorMessage: err.message})
    }
  }

  