import * as THREE from 'three';
import TWEEN from '../tween.esm'
import Stats from 'three/examples/jsm/libs/stats.module.js';

var renderer, camera, scene, cube, light, mesh;
var width, height;
var stats;

window.onload = function () {
  initThree()
  initCamera()
  initScene()
  initLight()
  initObject()
  animation()
  initTween()
}

function initTween() {
  console.log(mesh.position)
  new TWEEN.Tween(mesh.position).to({
    x: -400,
  }, 1000).repeat(Infinity).start()
}

function initThree() {
  width = document.getElementById('canvas-frame').clientWidth
  height = document.getElementById('canvas-frame').clientHeight
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(width, height)
  document.getElementById('canvas-frame').appendChild(renderer.domElement)
  renderer.setClearColor(0xFFFFFF, 1.0)
  stats = new Stats()
  document.body.appendChild(stats.dom)
}

function initLight() {
  // TODO: 始终没有用光做出绿色
  light = new THREE.AmbientLight(0xFFFFFF); // illumates all objects in scence equal
  light.position.set(100, 100, 200);
  scene.add(light);

  light = new THREE.PointLight(0x00FF00);
  light.position.set(0, 0, 300);
  scene.add(light);
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
  TWEEN.update()
  stats.update()
  // camera.position.x = camera.position.x + 1
  // mesh.position.x = mesh.position.x + 1
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}