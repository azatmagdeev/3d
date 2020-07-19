// import THREE from '../js/lib/three.min.js';
// window.onload = function () {

// import * as THREE from "./lib/three.min.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.1, 10000);

const render = new THREE.WebGLRenderer({antialias: true})
render.setSize(innerWidth, innerHeight);
render.setClearColor(0x000000);

document.body.appendChild(render.domElement);

camera.position.z = 1000;
try{
    const amColor = '#faffe3'
    const amLight = new THREE.AmdientLight(amColor);
    scene.add(amLight);
}catch (e) {
    console.log(e);
}


const light = new THREE.DirectionalLight('xffffff',1);
scene.add(light);

// const manager = new THREE.LoadingManager();
// const loader = new THREE.ImageLoader(manager);

// const textureBody = new THREE.Texture();

const meshes = [];

const objLoader = new THREE.OBJLoader();
objLoader.load('model/sneaker.obj', function (object) {
    console.log(object);

    object.traverse( function(child){
        if(child instanceof THREE.Mesh){
            meshes.push(child);
        }
    })

    meshes.map(mesh=>{
        mesh.material = new THREE.MeshNormalMaterial();
        scene.add(mesh);
    })
});

const controls = new THREE.TrackballControls(camera);



const rendering = function () {
    requestAnimationFrame(rendering);
    controls.update();
    render.render(scene, camera);
}
rendering();
// }