import * as THREE from 'three'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded',
    lightColor: '#ffeded',
}

gui
    .addColor(parameters, 'materialColor')
    gui.addColor(parameters,'lightColor')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test cube
 */
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

const material = new THREE.MeshToonMaterial(
    {color: parameters.materialColor,
    gradientMap: gradientTexture

    }
)

const objectDist = 4

const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1,0.4,16,60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1,2,32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8,0.35,100,16),
    material
)

mesh1.position.y = -objectDist *0
mesh2.position.y = -objectDist *1
mesh3.position.y = -objectDist *2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2


scene.add(mesh1, mesh2, mesh3)

const meshes = [mesh1,mesh2,mesh3]

const directionalLight = new THREE.DirectionalLight(parameters.lightColor,2)
scene.add(directionalLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera

const camGroup = new THREE.Group()

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
camGroup.add(camera)
scene.add(camGroup)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 * 

*/

let scrollY = window.scrollY;

window.addEventListener('scroll',()=>
{
    scrollY = window.scrollY;
})

let cursorpos = {};
cursorpos.x =0;
cursorpos.y =0;

window.addEventListener('mousemove',(event)=>
{
    let x = ((event.clientX/sizes.width)-1)*2
    let y = ((event.clientY/sizes.height)-1) * 2
    cursorpos.x = x;
    cursorpos.y = y;
})

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    for(const mesh of meshes)
    {
        mesh.rotation.x = elapsedTime *0.1 * Math.PI
        mesh.rotation.y = -elapsedTime *0.15 * Math.PI
    }

    camera.position.y = -(scrollY/sizes.height) * objectDist

    // camGroup.position.x = cursorpos.x * 0.5;
    // camGroup.position.y = -cursorpos.y* 0.5;

    camera.rotation.y = cursorpos.x * Math.PI * 0.01
    camera.rotation.x = cursorpos.y * Math.PI * 0.01
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()