import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

// Initialize noise
const noise2D = createNoise2D();

function noise(x, z) {
  return noise2D(x / 100, z / 100) * 50; // Wave effect
}

// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color to #10172a (Ocean background color)
scene.background = new THREE.Color(0x10172a); // Update to the new dark ocean color

// Create geometry for the ocean grid
const size = 1100;
const spacing = 10;
const positions = [];
for (let x = 0; x < size; x += spacing) {
  for (let z = 0; z < size; z += spacing) {
    positions.push(x, 0, z); // x, y, z for each point
  }
}

const grid = new THREE.BufferGeometry();
grid.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

// Create material for the grid particles
const gMaterial = new THREE.PointsMaterial({
    color: 0x003366,
    size: 3,
    transparent: true,
    opacity: 0.8,
    depthTest: true,
    depthWrite: false,
});

// Create the particle system for the grid
const gridSystem = new THREE.Points(grid, gMaterial);
scene.add(gridSystem);
gridSystem.position.x = -size / 2;
gridSystem.position.z = -size / 2;

// Camera setup (bird's-eye view for Battleship-like perspective)
camera.position.set(0, 700, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Animation loop for wave motion
let time = 0;
function mainloop() {
  time += 0.03;
  const positions = grid.attributes.position.array;

  // Wave parameters
  const waveFrequency = 3; // Controls wave density
  const waveSpeed = 3; // Controls wave speed
  const waveDirection = new THREE.Vector2(1, 0); // Waves move in the X direction

  for (let i = 0; i < positions.length; i += 3) {
    // Calculate base wave height with noise
    let waveHeight = noise(
      positions[i] + time / 20,
      positions[i + 2] + time / 20
    );

    // Add direction to the wave movement
    const directionWave =
      Math.sin(
        positions[i] * waveFrequency + time * waveSpeed * waveDirection.x
      ) *
      Math.cos(
        positions[i + 2] * waveFrequency + time * waveSpeed * waveDirection.y
      );
    waveHeight += directionWave * 5; // Scale the wave motion

    // Simulate foam on top of waves
    const waveCapEffect = Math.sin(positions[i] * 0.1 + time / 10) * 1;
    positions[i + 1] = waveHeight + waveCapEffect;

    // Adjust color for foam (lighter near the crest)
    if (positions[i + 1] > 30) {
      gMaterial.color.set(0x10172a); // Lighter foam color
    } else {
      gMaterial.color.set(0x003366); // Dark ocean blue color
    }
  }
  grid.attributes.position.needsUpdate = true;
}

function render() {
  requestAnimationFrame(render);
  mainloop();
  renderer.render(scene, camera);
}

render();

// Handle window resizing
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
