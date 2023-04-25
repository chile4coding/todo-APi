import express from "express";
import {
  createUser,
  createATodo,
  getSpecificUserTodos,
  getAllTodos,
  deleteSpecificTodo,
  deleteUserAllTodos,
  deleteAllTodos,
  updateATodo,
} from "../controllers/controllers";

const router = express.Router();
// create user

router.post("/signup", createUser);

// get all todos
router.get("/get-todos", getAllTodos);

// get a specific user todo
router.get("/get-user-todo", getSpecificUserTodos);

// create a todo
router.post("/add-todo", createATodo);

// delete a specific todo
router.delete("/delete-specific-todo", deleteSpecificTodo);

// delete all users todo
router.delete("/delete-a-user-all-todos", deleteUserAllTodos);

// delete all todos in the database
router.delete("/delete-all-todos", deleteAllTodos);

// update a specific todo
router.put("/update-a-todo", updateATodo);

export default router;
