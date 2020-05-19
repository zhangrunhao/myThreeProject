import * as THREE from 'three';
import {
  DeviceOrientationControls
} from 'three/examples/jsm/controls/DeviceOrientationControls'
class panorama{
  constructor () {
      this.scene = new THREE.Scene();
      this.initCamera();
      this.initMesh();
      this.initRenderer();
      this.animate();
  }

  initCamera () {
      let camera = this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1100 );
      camera.position.set(0, 0, 0);

      this.controls = new DeviceOrientationControls( camera );
      this.controls.connect();
  }
  initMesh () {
      let geometry = new THREE.SphereGeometry( 500, 60, 40 );
      geometry.scale( -1, 1, 1 );
      geometry.rotateY(-Math.PI / 2)

      let material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('./p5.jpg')
      });

      let mesh = new THREE.Mesh( geometry, material );
      this.scene.background = new THREE.Color( 0xf0f0f0 );
      this.scene.add( mesh );
  }
  initRenderer () {
      let container = document.getElementById( 'container' );
      let renderer = this.renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.sortObjects = false;
      renderer.autoClear = false;
      container.appendChild( renderer.domElement );
  }
  animate() {
      this.render();
      requestAnimationFrame( ()=>{this.animate()});
  }
  render() {
      //更新控制器
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
  }
}
new panorama()