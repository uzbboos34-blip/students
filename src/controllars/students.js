import { read, write } from "../JSON/file.system.js";
const GET = (req, res) => {
    try {
        const students = read("students")
        res.status(200).send(students)
    } catch (error) {
        console.log(error);
        
    }
}
const POST = (req, res) => {
    try {
        let students = read("students")
        const { fullname, age, email, phone, password } = req.body
        const student = students.find(s => s.email === email)

        if (!fullname) {
            return res.status(400).json({ message: "Fullname is required" });
        }
        if (!age) {
            return res.status(400).json({ message: "Age is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!email.endsWith("@gmail.com")) {
            return res.status(400).json({ message: "Email must end with @gmail.com" });
        }
        if (student) {
            return res.status(400).json({ message: "This email is already registered" });
        }
        if (!phone) {
            return res.status(400).json({ message: "Phone is required" });
        }
        if (!/^\+998\d{9}$/.test(phone)) {
            return res.status(400).json({message: "Phone number must be in format +998XXXXXXXXX"});
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        if (String(password).length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }
        

        const newStudent = {
            id: students.length ? students[students.length -1].id + 1:1,
            fullname,
            age,
            email, 
            phone, 
            password
        }
        students.push(newStudent)
        write("students", students)
        res.status(201).json(newStudent);

    } catch (error) {
        console.log(error);
        
    }
}

const PUT = (req, res) => {
    try {
        const students = read("students")
        const {id} = req.params
        const {fullname, age, email, phone, password} = req.body
        const student = students.find(s => s.id === Number(id))

        if (!student) {
            return res.status(404).json({ message: "ID not found" });
        }
        if (email) {
            const existingStudent = students.find(s => s.email === email && s.id !== Number(id));
            if (existingStudent) {
            return res.status(400).json({ message: "This email is already registered" });
        }
        }
        if (String(password).length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }
        if (!email.endsWith("@gmail.com")) {
            return res.status(400).json({ message: "Email must end with @gmail.com" });
        }
        if (!/^\+998\d{9}$/.test(phone)) {
            return res.status(400).json({message: "Phone number must be in format +998XXXXXXXXX"});
        }
        
        fullname ? student.fullname = fullname : student.fullname;
        age ? student.age = age : student.age;
        email ? student.email = email : student.email;
        phone ? student.phone = phone : student.phone;
        password ? student.password = password : student.password

        write("students", students)
        res.status(201).send({message: "Students updated successfully"});

    } catch (error) {
        console.log(error);
        
    }
}
const DELETE = (req, res) => {
    try {
        let students = read("students")
        const {id} = req.params
        const student = students.find(s => s.id === Number(id))

        if (!student) {
            return res.status(404).json({ message: "ID not found" });
        }

        students = students.filter(s => s.id !== Number(id))
        write("students", students)
        res.status(201).send({message: "Students DELETE successfully"});
    } catch (error) {
        console.log(error);
        
    }
}
export default {
    GET,
    POST,
    PUT,
    DELETE
}