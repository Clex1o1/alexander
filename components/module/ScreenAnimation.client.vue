<script lang="ts" setup>
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
// Define the animation properties
const animationDuration = 5000; // 5 seconds
const lineColor = "rgba(255, 255, 255, 0.1)";
function init() {
  if (!canvas.value) return;
  ctx.value = canvas.value.getContext("2d");
  // Set canvas size
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  // Start the animation
  console.log("init");
  requestAnimationFrame(animate);
}

// Function to draw a line
function drawLine(y: number) {
  if (!ctx.value || !canvas.value) return;
  ctx.value.beginPath();
  ctx.value.moveTo(0, y);
  ctx.value.lineTo(canvas.value.width, y);
  ctx.value.strokeStyle = lineColor;
  ctx.value.stroke();
}

// Function to update the animation
function updateAnimation(progress: number) {
  if (!ctx.value || !canvas.value) return;
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // Calculate the position of the line based on the progress
  const y = (progress / animationDuration) * canvas.value.height;

  // Draw the line
  drawLine(y);
}

// Function to handle animation frames
function animate(timestamp: number) {
  const progress = timestamp % animationDuration;

  // Update the animation
  updateAnimation(progress);

  // Request the next animation frame
  requestAnimationFrame(animate);
}

onMounted(() => {
  nextTick(() => {
    init();
  });
});
</script>

<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>
