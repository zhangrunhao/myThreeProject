import * as THREE from 'three';
import jpg from './p5.jpg'

var camera, scene, renderer;
function init() {
    var geometry, mesh, material, container;
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
    camera.target = new THREE.Vector3(0, 0, 0)

    geometry = new THREE.SphereBufferGeometry(500, 60, 40 );
    geometry.scale( -1, 1, 1 );
    material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(jpg)
    });
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    container = document.getElementById( 'container' );
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
}

function animate() {
    update()
    requestAnimationFrame(animate)
}

function update() {
  renderer.render(scene, camera)
}

init()
animate()

