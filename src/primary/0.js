import * as THREE from 'three';

var renderer, camera;
var scene, mesh;
var width, height;

window.onload = function () {
  initThree()
  initCamera()
  initScene()
  initLight()
  initObject()
  animation()
}


function initThree() {
  width = document.getElementById('canvas-frame').clientWidth
  height = document.getElementById('canvas-frame').clientHeight
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(width, height)
  document.getElementById('canvas-frame').appendChild(renderer.domElement)
  renderer.setClearColor(0xFFFFFF, 0.8)
}

function initLight() {
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 0, 600);
}

function initScene() {
  scene = new THREE.Scene()
}

function initObject() {
  var geometry = new THREE.CylinderGeometry(100, 150, 400, 300)
  var material = new THREE.MeshBasicMaterial({
    color: 0xFFFF00
  })
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

function animation() {
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}