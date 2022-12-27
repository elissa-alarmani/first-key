import CollegeApp from "../models/CollegeApp.js";
import User from "../models/User.js";

/* CREATE */
export const createCollegeApp = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newCollegeApp = new CollegeApp({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newCollegeApp.save();

    const collegeApp = await CollegeApp.find();
    res.status(201).json(collegeApp);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedCollegeApps = async (req, res) => {
  try {
    const collegeApp = await CollegeApp.find();
    res.status(200).json(collegeApp);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserCollegeApps = async (req, res) => {
  try {
    const { userId } = req.params;
    const collegeApp = await CollegeApp.find({ userId });
    res.status(200).json(collegeApp);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likeCollegeApp = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const collegeApp = await CollegeApp.findById(id);
    const isLiked = collegeApp.likes.get(userId);

    if (isLiked) {
      collegeApp.likes.delete(userId);
    } else {
      collegeApp.likes.set(userId, true);
    }

    const updatedCollegeApp = await CollegeApp.findByIdAndUpdate(
      id,
      { likes: collegeApp.likes },
      { new: true }
    );

    res.status(200).json(updatedCollegeApp);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};