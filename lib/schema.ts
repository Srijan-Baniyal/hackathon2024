import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    projectId: {
      type: String,
      required: true,
      unique: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    teamLeader: {
      type: String,
      required: true,
    },
    teamMembers: {
      type: [String], 
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

projectSchema.index({ id: 1 }, { unique: true, sparse: true });
projectSchema.pre("save", async function (next) {
  const Project = mongoose.model("Project", projectSchema);
  const count = await Project.countDocuments();
  if (count >= 1) {
    const err = new Error(
      "There can only be one project document in the collection."
    );
    next(err);
  } else {
    next();
  }
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
