import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import {
  ColladaLoader
} from 'three/examples/jsm/loaders/ColladaLoader.js';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

var container, camera, scene, renderer, control, stats, mixer, clock, containerScene;

init();
animate();
onWindowResize();
initButtonEvent();


function init() {
  container = document.getElementById('container');

  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 100);

  scene = new THREE.Scene();

  containerScene = new THREE.Scene()

  var loader = new ColladaLoader();
  loader.load('../dae/Dragon 2.5_dae.dae', function (collada) {
    var dargon = collada.scene
    dargon.scale.copy({
      x: 0.5,
      y: 0.5,
      z: 0.5
    })
    containerScene.add(collada.scene);
  });

  loader.load('../modules/collada/elf/elf.dae', function (collada) {
    var girl = collada.scene
    girl.position.x = 10
    girl.scale.x = 4
    girl.scale.y = 4
    girl.scale.z = 2
    containerScene.add(girl);
  });

  loader.load('../modules/collada/stormtrooper/stormtrooper.dae', function (collada) {
    var animations = collada.animations;
    var avatar = collada.scene;
    avatar.position.z = 20
    mixer = new THREE.AnimationMixer(avatar);
    mixer.clipAction(animations[0]).play();
    containerScene.add(avatar);
  });

  var textureLoader = new THREE.TextureLoader()
  var texture = textureLoader.load('../bg.jpg')
  scene.background = texture

  scene.add(containerScene)

  renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true
  });
  var gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper)

  container.appendChild(renderer.domElement);
  control = new OrbitControls(camera, renderer.domElement.parentNode);
  control.target = new THREE.Vector3(0, 0, 10);
  // control.enableZoom = false;
  // control.enablePan = false;
  // control.nableRotate = false;

  // control.maxPolarAngle = 1.5;
  // control.minPolarAngle = 1.5;

  stats = new Stats();
  container.appendChild(stats.dom);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}

function render() {
  var delta = clock.getDelta();
  if (mixer !== undefined) {
    mixer.update(delta); // 根据当前的一个时间更新动画
  }
  renderer.render(scene, camera);
}
function initButtonEvent(params) {
  var btnLeft = document.getElementById('btnLeft')
  var btnRight = document.getElementById('btnRight')
  btnLeft.addEventListener('click', function () {
    containerScene.rotateY(0.05)
  })
  btnRight.addEventListener('click', function () {
    containerScene.rotateY(-0.05)
  })
  document.getElementById('saveImage').addEventListener('click', function () {
    var img = new Image()
    img.src = renderer.domElement.toDataURL();//转化为base64
    renderer.domElement.style.display = 'none'
    document.body.appendChild(img)
  })
}