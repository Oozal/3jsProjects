import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from "lil-gui"

const canvas = document.querySelector('canvas.webgl')

const gui = new GUI();


console.log(canvas)
//scene
const scene = new THREE.Scene()

//Geometry or mesh
const geom = new THREE.BoxGeometry(1,1,1);
const mat = new THREE.MeshBasicMaterial({
    color: 0xff0000
})
const mesh = new THREE.Mesh(geom,mat)
gui.add(mesh.position,"y").min(-3).max(3).step(0.01).name('elevation');
scene.add(mesh);

const size = 
{
    width : 800,
    height : 600
}

const parameters = 
{
    movXamplitute : 1,
    rotYamplitute : 1
}

gui.add(parameters,"movXamplitute").min(0).max(5).step(0.01)
gui.add(parameters,"rotYamplitute").min(0).max(5).step(0.01)

function DegreeToRad(deg)
{
    return((Math.PI/360.0) * deg)
}

//axis viewer gizmos
const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)

//camera
const cam = new THREE.PerspectiveCamera(45,size.width/size.height);
cam.position.set(4,4,4)
scene.add(cam)


const controls = new OrbitControls(cam, canvas);
controls.enableDamping = true;
//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})


renderer.setSize(size.width, size.height);
const clock = new THREE.Clock()

function tick()
{
    let elapsedTime = clock.getElapsedTime()
    cam.lookAt(new THREE.Vector3(0,0,0))
    mesh.position.x = Math.sin(elapsedTime * Math.PI) * 5 * parameters.movXamplitute
    mesh.rotation.y = elapsedTime  * Math.PI * parameters.rotYamplitute

    controls.update();

    renderer.render(scene,cam)

    window.requestAnimationFrame(tick);
    console.log(clock.getElapsedTime())
}
tick()
