import * as THREE from "three"

const canvas = document.querySelector('canvas.webgl')


console.log(canvas)
//scene
const scene = new THREE.Scene()

//Geometry or mesh
const geom = new THREE.BoxGeometry(1,1,1);
const mat = new THREE.MeshBasicMaterial({
    color: 0xff0000
})
const mesh = new THREE.Mesh(geom,mat)
scene.add(mesh);

const size = 
{
    width : 800,
    height : 600
}

//axis viewer gizmos
const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)

//camera
const cam = new THREE.PerspectiveCamera(60,size.width/size.height);
cam.position.z = 3
scene.add(cam)


//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(size.width, size.height);
renderer.render(scene,cam)
