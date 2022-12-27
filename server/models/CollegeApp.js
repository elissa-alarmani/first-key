import mongoose from "mongoose";

const collegeAppSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

const CollegeApp = mongoose.model("CollegeApp", collegeAppSchema);

export default CollegeApp;