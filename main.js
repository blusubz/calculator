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

// Define the Heart Shape
const x = 0, y = 0;
const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7, x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 2, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );


// Create 3d object using ExtrudeGeometry
// This below pushes the 2d shape into 3rd dimension
const extrudeSettings = {
    depth: 2,              // How think the heart is
    bevelEnabled: true,    // Smooths the edges 
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 2
};

const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
// Center the heart so it spins on its axis
geometry.center();

const material = new THREE.MeshBasicMaterial({ 
    color: "red", 
    side: THREE.DoubleSide, 
    wireframe: true});

const heartLeft = new THREE.Mesh(geometry, material);
const heartCenter = new THREE.Mesh(geometry, material);
const heartRight = new THREE.Mesh(geometry, material);

camera.position.z = 70;

// Heart positionings
heartLeft.rotation.z = Math.PI;
heartLeft.position.y = 4;
heartLeft.position.x = -50;

heartCenter.rotation.z = Math.PI; // To not have it upside down
heartCenter.position.y = 4;
heartCenter.position.x = 0;

heartRight.rotation.z = Math.PI;
heartRight.position.y = 4;
heartRight.position.x = 50;

// Scale them up (1.5 makes them 50% larger)
const scaleAmount = 1.5; 

heartLeft.scale.set(scaleAmount, scaleAmount, scaleAmount);
heartCenter.scale.set(scaleAmount, scaleAmount, scaleAmount);
heartRight.scale.set(scaleAmount, scaleAmount, scaleAmount);

// Add 3D object to scene
scene.add(heartLeft, heartCenter, heartRight); 

function animate(time) {
    heartLeft.rotation.y = time / 1000;

    heartCenter.rotation.y = time / 1000;
    heartCenter.rotation.x = time / 2000;
    
    heartRight.rotation.y = -time / 1000;
    
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