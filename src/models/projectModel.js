const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	title: { type: String, required: true },
	introductoryDescription: { type: String, maxlength: 80, required: true},
	completeDescription: { type: String, maxlength: 1000, required: true},
	keywords: { type: [String], maxlength: 10, required: true},
	thumbnailImage: { type: String, required: true }, 
	illustrationImages: { type: [String], maxlength: 5, required: true }, 
  });
const Project = mongoose.model('Projects', ProjectSchema);

module.exports = Project;