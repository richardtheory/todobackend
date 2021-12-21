import Mongoose from "mongoose";

const { Schema, model } = Mongoose;

const todoSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required:false
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
});
const TodoModel = model("Todo", todoSchema);
export default TodoModel;
