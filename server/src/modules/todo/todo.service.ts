import { prisma } from "../../lib/prisma.js";
import { createError } from "../../middlewares/errorHandler.middleware.js";
import { CreateTodoInput, UpdateTodoInput } from "./todo.validator.js";

export const TodoService = {
  async findAll(query: {
    page: number;
    limit: number;
    search?: string;
    completed?: boolean;
  }) {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Jika menggunakan mongodb,postgrsql, dll

    // if (query.search) {
    //   where.title = { contains: query.search, mode: "insensitive" };
    // }

    // Jika menggunakan sqlite
    if (query.search) {
      where.title = {
        contains: query.search,
      };
    }

    if (query.completed !== undefined) {
      where.completed = query.completed;
    }

    const [data, total] = await Promise.all([
      prisma.todo.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.todo.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async findById(id: number) {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) throw createError("Todo not found", 404);
    return todo;
  },

  async createTodo(data: CreateTodoInput) {
    const todo = await prisma.todo.create({
      data,
    });

    return todo;
  },

  async updateTodo(id: number, data: UpdateTodoInput) {
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) throw createError("Todo not found", 404);

    const todo = await prisma.todo.update({
      where: { id },
      data,
    });

    return todo;
  },

  async deleteTodo(id: number) {
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) throw createError("Todo not found", 404);

    const todo = await prisma.todo.delete({
      where: { id },
    });

    return todo;
  },
};
