interface Trail {
  x: number;
  y: number;
}

export default class Firework {
  public x: number;
  public y: number;
  public angle: number = (Math.random() * Math.PI / 4) - Math.PI / 8;
  public color: string;
  public speed: number = 10 + Math.random() * 1;
  public ySpeed: number = -Math.cos(this.angle) * this.speed;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private xSpeed: number = Math.sin(this.angle) * this.speed;
  private trail: Trail[] = [];

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = this.width / 3 + Math.floor(Math.random() * (this.width / 3));
    this.y = this.height - Math.floor(Math.random() * 100);
    this.color = `rgba(
      ${Math.floor(Math.random() * 255) + 1},
      ${Math.floor(Math.random() * 255) + 1},
      ${Math.floor(Math.random() * 255) + 1}`; // this doesn't finish with ')', cause we will use it for the alpha trail
  }

  public draw(): void {
    const { ctx } = this;
    ctx.beginPath();
    ctx.fillStyle = `${this.color}, 1)`;
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    this.trail.forEach((tr, i) => {
      const alpha: number = (i + 1) / this.trail.length;
      const size: number = 5 / (1 / (i + 1) * this.trail.length);

      ctx.beginPath();
      ctx.fillStyle = `${this.color},${alpha})`;
      ctx.moveTo(tr.x, tr.y);
      ctx.arc(tr.x, tr.y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      if (i === 40) {
        this.trail.shift();
      }
    });

    this.trail.push({ x: this.x, y: this.y });
  }

  public update(): void {
    this.y += this.ySpeed;
    this.x += this.xSpeed;
    this.ySpeed += 0.1;
  }
}
