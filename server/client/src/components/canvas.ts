const BRUSH_SIZE = 10;

export default class Canvas {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _data: Array<Array<number>>

  constructor(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d");
    this._data = [...Array(canvas.width)].map((value) =>
      Array(canvas.height).fill([255, 255, 255, 255])
    );

    canvas.addEventListener("click", (event) => {
      const bounds = this._canvas.getBoundingClientRect();
      let x = event.clientX - bounds.left;
      let y = event.clientY - bounds.top;
      x = Math.floor((this._canvas.width * x) / this._canvas.clientWidth);
      y = Math.floor((this._canvas.height * y) / this._canvas.clientHeight);
      this.draw(x, y);
    });

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

    this._canvas.toBlob((blob) => {
      var url = URL.createObjectURL(blob);
    })
  }

  draw(x, y) {
    if (x >= 0 && x < this._canvas.width && y >= 0 && y < this._canvas.height) {
      const xPosition = Math.floor(x / BRUSH_SIZE);
      const yPosition = Math.floor(y / BRUSH_SIZE);
      this._context.fillRect(
        xPosition * BRUSH_SIZE,
        yPosition * BRUSH_SIZE,
        BRUSH_SIZE,
        BRUSH_SIZE
      );
    }
  }

  setColor(color) {
    this._context.fillStyle = `rgba("${color[0]},${color[1]},${color[2]},${color[3]}")`;
  }

  save() {

  }
}
