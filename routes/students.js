const router = require("express").Router();
let student = require("../models/student");

router.route("/add").post((req,res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const address = req.body.address;
    const age = Number(req.body.age);
    const contactNumber = Number(req.body.contactNumber);
    const gender = req.body.gender;

    const newStd = new student({
        fName,
        lName,
        address,
        age,
        contactNumber,
        gender
    })

    newStd.save().then(()=>{
        res.json("Student Added Successfull")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    student.find().then((students)=>{
        res.json(students);
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req,res)=>{
    let userId = req.param.id;
    const {fName,lName,address,age,contactNumber,gender} = req.body;

    const updateStudent = {
        fName,
        lName,
        address,
        age,
        contactNumber,
        gender
    }

    const update = await student.findByIdAndUpdate(userId,updateStudent).then(()=>{
        res.status(200).send({status: "User Updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data"}); 
    })    
})

router.route("/delete/:id").delete(async (req,res)  =>{
    let userId = req.params.id;
    
    await student.findByIdAndDelete(userId).then(()=> {
        res.status(200).send({status: "Deleted Successfully"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error With Delete User", error: err.message});
    })
})

router.route("/get/:id").get(async (req,res) =>{
    let userId = req.params.id;

    const user = await student.findById(userId).then((student) => {
        res.status(200).send({status: "User Fetched", student})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error With Get User", error: err.message});
    })
})
module.exports = router;