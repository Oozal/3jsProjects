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

const camera = new THREE.PerspectiveCamera(75,800/600);
scene.add(camera)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(800,600)
renderer.render(scene,camera)



