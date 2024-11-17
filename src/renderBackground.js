import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

// Initialize noise
const noise2D = createNoise2D();

function noise(x, z) {
    return noise2D(x / 100, z / 100) * 40; // Wave effect
}

// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color to dark ocean blue
scene.background = new THREE.Color(0x001a33); // Dark ocean blue background

// Add lighting
const ambientLight = new THREE.AmbientLight(0x888888, 0.8); // Dim ambient light for atmospheric feel
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(100, 200, 100); // Position the light
scene.add(directionalLight);

// Create geometry for the ocean grid
const size = 1100;
const spacing = 2;
const positions = [];
for (let x = 0; x < size; x += spacing) {
    for (let z = 0; z < size; z += spacing) {
        positions.push(x, 0, z); // x, y, z for each point
    }
}

const grid = new THREE.BufferGeometry();
grid.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

// Create material for the grid particles
const gMaterial = new THREE.PointsMaterial({
    color: 0x003366, // Dark ocean blue
    size: 2, // Size of each grid point
    transparent: true,
    opacity: 0.8, // Slightly higher opacity for a less transparent effect
});

// Create the particle system for the grid
const gridSystem = new THREE.Points(grid, gMaterial);
scene.add(gridSystem);
gridSystem.position.x = -size / 2;
gridSystem.position.z = -size / 2;

// Camera setup (bird's-eye view for Battleship-like perspective)
camera.position.set(0, 600, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Animation loop for wave motion
let time = 0;
function mainloop() {
    time += 1;
    const positions = grid.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        // Basic wave noise calculation
        let waveHeight = noise(positions[i] + time / 40, positions[i + 2] + time / 20);
        
        // Add wave cap effect (simulating foam on top of waves)
        const waveCapEffect = Math.sin(positions[i] * 0.1 + time / 10) * 2; // Sinusoidal crest
        positions[i + 1] = waveHeight + waveCapEffect; // Combine base wave and crest

        // Optional: Adjust the color of the foam (if you want to simulate lighter crest)
        if (positions[i + 1] > 30) {
            gMaterial.color.set(0x66ccff); // Lighter foam color
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
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
