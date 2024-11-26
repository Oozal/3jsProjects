import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'

const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl');

console.log(canvas)

const geo = new THREE.SphereGeometry(1,16,16)
const mat = new THREE.MeshNormalMaterial();
mat.flatShading = true;

const sphereMesh = new THREE.Mesh(geo,mat)

scene.add(sphereMesh)

const sizes = 
{
    width : window.innerWidth,
    height : window.innerHeight
}

window.addEventListener('resize',()=>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
})

window.addEventListener('dblclick',()=>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})


const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
scene.add(camera)
camera.position.z = 3



const parameters = {}
parameters.count = 1000
parameters.size = 0.01

const GenerateParticels = ()=>
{
    const geom = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)

    for(let i =0;i<parameters.count;i++)
    {
        const i3 = i*3
        positions[i3+0] = (Math.random()  - 0.5) * 3
        positions[i3+1] = (Math.random() - 0.5) * 3
        positions[i3+2] = (Math.random() - 0.5) * 3
    }
    console.log(positions)
    geom.setAttribute('position',new THREE.BufferAttribute(positions,3))


    const particleMat = new THREE.PointsMaterial({
        size : parameters.size,
        sizeAttenuation : true,
        depthWrite : false,
        blending : THREE.AdditiveBlending
    })

    const points = new THREE.Points(geom,particleMat)
    scene.add(points)
}

GenerateParticels();


const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width,sizes.height)


const controls = new OrbitControls(camera,canvas)
scene.add(controls)
const clock = new THREE.Clock()

function tick()
{
    controls.update()
    window.requestAnimationFrame(tick)
    renderer.render(scene,camera)
}

tick()



