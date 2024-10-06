const express = require("express");
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const { PublicationModel } = require("../models/publication");
const {DataService} = require('../services/interacrionData');


const app = express.Router();
app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '../../../storage');
    },
    filename: (req, file, cb) => {
        const name = `${Date.now()}-${file.originalname}`;
        cb(null, name);
        req.body.pathP = name;
    },
  });
  
  const upload = multer({ storage });


app.get('/publications', async (req, res) => {
    try {
        const dataService = new DataService;
        const result = await dataService.get();
        console.log(result);
        res.status(200).json(result).end();
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e).end();
    }
});
app.get('/publications/:id', async(req, res) => {
    try {
        const dataService = new DataService;
        const result = await dataService.getById(req.params.id);

        res.status(200).json(result).end();
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e).end();
    }
})


app.get('/ozon/:track', async(req, res) => {
    try {
        const response = await axios.get(`https://tracking.ozon.ru/p-api/ozon-track-bff/tracking/${req.params.track}?source=Global`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://www.ozon.ru/',
                'Origin': 'https://www.ozon.ru',
                'Accept': 'application/json, text/plain, */*'
            }}
        );
        res.status(200).json(response).end();
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e).end();
    }
});

app.post('/create', upload.single('image'), async (req, res) => {
    try {
        const dataSave = new DataService;
        await dataSave.create({
            name:req.body.name,
            price:req.body.price,
            description: req.body.description,
            pathP: req.body.pathP
        });
        console.log(req.body);

        res.status(200).end();
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e).end();
    }
});

app.post('/delete/:id', async(req, res) => {
    try {
        const dataService = new DataService;

        dataService.delete(req.params.id);
        res.status(200).end();
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e).end();
    }
    
});


module.exports = app;