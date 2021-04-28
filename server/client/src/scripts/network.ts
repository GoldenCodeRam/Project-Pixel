const SERVER_URL = 'http://localhost:8080';

export default class Network {
  public serverStatus() {
    const request = new XMLHttpRequest();
    request.open('get', `${SERVER_URL}/status`);
    request.send();
  }

  public sendImage(blob: Blob) {
    const request = new XMLHttpRequest();
    const formData = new FormData();
    
    formData.append('image', blob);
    request.open('post', `${SERVER_URL}/image`);
    request.send(formData);
  }
}
