const WORDS = ['Mandarina', 'Banano', 'Pera', 'Manzana', 'Limon']
const SERVER_PORTS = [8081, 8082, 8083, 8084]
const LEADER_PORT = 8081
// Todo: Change the local server port to be 8080 before building the Docker container
const LOCAL_SERVER_PORT = 8080
const SERVER_GATEWAY = process.env.GATEWAY || 'localhost'

export {
  WORDS,
  SERVER_PORTS,
  LEADER_PORT,
  LOCAL_SERVER_PORT,
  SERVER_GATEWAY
}
