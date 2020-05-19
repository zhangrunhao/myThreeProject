import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import texture from './t1.jpg'

var camera, scene, renderer, controls;
function init() {
    var geometry, mesh, material, container;
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
    // camera.target = new THREE.Vector3(0, 0, 0)

    geometry = new THREE.SphereBufferGeometry(500, 60, 40 );
    geometry.scale( -1, 1, 1 );
    material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(texture)
    });
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    container = document.getElementById( 'container' );
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    camera.position.z = 0.01;
    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = - 0.25;
}

function animate() {
    controls.update();
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}


init()
animate()

