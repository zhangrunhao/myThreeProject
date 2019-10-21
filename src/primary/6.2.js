import * as THREE from 'three';
import clock from '../clock'
var camera, scence, renderer;
var mesh;
var texture;

var canvas = clock()
init()
animate()

function init() {
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 400
  scence = new THREE.Scene()

  var gemotry = new THREE.CubeGeometry(150, 150, 150)
  texture = new THREE.Texture(canvas)
  var material = new THREE.MeshBasicMaterial({
    map: texture
  })
  texture.needsUpdate = true
  // will turn off mipmapping and the need for resizing to a power-of-two.
  texture.minFilter = THREE.LinearFilter;
  mesh = new THREE.Mesh(gemotry, material)
  scence.add(mesh)

  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  // 需要不断更新纹理, 原因: 纹理没有被载入之前就开始渲染, 渲染使用里默认的材质
  texture.needsUpdate = true;
  mesh.rotation.y -= 0.01;
  mesh.rotation.x -= 0.01;
  requestAnimationFrame(animate)
  renderer.render(scence, camera)
}