const SERVER_URL = 'http://localhost:8080';

export default class Network {
  
  public serverStatus() {
    const request = new XMLHttpRequest();
    request.open('get', `${SERVER_URL}/status`);
    request.send();
  }  

  public sendPixel(pixelObj: Object) {    
    const request = new XMLHttpRequest();
    request.open('post', `${SERVER_URL}/sendNewPixel`);  
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(pixelObj));
  }
}
