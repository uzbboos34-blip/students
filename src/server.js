import express from "express";
import {studentRouter, teacherRouter} from "./routers/index.js";

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.use(studentRouter)
app.use(teacherRouter)

app.listen(PORT, () => console.log("Server is running..."))
