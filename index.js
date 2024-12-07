import express from "express";
import { connectDB } from "./DB/connectDB.js";
import { TopicModel } from "./DB/TopicModel.js";
import cors from "cors";
import dotenv from "dotenv"

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/topics", async (req, res) => {
  await connectDB();
  let topics = await TopicModel.find();
  res.status(200).send({ result: topics });
});

app.post("/addTopic", async (req, res) => {
  await connectDB();

  let data = req.body;

  const topics = await TopicModel.create(data);
  if (topics) {
    res.status(200).send({ result: topics });
  } else {
    res.send({ result: "Data Not Fount" });
  }
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  await connectDB();
  const topic = await TopicModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  console.log("put Data", topic);
  res.status(200).send(topic);
});

app.get("/topics/:id", async (req, res) => {
  const id = req.params.id;
  await connectDB();
  const topic = await TopicModel.findOne({ _id: id });
  console.log("Get Single Data", topic);
  res.status(200).send(topic);
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await connectDB();
  const topic = await TopicModel.findByIdAndDelete({ _id: id });
  if (topic) {
    res
      .status(200)
      .send({ message: "Data Deleted Successfully", result: topic });
  } else {
    res.status(500).send({ message: "Data Not Deleted" });
  }
});

const PORT = 4000

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});
