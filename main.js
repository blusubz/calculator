// M

import * as THREE from 'three';

// To display anything with three.js we need a scene, camera and renderer
// Constructors
const scene = new THREE.Scene();

// Get container and specific canvas
const container = document.querySelector('.bottom-display');
const canvas = document.querySelector('#bg-canvas');

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Add ShapeGeometry
const arcShape = new THREE.Shape()
    .moveTo(5, 1)
    .absarc(1, 1, 4, 0, Math.PI * 2, false);
const geometry = new THREE.ShapeGeometry(arcShape);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide});
const heart = new THREE.Mesh(geometry, material);

// Add 3D object to scene
scene.add(heart);
camera.position.z = 10; // Since both camera and 3d object will be in same coordiante (0,0,0), we move out the camera a bit 

function animate(time) {
    heart.rotation.x = time / 2000;
    heart.rotation.y = time / 1000;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
    // Get new dimensions of the container
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Update Renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Update Camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});