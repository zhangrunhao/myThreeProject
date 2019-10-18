

/**
 * THREE.Texture(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy)
 * mapping: 纹理坐标
 * wrapS: 纹理回环方式, 纹理宽度小于需要贴图的平面时, 如何处理
 * wrapT: y轴的纹理回环方式,
 * magFilter: 过滤方式
 * minFilter: 过滤方式
 * format: 加载的图片格式, THREE.RGBAFormat(有透明)/RGBFormat(无透明)
 * type: 表示存储纹理的内存的每一个字节
 * anisotropy: 各项异性过滤, 使用效果更好, 耗费性能
 */

import * as THREE from 'three';

var camera, scence, renderer;
var mesh;

init()
animate()

function init() {
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 400
  scence = new THREE.Scene()

  // 画一个平面
  var geometry = new THREE.PlaneGeometry(300, 300, 1, 1)
  // 为这个平面赋予纹理坐标
  // TODO: 什么是二维向量
  geometry.vertices[0].uv = new THREE.Vector2(0, 0)
  geometry.vertices[1].uv = new THREE.Vector2(2, 0)
  geometry.vertices[2].uv = new THREE.Vector2(2, 2)
  geometry.vertices[3].uv = new THREE.Vector2(0, 2)

  // 加载纹理
  var texture = THREE.ImageUtils.loadTexture('./bg.jpg', null, function (t) {
  })

  // 将纹理应用于材质
  var material = new THREE.MeshBasicMaterial({
    map: texture
  })
  var mesh = new THREE.Mesh(geometry, material)
  scence.add(mesh)

  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scence, camera)
}
