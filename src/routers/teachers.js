import express from "express";
import teacherCotrollar from "../controllars/teachers.js";
const router = express.Router()

router
    .get("/teachers", teacherCotrollar.GET)
    .post("/teachers", teacherCotrollar.POST)
    .put("/teachers/:id", teacherCotrollar.PUT)
    .delete("/teachers/:id", teacherCotrollar.DELETE);

export default router    