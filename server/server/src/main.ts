import axios from 'axios'
import express, { json } from 'express'

import { logger } from './utils/Logger'

const app = express()
const port = 8080
const fileUpload = require('express-fileupload')

app.use(fileUpload())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

const words:String[] = ['Mandarina','Banano','Pera','Manzana','Limon']
const servers:Number[] = [8081,8082,8083]

console.clear()

app.get('/status', (_, response) => {
  response.sendStatus(200)
})

//Peticion que verifica si un archivo de firmas coincide con el del servido actual y retorna Ok o Todo mal
app.post('verifySignature',(req,res) => {
  let signature = req.body.signature;
  //Verificar que coincidan las firmas de la imagen
  res.json({message:true})
})

//Peticion que devuelve una palabra aleatoria del arreglo de palabras predefinidas
app.get('/word', (req,res) => {
  let selectedWord = words[Math.floor((Math.random() * (5 - 0)) + 0)];
  logger.info(`La palabra escogida es ${selectedWord}`)
  res.send(selectedWord)
})

//Peticion inicial a la que accede el cliente para solicitar cambiar un pixel
app.post('/changePixel', (req,res)=>{
  let img = (req as any).files.file;
  let info = req.body.info;

  info = JSON.parse(info);
  logger.info('Informacion de firmas recibida correctamente')
  img.mv(`${img.name}`,() =>{
    logger.info('Imagen recibida correctamente')
    res.json('Informacion recibida')
  })
  sendSignature(info)
  
})

//Funcion que se encarga de enviar la firma a todos los servidores para su verificacion
function sendSignature(signature:string){
  let cont = 0;
  servers.forEach(()=>{
    axios.post(`http://localhost:${servers}/verifySignature`,{
      data: signature
    }).then(function (response) {
      if (response.data.message) {
        cont = cont+1;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  })
  if (cont>=((servers.length/2)+1)) {
    //Como las firmas son reales, se procede a solicitar la prueba de trabajo
    logger.info('La firma de la imagen del cliente es correcta, asignando prueba de trabajo...')
    pow();
  }else{
    //Pailas
    logger.info('La firma de la imagen del cliente no coincide con la mayoria de los servidores')
  }
}

//Funcion que se encarga de pedir a todos una palabra para asignar la prueba de trabajo al cliente que solicite modificar el archivo
async function pow (){
  servers.forEach(()=>{
      axios.post(`http://localhost:${servers}/word`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  )
}



app.listen(port, () => {
  logger.info(`Instance server listening at port ${port}`)
})
