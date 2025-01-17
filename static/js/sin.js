// set up canvas
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Set up amplitude range
const MIN_AMP = 100;
const MAX_AMP = 200;
function randAmp() {
  return (100 + (Math.random() * 200));
}

// Set up phase shift (theta) range
const MAX_SHIFT = 180;
function randShift() {
  return Math.random() * MAX_SHIFT;
}

let sins = [
  {
    "f": 0.001,
    "C": randAmp()/2,
    "theta": randShift(),
  },
  {
    "f": Math.random() * 100,
    "C": randAmp(),
    "theta": randShift(),
  },
  {
    "f": Math.random() / 100,
    "C": randAmp(),
    "theta": randShift(),
  },
]

let inc;
// max and min frequency
const MIN_FREQ = 0.0009
const MAX_FREQ = 0.05

/* change frequency while keep normilize */
function updateFrequencies() {
  //
  // keep normalize
  for (let i = 0; i < sins.length; i++) {
    if (sins[i].f >= MAX_FREQ)
      inc = false;
    if (sins[i].f < MIN_FREQ)
      inc = true;
    // change
    sins[i].f += inc? (0.00001): (-0.00001);
  }
}

const draw = () => {
  // clear and set
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#0000FF";

  updateFrequencies()

  // evaluate and draw each pixel (1on1 rect)
  for (let t = 1.0; t < 2000; t += 0.1) {
    j = 1.0;
    for (let i = 0; i < sins.length; i++) {
      j += sins[i].C * Math.sin(
        2.0 * Math.PI * (sins[i].f * t)) + sins[i].theta
    }

    // draw
    ctx.fillRect(t, height/2 + j, 1, 1);
  }

}

function main() {
    inc = true;
    y = height/2;
    console.log(sins)

    setInterval(draw, 20);
    window.addEventListener("resize", () => location.reload());
}

main()
