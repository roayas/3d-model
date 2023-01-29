import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z = 500
scene.add(camera)

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

var spotLight = new THREE.SpotLight( 0xffffff )
spotLight.position.set(-40,-600,100)
scene.add(spotLight)
const modelLh = new THREE.Object3D( );
gltfLoader.load(
    'car.glb',
    (gltf) =>
    {
        
        modelLh.add( gltf.scene ); // this gltf.scene is centered 
        modelLh.scale.set( 1.4, 1.4, 1.4 ); // because gltf.scene is big
        modelLh.position.set( -380, -0.99, -18 );
        scene.add( modelLh );
    }
)



const cursor ={x:0, y:0}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.9
    cursor.y = -( event.clientY / sizes.width - 0.9)
})


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor("#e5e5e5");
const controls = new OrbitControls(camera, canvas)



window.addEventListener('dblclick',() =>
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


window.addEventListener('resize', () => 
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()    

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})
const animate = () =>
{

    renderer.render(scene, camera)
    controls.update()

    window.requestAnimationFrame(animate)
}

animate()