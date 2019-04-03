export default class Shard {
  public x: number;
  public y: number;
  public angle: number = Math.PI * 2 - (Math.random() * Math.PI * 2);
  public glow: number = 1;
  public speed: number = 0.4 + Math.random() * 3;
  public ySpeed: number = -Math.cos(this.angle) * this.speed;
  private ctx: CanvasRenderingContext2D;
  private size: number = 5;
  private xSpeed: number = Math.sin(this.angle) * this.speed;
  private color: string;

  constructor(ctx: CanvasRenderingContext2D, ex: number, ey: number, color: string) {
    this.ctx = ctx;
    this.color = color;
    this.x = ex; // x location at explosion location
    this.y = ey; // y location at explosion location
  }

  public draw(): void {
    const { ctx } = this;
    ctx.beginPath();
    ctx.fillStyle = `${this.color}, ${this.glow})`;
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  public update(): void {
    this.y += this.ySpeed;
    this.x += this.xSpeed;
    this.ySpeed += 0.02;
    this.glow -= 0.01;
    this.size = this.size < 0.08 ? this.size : this.size - 0.08;
  }
}
