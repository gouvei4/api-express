import { Router } from "express";
import { StatusCodes } from 'http-status-codes'

const router = Router();

router.get("/", (_, response) => {
  return response.send("Olá, DEV!");
});

router.post("/teste", (request, response) => {
  console.log(request.params)

  return response.status(StatusCodes.UNAUTHORIZED).json(request.body);
});

export { router };
