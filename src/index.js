var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import 'three/examples/jsm/loaders/ColladaLoader.js';

var renderer, width, height;
function initThree() {
  width = document.getElementById('canvas-frame').clientWidth;
  height = document.getElementById('canvas-frame').clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias: true // 边缘柔化或扛锯齿
  })
  renderer.setSize(width, height)
  document.getElementById('canvas-frame').appendChild(renderer.domElement)
  renderer.setClearColor(0xFFFFFF, 1.0) // 场景背景色 
}

var camera;
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
  camera.position.x = 0
  camera.position.y = 1000
  camera.position.z = 0
  camera.up.x = 0
  camera.up.y = 0
  camera.up.z = 1
  camera.lookAt(
    0,
    0,
    0
  )

  var control = new OrbitControls(camera, renderer.domElement.parentNode);
  control.target =new THREE.Vector3(0,0,0);
  camera.aspect = window.innerWidth / window.innerHeight;
}

var scene;
function initScene() {
  scene = new THREE.Scene()
}

var light;
function initLight() {
  light = new THREE.DirectionalLight(0xFF0000, 1.0, 0) // 这里应该是一道光
  light.position.set(100, 100, 200)
  scene.add(light)
}

var cube;
function initObject() {
  var geometry = new THREE.Geometry()
  // 定义两个点
  geometry.vertices.push(new THREE.Vector3(-500, 0, 0))
  geometry.vertices.push(new THREE.Vector3(500, 0, 0))

  for (var i = 0; i <= 20; i++) {
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: 0x000000,
      opacity: 0.2
    }))
    // 因为相机的位置, 在正上方, 所以, 要在z轴上平铺开来
    line.position.z = (i * 50) - 500
    scene.add(line)

    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: 0x000000,
      opacity: 0.2
    }))
    line.position.x = (i * 50) - 500
    line.rotation.y = 90 * Math.PI / 180
    scene.add(line)
  }
}

function render() {
  renderer.clear()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

function threeStart() {
  initThree()
  initCamera()
  initScene()
  initLight()
  initObject()
  render()
}

threeStart()