const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const FILE_PATH = './students.json';


app.use(express.json());

// 1. READ: Barcha talabalarni ko'rish
app.get('/students', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Faylni o'qishda xatolik" });
        res.json(JSON.parse(data));
    });
});

// 2. CREATE: Yangi talaba qo'shish
app.post('/students', (req, res) => {
    const newStudent = req.body;
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        const students = JSON.parse(data);
        students.push(newStudent);
        fs.writeFile(FILE_PATH, JSON.stringify(students, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Saqlashda xatolik" });
            res.status(201).json({ message: "Talaba qo'shildi", student: newStudent });
        });
    });
});

// 3. UPDATE: Talaba ma'lumotlarini o'zgartirish
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        let students = JSON.parse(data);
        const index = students.findIndex(s => s.id === id);
        
        if (index === -1) return res.status(404).json({ error: "Talaba topilmadi" });
        
        students[index] = { ...students[index], ...req.body };
        fs.writeFile(FILE_PATH, JSON.stringify(students, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Saqlashda xatolik" });
            res.json({ message: "Talaba yangilandi", student: students[index] });
        });
    });
});

// 4. DELETE: Talabani o'chirish
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        let students = JSON.parse(data);
        const filtered = students.filter(s => s.id !== id);
        
        fs.writeFile(FILE_PATH, JSON.stringify(filtered, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "O'chirishda xatolik" });
            res.json({ message: "Talaba o'chirildi" });
        });
    });
});

app.listen(port, () => {
    console.log(`Server http://localhost:${port} da ishga tushdi`);
});