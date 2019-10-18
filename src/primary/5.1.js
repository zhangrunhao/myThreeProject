import * as THREE from 'three';
import { SpotLight } from 'three';

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
  // 环境光: 无处不在的光, 多次反射, 来自任何方向
  // var light = new THREE.AmbientLight(0x880000);
  // 点光源: 辐射方形四面八方. 参数: 颜色, 强度, 距离
  var light = new THREE.PointLight(0xFF0000)
  light.position.set(100, 100, 200)
  // 聚光灯: 颜色, 强度, 距离, 弧度, 衰减
  // var light = new SpotLight(0xFF0000)
  scene.add(light)
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 0, 600);
}

function initScene() {
  scene = new THREE.Scene()
}

function initObject() {
  var geometry = new THREE.CubeGeometry(200, 100,  50, 4, 4)
  // 没有光源, 所有的颜色, 都是黑色
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