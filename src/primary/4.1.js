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
  // PerspectiveCamera: 远景摄像机, 有近大远小
  /**
   * 参数:
   * fov: 视角, 也就是眼镜睁开多大, 越到看到的越多, 各个模型也就越小
   * aspect: 实际窗口的横纵比. 如果越大, 也就是宽度越大, 就是大银幕的电影, 如果越小, 就是竖着的手机
   * near: 眼镜距离近处的距离
   * far: 远处截面的距离
   */
  // OrthographicCamera: 正投影摄像机, 直接呈现
  /**
   * 参数:
   * left: 坐平面距离相机中心点位置
   * right: 右平面距离相机中心点位置
   * top: 顶平面距离相机中心点位置
   * bottom: 底平面距离相机中心点位置
   * near: 近平面距离相机位置
   * far: 远平面距离相机位置
   */
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);
  // camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
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
  stats.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}