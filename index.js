import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import TodoModel from "./TodoSchema/todoschema.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const port = 9000;
const url = process.env.DB_URL;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    /// If database is connected sucessfully
    console.log("Database connected sucessfully............");
  })
  .catch((error) => {
    //if an erro occurs
    console.log(error);
  });
app.get("/", (req, res) => {
  res.send("Welcome to AB Todo API");
});
app.get("/getAllTodos", async (req, res) => {
  const todo = await TodoModel.find({});

  if (todo) {
    return res.status(200).json({
      message: "Fetch all todos from database",
      data: todo,
    });
  } else {
    return res.status(400).json({
      message: "Failed to fetch todos from database",
    });
  }
});

///create a new Todo into database
app.post("/createtodo", async (req, res) => {
  const { title, description, isCompleted } = req.body;
  const createTodo = await TodoModel.create({
    title,
    description,
    isCompleted,
  });

  if (createTodo) {
    return res.status(200).json({
      message: "Todo created successfuly",
      data: createTodo,
    });
  } else {
    return res.status(204).json({
      message: "Failed to create todo",
    });
  }
});

app.patch("/updatedtodo/:id", async (req, res) => {
  const { id } = req.params;
  const { isCompleted,title } = req.body;
  const updateTodo = await TodoModel.updateOne({
    isCompleted: isCompleted
  }).where({ _id: id });

  if (updateTodo) {
    return res.status(200).json({
      message: "Todo updated successfully",
      data: updateTodo,
    });
  } else {
    return res.status(400).json({
      message: "Failed to update Todo",
    });
  }
});
///Delete to from Database
app.delete("/delete/:id",async(req,res)=>{
  const {id}=req.params;
  const deleteTodo=await TodoModel.findByIdAndDelete({_id:id})
  if(deleteTodo){
    return res.status(200).json({
      message:"Todo deleted successflly..."
    })
  }else{
    return res.status(400).json({
      message:"failed to delete Todo"
    })
  }
})


app.listen(port,()=>{
  console.log("Todo server running at${port}")
})
