import axios from 'axios'
import express from 'express'
// import Database from './database'

import { logger } from './utils/Logger'

const app = express()
const port = 8080
const fileUpload = require('express-fileupload')

const moreRepeat = (ar: string[]) => ar.reduce((acum, el, i, ar) => {
  const count=ar.filter(e => e==el).length;
  return count > acum[1] ? [el, count] : acum;
}, ["", 0]
)
let word = '';
// let database:Database = new Database();



app.use(fileUpload())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const words:string[] = ['Mandarina','Pera','Limon']
const servers:number[] = [8080,8081,8082,8083]

console.clear()

app.use(express.static('public'))

app.post('/image', (request, response) => {
  logger.info('Post request to upload the pixelart image')
  response.sendStatus(200)
})

app.get('/status', (_, response) => {
  logger.info('Request to send the status of the server; OK')
  response.sendStatus(200)
})

//Peticion que verifica si un archivo de firmas coincide con el del servido actual y retorna Ok o Todo mal
app.post('/verifySignature',(req,res) => {
  let signature = req.body.signature;
  console.log(signature);
  //Verificar que coincidan las firmas de la imagen
  res.json({message:true})
})

// Peticion que devuelve una palabra aleatoria del arreglo de palabras predefinidas
app.get('/word', (req, res) => {
  const selectedWord = words[Math.floor((Math.random() * (5 - 0)) + 0)]
  logger.info(`La palabra escogida es ${selectedWord}`)
  res.json({word:selectedWord})
})

//Peticion inicial a la que accede el cliente para solicitar cambiar un pixel
app.post('/changePixel',(req,res)=>{
  let img = (req as any).files.file;
  let info = req.body.info;

  info = JSON.parse(info)
  logger.info('Informacion de firmas recibida correctamente')
  img.mv(`${img.name}`, () => {
    logger.info('Imagen recibida correctamente')
  })
  sendSignature(info)
  setTimeout(()=>{
    logger.info(`La palabra que debe escribir el servidor que desea cambiar el pixel es ${word}`)
    res.json({message:`La palabra que debe escribir 100.000 veces es: ${word}`,word:word})
  },3000)
})

//Funcion que se encarga de enviar la firma a todos los servidores para su verificacion
function sendSignature(signature:string){
  let cont = 0;
    servers.forEach(async(e)=>{
      console.log(e)
      axios.post(`http://localhost:${e}/verifySignature`,{
        data: signature
      }).then(function (response) {
        if (response.data.message) {
          console.log(response.data)
          cont = cont+1;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    })


  setTimeout(()=>{
    console.log(cont)
    if (cont>=((servers.length/2)+1)) {
      //Como las firmas son reales, se procede a solicitar la prueba de trabajo
      logger.info('La firma de la imagen del cliente es correcta, asignando prueba de trabajo...')
      pow();
    }else{
      //Pailas
      logger.info('La firma de la imagen del cliente no coincide con la mayoria de los servidores')
      word = 'Not Found';
    }
  },1000)
}

//Funcion que se encarga de pedir a todos una palabra para asignar la prueba de trabajo al cliente que solicite modificar el archivo
function pow (){
  let words:string[] = []
  servers.forEach((e)=>{
      axios.get(`http://localhost:${e}/word`)
      .then(function (response) {
        words.push(response.data.word)
        console.log(response.data.word);
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  setTimeout(function () {
    word = moreRepeat(words)[0].toString()
    console.log('Esta es '+word)
  },1000)
}


app.listen(port, () => {
  logger.info(`Instance server listening at port ${port}`)
})
