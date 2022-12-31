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
    college: {
      type: String,
      default: "",
    },
    appStatus: {
      type: String,
       default: "",
    }
  },
  { timestamps: true }
);

const CollegeApp = mongoose.model("CollegeApp", collegeAppSchema);

export default CollegeApp;
