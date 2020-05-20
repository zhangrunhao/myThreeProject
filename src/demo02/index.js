import * as THREE from 'three'
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import vrJpgArr from './vr/vr'

var camera, scene, renderer, controls;

function init() {
  var container = document.getElementById('container');

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement)

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 0.01;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.rotateSpeed = - 0.25;

  var materials = getMaterials();
  var skyBox = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), materials);
  skyBox.geometry.scale(1, 1, -1)
  scene.add(skyBox)
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function getMaterials() {
  var textures = []
  var materials = []
  for (var i = 0; i < vrJpgArr.length; i++) {
    textures[i] = new THREE.Texture();
    var img  = new Image()
    img.src = vrJpgArr[i];
    textures[i].image = img;
    textures[i].needsUpdate = true;
    materials.push(new THREE.MeshBasicMaterial({
      map: textures[i]
    }))
  }
  return materials;
}

init();
animate();