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
  // 平行光
  var light = new THREE.DirectionalLight(0xFF0000, 1)
  light.position.set(1, 0, 0.5)
  scene.add(light)
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(200, -0, 600)
  // camera.up.set(0, 1, 0)
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
  var geometry = new THREE.CubeGeometry( 200, 100, 50,4,4);
  var material = new THREE.MeshLambertMaterial( { color:0xFFFFFF} );
  var mesh = new THREE.Mesh( geometry,material);
  mesh.position.set(0,0,0);
  scene.add(mesh);

  var geometry2 = new THREE.CubeGeometry( 200, 100, 50,4,4);
  var material2 = new THREE.MeshLambertMaterial( { color:0xFFFFFF} );
  var mesh2 = new THREE.Mesh( geometry2,material2);
  mesh2.position.set(-300,0,0);
  scene.add(mesh2);

  var geometry3 = new THREE.CubeGeometry( 200, 100, 50,4,4);
  var material3 = new THREE.MeshLambertMaterial( { color:0xFFFFFF} );
  var mesh3 = new THREE.Mesh( geometry3,material3);
  mesh3.position.set(0,-150,0);
  scene.add(mesh3);

  var mesh4 = new THREE.Mesh( geometry3,material3);
  mesh4.position.set(0,150,0);
  scene.add(mesh4);

  var mesh5 = new THREE.Mesh( geometry3,material3);
  mesh5.position.set(300,0,0);
  scene.add(mesh5);

  var mesh6 = new THREE.Mesh( geometry3,material3);
  mesh6.position.set(0,0,-100);
  scene.add(mesh6);
}

function animation() {
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}