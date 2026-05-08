import { NextFunction, Request, Response } from "express";
import { TodoService } from "./todo.service";
import { sendSuccess } from "../../lib/response";

export const TodoController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;

      const parsedLimit = Number(req.query.limit);
      const limit = Number.isNaN(parsedLimit) ? 5 : parsedLimit;

      const search = req.query.search as string | undefined;

      let completed: boolean | undefined;

      if (req.query.completed !== undefined) {
        completed = req.query.completed === "true";
      }

      const { data, meta } = await TodoService.findAll({
        page,
        limit,
        search,
        completed,
      });

      sendSuccess(res, "Success get all todos", data, 200, meta);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const todo = await TodoService.findById(id);
      sendSuccess(res, "Success get todo", todo);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await TodoService.createTodo(req.body);
      sendSuccess(res, "Success create todo", todo);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const todo = await TodoService.updateTodo(id, req.body);
      sendSuccess(res, "Success update todo", todo);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const todo = await TodoService.deleteTodo(id);
      sendSuccess(res, "Success delete todo", todo);
    } catch (err) {
      next(err);
    }
  },
};
