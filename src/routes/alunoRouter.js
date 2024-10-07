import { Router } from "express";
import AlunosController from "../controllers/AlunosController.js";

const router = Router();

router.post("/cadastros", AlunosController.cadastrarAluno);
router.get("/cadastros", AlunosController.listarAluno);
router.get("/cadastros/:id", AlunosController.listarAluno);
router.post("/cadastros/:id/media", AlunosController.calcularMedia);
router.delete("/cadastros/:id", AlunosController.deletarAluno);
router.put("/cadastros/:id", AlunosController.atualizarDadosAluno)

export default router