const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordCountValidator = (maxWords) => {
  return function (value) {
    const wordCount = value.trim().split(/\s+/).length;
    return wordCount <= maxWords;
  };
};

const ProjectSchema = new Schema({
  title: { type: String, required: true, unique: true },
  introductoryDescription: { type: String, maxlength: 80, required: true },
  completeDescription: {
    type: String,
    validate: wordCountValidator(250),
    required: true,
  },
  keywords: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length <= 10;
      },
      message: "Maximum 10 mots-clés autorisés",
    },
    required: true,
  },
  thumbnailImage: { type: String, required: true },
  illustrationImages: {
    type: [String],
    validate: {
      validator: function (val) {
        return 1 <= val.length <= 5;
      },
      message: "Entre 1 et 5 images d'illustrations",
    },
    required: true,
  },
});
const Project = mongoose.model("Projects", ProjectSchema);

module.exports = Project;
