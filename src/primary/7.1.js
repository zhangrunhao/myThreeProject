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

function initLight() {}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(100, 100, 300);
  camera.lookAt(0, 1, 0)
}

function initScene() {
  scene = new THREE.Scene()
}

function initObject() {
  var gometry = new THREE.BoxGeometry(100, 100, 100)
  // faces 用来存储Geometry包含的每个面
  for (var i = 0; i < gometry.faces.length; i += 2) {
    var hex = Math.random() * 0xffffff
    gometry.faces[i].color.setHex(hex)
    gometry.faces[i + 1].color.setHex(hex)
  }
  // MeshBasicMaterial 对集合颜色材质颜色支持的很好

  var material = new THREE.MeshBasicMaterial({
    // 指定了一个面中四个顶点的颜色, 因为颜色相同, 固然是纯色的
    vertexColors: THREE.FaceColors
  })
  mesh = new THREE.Mesh(gometry, material)
  scene.add(mesh)

  var helper = new THREE.GridHelper(1000, 50, 0x0000ff, 0x808080)
  scene.add(helper)
}

function animation() {
  // rotation 指定弧度, 度 = 弧度 * 180度/pai
  // mesh.rotation.y += 0.01;
  // 围绕Y轴旋转的弧度
  mesh.rotateY(0.01)
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}