const express = require("express")
const { read_file } = require("./fs/file_manager")
const { write_file } = require("./fs/file_manager")
const dotenv = require("dotenv").config()
const cors = require("cors")
const uuid = require("uuid")

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

app.get("/get_all_products", (req, res)=>{
    const products = read_file("product.json")
    res.status(200).json(products)
})


//post
app.post("/add_product", (req, res)=> {
    const {title, quantity} = req.body
   const  products = read_file("product.json")
   products.push({
    id: uuid.v4(),
    title,
    quantity
   })

   write_file("product.json", products)
   
   res.status(201).json({
    message: "Added new product"
   })
})


// get one
app.get("/get_one_product/:id", (req, res)=> {
  const { id } = req.params

    const products = read_file("product.json")
    const foundedProduct = products.find((item) => item.id ===id)

    if(!foundedProduct){
        return res.status(404).json({
            message: "Product not found"
        })
    }

    res.status(200).json(foundedProduct)

})

// patch. update
app.patch("/update_product/:id", (req, res) => {
  const { id } = req.params;
  const { title, quantity } = req.body;

  const products = read_file("product.json");

  const foundedProduct = products.find((item) => item.id == id);

  if (!foundedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products.forEach((item) => {
    if (item.id == id) {
      item.title = title ? title : item.title;
      item.quantity = quantity ? quantity : item.quantity;
    }
  });

  write_file("product.json", products);

  res.status(200).json({
    message: "Updated",
  });
});
//

// delete
app.delete("/delete_product/:id", (req, res) => {
  const { id } = req.params;

  const products = read_file("product.json");

  const foundedProduct = products.find((item) => item.id == id);

  if (!foundedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products.forEach((item, idx) => {
    if (item.id == id) {
      products.splice(idx, 1);
    }
  });

  write_file("product.json", products);

  res.status(200).json({
    message: "Deleted",
  });
});


//keyingi qatorlarda mashina un crud
// --- CAR CRUD AMALLARI ---

// 1. Barcha mashinalarni olish (GET ALL)
app.get("/get_all_cars", (req, res) => {
  const cars = read_file("car.json"); 
  res.status(200).json(cars);
});

// 2. Yangi mashina qo'shish (POST)
app.post("/add_car", (req, res) => {
  const { model, year } = req.body;
  const cars = read_file("car.json");

  cars.push({
    id: uuid.v4(),
    model,
    year
  });

  write_file("car.json", cars);

  res.status(201).json({
    message: "Yangi mashina qo'shildi"
  });
});

// 3. Bittasini id bo'yicha olish (GET ONE)
app.get("/get_one_car/:id", (req, res) => {
  const { id } = req.params;
  const cars = read_file("car.json");
  const foundedCar = cars.find((item) => item.id == id);

  if (!foundedCar) {
    return res.status(404).json({ message: "Mashina topilmadi" });
  }

  res.status(200).json(foundedCar);
});

// 4. Mashina ma'lumotlarini yangilash (PATCH)
app.patch("/update_car/:id", (req, res) => {
  const { id } = req.params;
  const { model, year } = req.body;
  const cars = read_file("car.json");

  const foundedCar = cars.find((item) => item.id == id);

  if (!foundedCar) {
    return res.status(404).json({ message: "Mashina topilmadi" });
  }

  cars.forEach((item) => {
    if (item.id == id) {
      item.model = model ? model : item.model;
      item.year = year ? year : item.year;
    }
  });

  write_file("car.json", cars);

  res.status(200).json({ message: "Mashina ma'lumotlari yangilandi" });
});

// 5. Mashinani o'chirish (DELETE)
app.delete("/delete_car/:id", (req, res) => {
  const { id } = req.params;
  const cars = read_file("car.json");

  const foundedCarIndex = cars.findIndex((item) => item.id == id);

  if (foundedCarIndex === -1) {
    return res.status(404).json({ message: "Mashina topilmadi" });
  }

  cars.splice(foundedCarIndex, 1);
  write_file("car.json", cars);

  res.status(200).json({ message: "Mashina o'chirildi" });
});


//students un crud

// --- STUDENT CRUD AMALLARI ---

// 1. Barcha talabalarni olish (GET ALL)
app.get("/get_all_students", (req, res) => {
  const students = read_file("students.json");
  res.status(200).json(students);
});

// 2. Yangi talaba qo'shish (POST)
app.post("/add_student", (req, res) => {
  const { full_name, group } = req.body;
  const students = read_file("students.json");

  students.push({
    id: uuid.v4(),
    full_name,
    group
  });

  write_file("students.json", students);

  res.status(201).json({
    message: "Yangi talaba muvaffaqiyatli qo'shildi"
  });
});

// 3. Bittasini id bo'yicha olish (GET ONE)
app.get("/get_one_student/:id", (req, res) => {
  const { id } = req.params;
  const students = read_file("students.json");
  const foundedStudent = students.find((item) => item.id == id);

  if (!foundedStudent) {
    return res.status(404).json({ message: "Talaba topilmadi" });
  }

  res.status(200).json(foundedStudent);
});

// 4. Talaba ma'lumotlarini yangilash (PATCH)
app.patch("/update_student/:id", (req, res) => {
  const { id } = req.params;
  const { full_name, group } = req.body;
  const students = read_file("students.json");

  const foundedStudent = students.find((item) => item.id == id);

  if (!foundedStudent) {
    return res.status(404).json({ message: "Talaba topilmadi" });
  }

  students.forEach((item) => {
    if (item.id == id) {
      item.full_name = full_name ? full_name : item.full_name;
      item.group = group ? group : item.group;
    }
  });

  write_file("students.json", students);

  res.status(200).json({ message: "Talaba ma'lumotlari yangilandi" });
});

// 5. Talabani o'chirish (DELETE)
app.delete("/delete_student/:id", (req, res) => {
  const { id } = req.params;
  const students = read_file("students.json");

  const foundedStudentIndex = students.findIndex((item) => item.id == id);

  if (foundedStudentIndex === -1) {
    return res.status(404).json({ message: "Talaba topilmadi" });
  }

  students.splice(foundedStudentIndex, 1);
  write_file("students.json", students);

  res.status(200).json({ message: "Talaba o'chirildi" });
});

app.listen(PORT, ()=> {
    console.log("Server is running at: ", PORT)
})