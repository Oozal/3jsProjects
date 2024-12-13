import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import testVertexShader from "./Shaders/VertexShader.glsl"
import testFragmentShader from "./Shaders/FragmentShader.glsl"

const canvas = document.querySelector("canvas.webgl")
console.log(canvas)

const scene = new THREE.Scene()

const planeMat = new THREE.RawShaderMaterial(
    {
        vertexShader: testVertexShader,
        fragmentShader:testFragmentShader,
        uniforms :
        {
            uTime : {value : 0}
        }
    }
)

const planeGeo = new THREE.PlaneGeometry(1,1,40,40)

        
console.log(planeGeo);
let numVertices = planeGeo.attributes.position.count;
let aRandom = new Float32Array(numVertices);

for(let i=0;i<numVertices;i++)
{
    aRandom[i] = Math.random()
}
planeGeo.setAttribute('aRandom', new THREE.BufferAttribute(aRandom,1))


const planeMesh = new THREE.Mesh(planeGeo, planeMat);
scene.add(planeMesh)


const camSize =
{
    width : window.innerWidth,
    height : window.innerHeight
}

window.addEventListener('resize',()=>
{
    camSize.width = window.innerWidth
    camSize.height = window.innerHeight

    camera.aspect = camSize.width/camSize.height
    camera.updateProjectionMatrix()
})

const camera = new THREE.PerspectiveCamera(45,camSize.width/camSize.height);
camera.position.z = 3
scene.add(camera)

const control = new OrbitControls(camera, canvas)
control.enableDamping = true
control.dampingFactor = 0.4

const renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas
    }
)

const clock = new THREE.Clock()
let elapsedTime = 0;
const Update = ()=>
{
    elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)
    planeMat.uniforms.uTime.value = elapsedTime; 
    window.requestAnimationFrame(Update)
    control.update()

    renderer.setSize(camSize.width, camSize.height)
    renderer.render(scene, camera)

}

Update()


