// Require mongoose
var mongoose = require("mongoose");

// Create Schem
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
   body: {
      type: String
   },
   article: {
      type: Schema.Types.ObjectId,
      ref: "Article"
   }
});

var Note = mongoose.model("Note", NoteSchema);

// Export note.js
module.exports = Note;