import { Router } from "express";

import { CidadesController } from './../controllers/cidades'

const router = Router();

router.get("/", (_, response) => {
  return response.send("Olá, DEV!");
});

router.post("/cidades", CidadesController.create)


export { router };
