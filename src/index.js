import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // scene 만들기
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x004fff)

  // 카메라 만들기
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  const canvas = document.getElementById('canvas')
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  // material

  const geometry = new THREE.BoxGeometry(1, 1, 1) // 도형 생성
  const material = new THREE.MeshStandardMaterial({
    color: 0x999999,
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  camera.position.z = 3

  // 애니메이션화 적용
  function render(time) {
    time *= 0.001
    cube.rotation.x = time
    cube.rotation.y = time
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 반응형처리

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    // 변경된 카메라값 업데이트, 카메라 속성 변경 후 반드시 호출

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', handleResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
