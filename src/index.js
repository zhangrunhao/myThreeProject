import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import {
  ColladaLoader
} from 'three/examples/jsm/loaders/ColladaLoader.js';
import {
  OBJLoader
} from 'three/examples/jsm/loaders/OBJLoader.js';
import {
  FBXLoader
} from 'three/examples/jsm/loaders/FBXLoader.js';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

var container, camera, scene, renderer, control, stats, mixer, clock, containerScene;

init();
animate();
onWindowResize();
initButtonEvent();


function init() {
  container = document.getElementById('container');

  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(15, 10, -15);

  scene = new THREE.Scene();

  containerScene = new THREE.Scene()

  var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
  scene.add( ambientLight );

  var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  scene.add( camera );
  camera.add( pointLight );

  
  var loader = new ColladaLoader();
  // var loader = new OBJLoader();
  // var loader = new FBXLoader();
  // loader.load('../dae/Dragon 2.5_dae.dae', function (collada) {
  //   var dargon = collada.scene
  //   dargon.scale.copy({
  //     x: 0.5,
  //     y: 0.5,
  //     z: 0.5
  //   })
  //   containerScene.add(collada.scene);
  // });

  // loader.load('../modules/collada/elf/elf.dae', function (collada) {
  //   var girl = collada.scene
  //   girl.position.x = 10
  //   girl.scale.x = 4
  //   girl.scale.y = 4
  //   girl.scale.z = 2
  //   containerScene.add(girl);
  // });

  // TODO: 模型更换颜色
  // loader.load('../modules/collada/stormtrooper/stormtrooper.dae', function (collada) {
  // loader.load('../xuxu/55555.dae', function (collada) {
  //   console.log(collada)
  //   collada.scene.traverse((function (i) {
  //     console.log(i)
  //     // if (i.name === 'mixamorig_Head') {
  //     //   i.scale.x = 3
  //     //   i.scale.y = 3
  //     //   i.scale.z = 3
  //     // }
  //     if (i.isMesh && i.name  === '圆柱') {
  //       // console.log(i)
  //       // i.scale.x = 2
  //       // i.material.color.setHex(0x1A75FF)
  //     }
  //   }))
  //   // var animations = collada.animations;
  //   var avatar = collada.scene;
  //   // mixer = new THREE.AnimationMixer(avatar);
  //   // mixer.clipAction(animations[0]).play();
  //   scene.add(avatar)
  // });
  new MTLLoader().load('../xuxu/3333.mlt', function (m) {
    m.preload()
    console.log(m)
    new OBJLoader().setMaterials(m).load('../xuxu/3333.obj', function (a) {
      scene.add(a)
    })
  })
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
  control.target = new THREE.Vector3(0, 2, 0);
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