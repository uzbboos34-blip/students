import { read, write } from "../JSON/file.system.js";
const GET = (req, res) => {
    try {
        const teachers = read("teachers")
        res.status(200).send(teachers)
    } catch (error) {
        console.log(error);
        
    }
}
const POST = (req, res) => {
    try {
        let teachers = read("teachers")
        const { fullname, age, email, phone, password } = req.body
        const teacher = teachers.find(s => s.email === email)

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
        if (teacher) {
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
        

        const newteacher = {
            id: teachers.length ? teachers[teachers.length -1].id + 1:1,
            fullname,
            age,
            email, 
            phone, 
            password
        }
        teachers.push(newteacher)
        write("teachers", teachers)
        res.status(201).json(newteacher);

    } catch (error) {
        console.log(error);
        
    }
}

const PUT = (req, res) => {
    try {
        const teachers = read("teachers")
        const {id} = req.params
        const {fullname, age, email, phone, password} = req.body
        const teacher = teachers.find(s => s.id === Number(id) || s.email === email)

        if (!teacher) {
            return res.status(404).json({ message: "ID not found" });
        }
        if (email) {
            const existingTeacher = teachers.find(t => t.email === email && t.id !== Number(id));
            if (existingTeacher) {
            return res.status(400).json({ message: "This email is already registered" });
        }
        }
        if (!email.endsWith("@gmail.com")) {
            return res.status(400).json({ message: "Email must end with @gmail.com" });
        }
        if (String(password).length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }
        if (!/^\+998\d{9}$/.test(phone)) {
            return res.status(400).json({message: "Phone number must be in format +998XXXXXXXXX"});
        }
        
        fullname ? teacher.fullname = fullname : teacher.fullname;
        age ? teacher.age = age : teacher.age;
        email ? teacher.email = email : teacher.email;
        phone ? teacher.phone = phone : teacher.phone;
        password ? teacher.password = password : teacher.password

        write("teachers", teachers)
        res.status(201).send({message: "teachers updated successfully"});

    } catch (error) {
        console.log(error);
        
    }
}
const DELETE = (req, res) => {
    try {
        let teachers = read("teachers")
        const {id} = req.params
        const teacher = teachers.find(s => s.id === Number(id))

        if (!teacher) {
            return res.status(404).json({ message: "ID not found" });
        }

        teachers = teachers.filter(s => s.id !== Number(id))
        write("teachers", teachers)
        res.status(201).send({message: "teachers DELETE successfully"});
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