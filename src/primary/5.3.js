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
  var  light1 = new THREE.AmbientLight(0x00FF00)
  light1.position.set(100, 100, 200)
  scene.add(light1)
  // 平行光
  var light = new THREE.DirectionalLight(0xFF0000, 1)
  light.position.set(1, 0, 0.5)
  scene.add(light)

  var light2 = new THREE.PointLight(0xFF0000);
  light2.position.set(0, 0, 50)
  scene.add(light2)
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(200, -0, 600)
}

function initScene() {
  scene = new THREE.Scene()
}

function initObject() {
  var geometry = new THREE.CubeGeometry(200, 100, 50, 4, 4)
  var material = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF
  })
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

function animation() {
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}