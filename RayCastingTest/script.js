import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"

//canvas to render the 3js content into
const canvas = document.querySelector('canvas.webgl')

console.log(canvas)
console.log("Hello boys")
//object to hold screen size
const size =
{
    width : window.innerWidth,
    height : window.innerHeight
}

let mouse = new THREE.Vector2()

window.addEventListener("mousemove",(event)=>
{
    mouse.x = ((event.clientX/size.width)-0.5)*2
    mouse.y = ((event.clientY/size.height)-0.5)*2

    //console.log(mouse)
    raycaster.setFromCamera(mouse,cam)

    if(raycaster.intersectObject(sphereMesh).length>0)
    {
        
        console.log("intersecting")
        sphereMesh.material.color.set("blue");
    }
    else
    {
        sphereMesh.material.color.set("red");
    }

    renderer.render(scene,cam)

})

window.addEventListener('resize',()=>
{
    size.width = window.innerWidth
    size.height = window.innerHeight

    cam.aspect = size.width/size.height
    cam.updateProjectionMatrix()

    renderer.setSize(size.width, size.height)

    renderer.render(scene,cam)
})

const scene = new THREE.Scene()

//creating a camera to render objects
const cam = new THREE.PerspectiveCamera(60,size.width/size.height)
cam.position.z = 5
//adding camera to the scene
scene.add(cam)

//initialing orbital control
//const control = new OrbitControls(cam,canvas)

//creating geometry for sphere mesh
const sphereGeom = new THREE.SphereGeometry(1,16,16);
//creating material for the sphere
const sphereMat = new THREE.MeshBasicMaterial()
sphereMat.color = new THREE.Color("red");
//creating actual sphere mesh that will be rendered
const sphereMesh = new THREE.Mesh(sphereGeom,sphereMat)

//adding the sphere to scene
scene.add(sphereMesh)


const raycaster = new THREE.Raycaster()
raycaster.setFromCamera(mouse,cam)


//creating a renderer to render evey thing
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(size.width, size.height)

renderer.render(scene,cam)

console.log(renderer)
