import "reset-css";
import "../css/style.css";
import Firework from "./Firework";
import Shard from "./Shard";

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// set backrground to black
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const fireworks: Firework[] = [];
const shards: Shard[] = [];
const shardsCountFromFirework: number = 100;
let fCounter: number = 0; // counter for launching a firework
let lFrame: number = 40; // number for launching a firework every this frame
let aCounter: number = 0; // counter for when to stop launching consecutive fireworks

function animate() {
  fCounter++;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // every 40 frames launch a new firework
  if (fCounter % lFrame === 0) {
    fireworks.push(new Firework(ctx, canvas.width, canvas.height));
    if (aCounter > 100) {
      lFrame = 40;
      aCounter = 0;
    }
  }

  if (fCounter % 300 === 0) {
    lFrame = 5;
  }

  fireworks.forEach((f, i) => {
    f.draw();
    f.update();

    if (f.ySpeed > 0) {
      for (let j = 0; j < shardsCountFromFirework; j++) {
        shards.push(new Shard(ctx, f.x, f.y, f.color));
      }
      fireworks.splice(i, 1);
    }
  });

  shards.forEach((sh, i) => {
    sh.draw();
    sh.update();

    if (sh.glow < 0) {
      shards.splice(i, 1);
    }
  });

  aCounter++;
  requestAnimationFrame(animate);
}

animate();
