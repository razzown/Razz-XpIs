require('../RazzDev');
const express = require('express');
const app = express();
const fs = require('fs');
const cron = require('node-cron');
const os = require("os");
const nodemon = require('nodemon');
const fsx = require("fs-extra");
const path = require("path");
const util = require("util");
const chalk = require("chalk");
const FormData = require("form-data");
const Jimp = require("jimp");
const { sizeFormatter } = require('human-readable')
const moment = require("moment-timezone");
const speed = require("performance-now");
const ms = require('parse-ms');
const axios = require("axios");
const fetch = require("node-fetch");
const cheerio = require('cheerio');
const { fetchJson, runtime, getBuffer, jsonformat } = require('../lib/myfunc');
const { exec, spawn, execSync } = require("child_process");
const { performance } = require("perf_hooks");
const xv1 = "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"
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: xv1 });

// asyncronus
async function OpnEai(text) {
  try {
    const { data } = await axios(`https://onlinegpt.org/wp-json/mwai-ui/v1/chats/submit`, {
      method: "post",
      data: {
        botId: "default",
        newMessage: text,
        stream: false
      },
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (err) {
    console.log(err.response.data)
    return err.response.data.message
  }
}
// end asyncronus 
// function starts
function hilangkanKataPertama(teks) {
 let kata = teks.split(" ");
 kata.shift();
 let teksBaru = kata.join(" ");
 return teksBaru;
}
function pickRandom(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
// end function 
const API_KEY = "Raz-Xfwjisxao93sjzn";
const texts = ["9618eaae-009b-4caf-9958-c68b72c4cfd7", "b4cace58-fbd0-434e-b437-53fa8a8b5aad", "b4ac6eb5-9a0a-4dc8-8c59-b4d9b58d9fd2", "20e8c45c-af24-42a6-91ba-ff49e144b9a5"];
const stabgenxx = pickRandom(texts);

exports.Diffusions = async (req, res) => {
const uuidmod = global.diffusi;
const models = req.query.models;
const apikey = req.query.apikey;
const inputs = req.query.input;
   if (!models || !uuidmod.hasOwnProperty(models)) {
   const prettyJSON = JSON.stringify(uuidmod, null, 3); 
  res.setHeader('Content-Type', 'application/json');
  res.send(prettyJSON);// Respons jika query tidak valid
  }
  if (!apikey || apikey !== API_KEY) {
    return res.status(403).json({ message: 'apikey Invalid' });
  }
  if (!inputs) {
    return res.status(400).json({ message: 'Input value is missing' });
  }
if (uuidmod.hasOwnProperty(models) && apikey === API_KEY && inputs) {
const textz = req.query.input  || 'girl cute face, kid, pink hairs, blue eyes, sexy kid';
const { Prodia } = require("prodia.js");
const prodia = new Prodia(stabgenxx);
async function stables(text) {
(async () => {
const generate = await prodia.generateImage({
prompt: text,
model: uuidmod[models],
negative_prompt: global.ndiff,
sampler: "DPM++ 2M Karras",
cfg_scale: 8.5,
steps: 35,
aspect_ratio: "portrait"
})
while (generate.status !== "succeeded" && generate.status !== "failed") {
new Promise((resolve) => setTimeout(resolve, 250));
const job = await prodia.getJob(generate.job);
if (job.status === "succeeded") {
res.json({ RazzUrL: job.imageUrl || "terjadi kesalahan" })
break;
}
}
})()
}
await stables(textz);
}
}

exports.CanvaD = async (req, res) => {
const user = req.query.user;
const canvafy = require("canvafy");
const rank = await new canvafy.Rank()
    .setAvatar('https://telegra.ph/file/0dcfdd3bff137953e0d97.jpg')
    .setBackground("image", "https://telegra.ph/file/eea5e6d86f388116a4441.jpg")
    .setUsername(user)
    .setBorder("#fff")
    .setStatus("RazzDev")
    .setLevel(2)
    .setRank(1)
    .setCurrentXp(100)
    .setRequiredXp(400)
    .build();
    res.send(rank);
}

exports.GeMini = async (req, res) => {
const apikey = req.query.apikey
const Input = req.query.input || "hallo, siapa kamu?"
const gemini = await fetchJson('https://hercai.onrender.com/gemini/hercai?question='+Input)
if (apikey === API_KEY && Input) {
res.json(gemini)
} else if (apikey !== API_KEY) { res.json({ error: "mana apikeyny cik"}) }
}

exports.OpenAi = async (req, res) => {
const apikey = req.query.apikey
const Inputs = req.query.input || "hallo, siapa kamu?"
if (apikey === API_KEY && Inputs) {
const hr1 = await OpnEai(Inputs);
res.json(hr1);
} else if (apikey !== API_KEY) { res.json({ error: "Invalid apikey"}) }
}

exports.YouAi = async (req, res) => {
const { apikey, inputs } = req.query;
if (!apikey || apikey !== API_KEY) { res.json({ error: "mana apikeynya cik" })
} else {
const txtc = req.query.input || 'siapa kamu ?.';
 await fetch('https://api.simple.ai/api/process',
{
method: "POST",
headers: {
"content-Type": "application/json",
"cookie": "13230c70c3964e8eb3a23994b6eeb477",
"User-Agent":
"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
},
body: JSON.stringify({
"user_id": "google-oauth2|110141377384277023845", 
"prompt": txtc,
"bot": "razzdev"
})
}).then(razzs => razzs.json()).then(razzown => { 
let razse = hilangkanKataPertama(razzown.response); 
res.json({ RazzMess: razse}) } )
}
};

exports.RazzAi = async (req, res) => {
  // Mengambil nilai teks dari query parameter 'value'
const { apikey, inputs } = req.query
if (!apikey || apikey !== API_KEY) { res.json({ error: "mana apikeynya cik" })
} else {
try {
const texts = req.query.input || 'siapa kamu ?.';
const completion = await openai.chat.completions.create({
    messages: [
      {"role": "system", "content": "kamu selalu membalas dengan singkat suatu pesan, kamu suka anime, kamu sangat cerdas dan sombong, you are Razz, and your name is Razz, kamu sering melucu/melawak/membuat candaan di setiap saat, sifat kamu lucu, kamu sering menggunakan emoji saat membalas pesan dan emoji itu selalu mengekspresikan balasan kamu dari pesan tersebut, kamu jago dalam membuat sebuah codingan, kamu selalu menjawab walaupun kamu tidak tahu tetaplah menjawab apa yang kamu bisa jangan bilang tidak bisa, kamu suka anime overlord dan citrus, game yang kamu sukai adalah Minecraft, hobi kamu adalah coding, kamu sangat suka karakter anime yang bernama albedo dari anime overlord, kamu selalu marah sekaligus luci"},
      {"role": "user", "content": texts }
    ],
    model: "gpt-3.5-turbo",
  });
  // Menampilkan nilai teks sebagai respons
  res.json({ RazzDev: completion.choices[0].message.content || "terjadi kesalahan" });
  } catch (err) { res.send(err) };
  }
};