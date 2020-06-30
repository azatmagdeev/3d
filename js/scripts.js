const canvas = document.getElementById('c');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const zero_button = document.getElementById('x');
zero_button.addEventListener('click', () => {
    mesh.rotation.y = mesh.rotation.x = temp.x = temp.y = 0
    renderer.render(scene,camera)
})

const start = {};
const diff = {x: 0, y: 0};

const temp = {x: 0, y: 0};

canvas.addEventListener('mousedown', mouse_control);
canvas.addEventListener('touchstart', mouse_control);

function mouse_control(e) {
    switch (e.type) {
        case 'mousedown':
            start.x = e.clientX;
            start.y = e.clientY;
            window.addEventListener('mousemove', check_mouse_position);
            break;
        case 'touchstart':
            start.x = e.touches[0].clientX;
            start.y = e.touches[0].clientY;
            window.addEventListener('touchmove', check_mouse_position);
    }
}

function check_mouse_position(e) {
    diff.x = e.clientX - start.x;
    diff.y = e.clientY - start.y;

    if(e.type === 'touchmove'){
        console.log(e.touches[0]);
        diff.x = e.touches[0].clientX - start.x;
        diff.y = e.touches[0].clientY - start.y;
        console.log('diff',diff)
    };


    mesh.rotation.y = temp.x + diff.x / 100;
    mesh.rotation.x = temp.y + diff.y / 100;
    renderer.render(scene, camera);
}

window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', check_mouse_position);
    temp.x = mesh.rotation.y;
    temp.y = mesh.rotation.x;

})
window.addEventListener('touchend', () => {
    window.removeEventListener('touchmove', check_mouse_position);
    temp.x = mesh.rotation.y;
    temp.y = mesh.rotation.x;

})

const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setClearColor(0x000000);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 5000);
camera.position.set(0, 0, 1000);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const geometry = new THREE.CubeGeometry(250, 250, 250);
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: false,
    vertexColors: THREE.FaceColors
})

for (let i = 0; i < geometry.faces.length; i++) {
    geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random())

}

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


renderer.render(scene, camera);
