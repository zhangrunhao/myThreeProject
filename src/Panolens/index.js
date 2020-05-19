import * as THREE from 'three'
import * as PANOLENS from 'panolens'


const panorama = new PANOLENS.ImagePanorama( 'asset/equirectangular.jpg' );
const viewer = new PANOLENS.Viewer();
viewer.add( panorama );

console.log(PANOLENS)

