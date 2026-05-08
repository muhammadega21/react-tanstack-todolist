import express from "express";
import { TodoController } from "../todo/todo.controller.js";
import {
  createTodoSchema,
  idParamSchema,
  updateTodoSchema,
} from "../todo/todo.validator.js";
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { validateParams } from "../../middlewares/validateParams.middleware.js";

const router = express.Router();

router.get("/", TodoController.getAll);
router.get("/:id", validateParams(idParamSchema), TodoController.getById);
router.post("/", validateRequest(createTodoSchema), TodoController.create);
router.patch(
  "/:id",
  validateParams(idParamSchema),
  validateRequest(updateTodoSchema),
  TodoController.update,
);
router.delete("/:id", validateParams(idParamSchema), TodoController.delete);

export default router;
