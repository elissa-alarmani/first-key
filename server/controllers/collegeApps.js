import CollegeApp from "../models/CollegeApp.js";
import User from "../models/User.js";

/* CREATE */
export const createCollegeApp = async (req, res) => {
  try {
    const { userId, college, appStatus } = req.body;
    const user = await User.findById(userId);
    const newCollegeApp = new CollegeApp({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      college,
      appStatus,
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

export const getUserCollegeApp = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const collegeApp = await CollegeApp.findById(id);
    if (!collegeApp || collegeApp.userId !== userId) {
      return res.status(404).json({ message: "College application not found." });
    }
    res.status(200).json(collegeApp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const deleteUserCollegeApp = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const collegeApp = await CollegeApp.findById(id);
    if (!collegeApp || collegeApp.userId !== userId) {
      return res.status(404).json({ message: "College application not found." });
    }
    await CollegeApp.deleteOne({ _id: id });
    res.status(200).json({ message: "College application deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};