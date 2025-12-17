import express from "express";
import studentCotrollar from "../controllars/students.js";
const router = express.Router()

router
    .get("/students", studentCotrollar.GET)
    .post("/students", studentCotrollar.POST)
    .put("/students/:id", studentCotrollar.PUT)
    .delete("/students/:id", studentCotrollar.DELETE);

export default router    