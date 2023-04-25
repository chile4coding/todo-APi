import { Request, Response } from "express";
import prisma from "../prismaClientSetup";
import { text } from "body-parser";

interface RequestBody {
  text: string;
  email: string;
  title: string;
  name: string;
  id: number;
}
// create a user
export async function createUser(req: Request, res: Response) {
  const body: RequestBody = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
    return res.status(201).json({
      message: "User Created!",
      user: user,
    });
  } catch (error) {
    console.log("Error connecting to database!");
  }
}

// get all todos
export async function getAllTodos(req: Request, res: Response) {
  try {
    const allTodos = await prisma.todo.findMany();
    return res.status(200).json({
      message: "Todos fetched",
      todos: allTodos,
    });
  } catch (error) {
    console.log("Error occurred!");
  }
}

// create a todo
export async function createATodo(req: Request, res: Response) {
  const body: RequestBody = req.body;

  try {
    const todo = await prisma.todo.create({
      data: {
        title: body.title,
        text: body.text,
        userEmail: body.email,
      },
    });
    return res.status(201).json({
      message: "todo created",
      todo: todo,
    });
  } catch (error) {
    console.log("Error occurred");
  }
}

// get a specific user todo
export async function getSpecificUserTodos(req: Request, res: Response) {
  const authEmail = req.get("Authorization");
  const email = authEmail?.split(" ")[1];
  try {
    const userTodo = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        todos: true,
      },
    });
    return res.status(201).json({
      message: "User found",
      userTodo: userTodo,
    });
  } catch (error) {
    console.log("Error occurred while accessing database")
  }
}

// delete a specific todo
export async function deleteSpecificTodo(req: Request, res: Response)  {
  const body: RequestBody = req.body;
  try {
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: body.id,
      },
    });
    return res.status(200).json({
      message: `Todo  deleted`,
    });
  } catch (error) {
    console.log("Error occurred while deleting todo");
  }
};

// delete a user all todo
export async function deleteUserAllTodos (req: Request, res: Response){
  const body: RequestBody = req.body;
  try {
    const deleteTodo = await prisma.todo.deleteMany({
      where: {
        userEmail: body.email
      },
    });
    return res.status(200).json({
      message: `Todo deleted`,
    });
  } catch (error) {
    console.log("Error occurred while deleting todo");
  }
};

// delete all todo
export async function deleteAllTodos(req: Request, res: Response){
  const body: RequestBody = req.body;
  try {
    const deleteTodo = await prisma.todo.deleteMany();
    return res.status(200).json({
      message: `Todos cleared `,
    });
  } catch (error) {
    console.log("Error occurred while deleting todo");
  }
};

// update a specific todo
export async function updateATodo(req: Request, res: Response) {
  const body: RequestBody = req.body;
  try {
    const prevTodo = await prisma.todo.findUnique({
      where: {
        id: body.id,
      },
    });

    const updatedTodo = await prisma.todo.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title ? body.title : prevTodo?.title,
        text: body.text ? body.text : prevTodo?.text,
      },
    });
    return res.status(201).json({
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.log("Error occurred while updating todo");
  }
}
