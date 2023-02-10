const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// localhost ou 127.0.0.1
//const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL = "mongodb+srv://admin:hErRDZUSVfbnGIQa@cluster0.haiofid.mongodb.net";
const DB_NAME = "ocean-bancodados-09022023";


async function main() {






// Conexão com o banco de dados
console.log("Conectando com o banco de dados...")
const client = await MongoClient.connect(DB_URL);
const db = client.db(DB_NAME);

const collection = db.collection("itens");
console.log("Banco de dados conectado com sucesso!")




const app = express();



app.get("/", function (req, res) {
  res.send("Hello World!");
});

// O que vier no body da requisição, está em JSON
app.use(express.json());

// Endpoint /oi -> 
app.get("/oi", function (req, res) {
  res.send("Olá mundo, hoje esta um dia nublado");
});

// Lista de informações
const itens = 
[
"Rick Sanches"
,"Morty Smith"
,"Summer Smith"
]

// CRUD -> Lista de informações


// Endpoint Read All -> [GET] /item
app.get("/item", async function (req, res) {
  const documentos = await collection.find().toArray();
  res.send(documentos);
});










// Endpoint Read Single by ID -> [GET] /item/:id
app.get("/item/:id", async function (req, res) {
  const id = req.params.id;
  //const item = itens[id-1];
  const item = await collection.findOne({ _id: new ObjectId (id) });


  //res.send("Read by ID funfando");
  res.send(item);
});










/*
// Endpoint create -> [POST] /item
app.post("/item/", function (req, res) {
  //console.log(req.body);
  //res.send("create funfando");
  const item = req.body;
  itens.push(item.nome);
  res.send("Item criado com sucesso!");
  //res.send(item);
});
*/

  // Endpoint Create -> [POST] /item
  app.post("/item", async function (req, res) {
    // console.log(req.body);
    const item = req.body;
    await collection.insertOne(item);
    res.send(item);
  });




// Endpoint Update -> [PUT] /item/:id
app.put("/item/:id", async function (req, res) {
  const id = req.params.id;
  const body = req.body;

  //console.log(id, body);

  await collection.updateOne(
    { _id: new ObjectId(id)},
    {$set: body}
  );

  //res.send("Deu bom!");
  res.send(body);
});

  // Endpoint Delete -> [DELETE] /item/:id
  // Exercício:
  // - pesquisar sobre a operação de remover itens
  // - implementar o endpoint de delete
  // - realizar a operação de excluir item



app.listen(3006);
};

main();