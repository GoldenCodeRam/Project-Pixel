const SERVER_URL = 'http://localhost:8084';


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

  public getPixels() {
    const request = new XMLHttpRequest();
    request.open('get', `${SERVER_URL}/getStoredPixels`);
    request.responseType = "json";    
    request.onload = function () {
      if (request.readyState === request.DONE) {
        if (request.status === 200) {
          console.log('Firmas')
          console.log(request.response.values);
        }
      }
      
    }    
    request.send()    
  }

}
