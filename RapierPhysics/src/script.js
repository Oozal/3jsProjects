import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import RAPIER from '@dimforge/rapier3d-compat'


await RAPIER.init()
/**
 * Debug
 */
const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const world = new RAPIER.World({x:0,y:-9.8,z:0})

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

/**
 * Test sphere
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
sphere.castShadow = true
sphere.position.y = 3
scene.add(sphere)

//adding a sphere rigidbody to rapier world

const sphereBody = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(0,3,0))
const sphereCollider = RAPIER.ColliderDesc.ball(0.5).setRestitution(0.9)
world.createCollider(sphereCollider,sphereBody)


const boxGeom = new THREE.BoxGeometry(1,1,1,2,2,2)

const boxMat = new THREE.MeshStandardMaterial(
    {
        color:"red"
    }
)
const boxMesh = new THREE.Mesh(boxGeom,boxMat)
boxMesh.castShadow = true
boxMesh.position.y = 3
boxMesh.position.x = 1
boxMesh.rotation.z = 45
scene.add(boxMesh)

const boxRigidBody = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(1,3,0))
const boxCollider = RAPIER.ColliderDesc.cuboid(0.5,0.5,0.5).setRestitution(0.9)
world.createCollider(boxCollider,boxRigidBody)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

const floorBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed())
const floorCollider = RAPIER.ColliderDesc.cuboid(5,0.01,5).setRestitution(0.9)
world.createCollider(floorCollider,floorBody)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(- 3, 3, 3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let delta
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    delta = clock.getDelta()

    //simulating physics
    //world.timestep = Math.min(delta, 0.1)
    world.step()

    sphere.position.copy(sphereBody.translation())
    boxMesh.position.copy(boxRigidBody.translation())
    boxMesh.rotation.copy(boxRigidBody.rotation())
    console.log(sphereBody.translation())
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()