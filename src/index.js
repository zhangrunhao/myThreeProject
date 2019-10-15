import * as THREE from 'three';

import {
  ColladaLoader
} from 'three/examples/jsm/loaders/ColladaLoader.js';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

var container, camera, scene, renderer, control;

init();
animate();
onWindowResize();

function init() {
  container = document.getElementById('container');
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.2, 2000);
  camera.position.set(10, 10, 80);
  camera.lookAt(0, 0, 0);
  scene = new THREE.Scene();
  var loader = new ColladaLoader();
 
  loader.load('../dae/Dragon 2.5_dae.dae', function (collada) {
    var dargon = collada.scene
    scene.add(dargon)
  });

  loader.load('../modules/collada/elf/elf.dae', function (collada) {
    var girl = collada.scene
    girl.position.copy({
      x: 10,
      y: 0,
      z: 10
    })
    scene.add(girl)
  });
  renderer = new THREE.WebGLRenderer();
  container.appendChild(renderer.domElement);
  control = new OrbitControls(camera, renderer.domElement.parentNode);
  control.target=new THREE.Vector3(0,0,0);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}