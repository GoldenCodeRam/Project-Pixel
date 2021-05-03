const SERVER_URL = 'http://localhost:8081';

export{
  SERVER_URL
}
import Canvas from './canvas'
export default class Network {
  public serverStatus() {
    const request = new XMLHttpRequest();
    request.open('get', `${SERVER_URL}/status`);
    request.send();
  }

  public sendPixel(pixelObj) {
    const request = new XMLHttpRequest();
    request.open('post', `${SERVER_URL}/sendNewPixel`);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(pixelObj));
  }

}
