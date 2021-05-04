const BRUSH_SIZE = 10;



export default class Canvas {
  private _canvas: HTMLCanvasElement;
  private _mousePositionText: HTMLParagraphElement;
  private _context: CanvasRenderingContext2D;
  private _data: Array<Array<number>>

  private _mousePosition = { x: 0, y: 0 };

  public _publicMousePosition;
  public _pixelColor;
  public _pixelObj = { pixelX: 0, pixelY: 0, pixelColor: '' };

  constructor(canvas: HTMLCanvasElement, cursorPosition: HTMLParagraphElement, color) {
    this._canvas = canvas;
    this._mousePositionText = cursorPosition;
    this._context = canvas.getContext("2d");
    this._data = [...Array(canvas.width)].map((value) =>
      Array(canvas.height).fill([255, 255, 255, 255])
    );

    canvas.addEventListener("click", (event) => {
      color = this._pixelColor;
      this.mouseMovedInCanvas(event);
      this.draw(this._mousePosition.x, this._mousePosition.y, color);
      this._publicMousePosition = { x: this._mousePosition.x, y: this._mousePosition.y }
    });

    canvas.addEventListener('mousemove', (event) => {
      this.mouseMovedInCanvas(event);
      this._mousePositionText.textContent = `x: ${this._mousePosition.x}, y: ${this._mousePosition.y}`;
    });

    this.loadImage();

  }

  // Create the object with position x, y and color.
  public savePixel(color) {
    return this._pixelObj = {
      pixelX: this._publicMousePosition.x,
      pixelY: this._publicMousePosition.y,
      pixelColor: color,
    }
  }

  private loadImage() {
    const image = new Image();
    image.src = "/images/cat2.png";

    const _this = this;
    image.onload = () => {
      _this._context.canvas.width = image.width;
      _this._context.canvas.height = image.height;
      _this._context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height
      );
    };
  }

  public draw(x: number, y: number, color) {

    this.setColor(color);
    if (x >= 0 && x < this._canvas.width && y >= 0 && y < this._canvas.height) {
      this._context.fillRect(
        x * BRUSH_SIZE,
        y * BRUSH_SIZE,
        BRUSH_SIZE,
        BRUSH_SIZE
      );

    }
  }

  private setColor(color) {
    // this._context.fillStyle = color    
    this._context.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
  }

  private mouseMovedInCanvas(event: MouseEvent) {
    const bounds = this._canvas.getBoundingClientRect();
    let x = event.clientX - bounds.left;
    let y = event.clientY - bounds.top;
    x = Math.floor((this._canvas.width * x) / this._canvas.clientWidth);
    y = Math.floor((this._canvas.height * y) / this._canvas.clientHeight);
    const xPosition = Math.floor(x / BRUSH_SIZE);
    const yPosition = Math.floor(y / BRUSH_SIZE);
    this._mousePosition = { x: xPosition, y: yPosition };
  }
  
}

