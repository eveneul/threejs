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

  // 도넛 생성

  const torusGeometry1 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const torusGeometry2 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const torusGeometry3 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const torusGeometry4 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const torusGeometry5 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)

  const meterial = new THREE.MeshStandardMaterial({ color: '#ff7f00' })
  const meteria2 = new THREE.MeshPhysicalMaterial({
    color: '#ff7f00',
    clearcoat: 1,
    clearcoatRoughness: 0.3,
  })
  const toru1 = new THREE.Mesh(torusGeometry1, meterial)
  const toru2 = new THREE.Mesh(torusGeometry2, meteria2)
  const toru3 = new THREE.Mesh(torusGeometry3, meterial)
  const toru4 = new THREE.Mesh(torusGeometry4, meterial)
  const toru5 = new THREE.Mesh(torusGeometry5, meterial)
  camera.position.z = 3

  toru1.position.x = -2
  toru2.position.x = -1
  toru3.position.x = 0
  toru4.position.x = 1
  toru5.position.x = 2

  // light
  const pointLight = new THREE.PointLight('#fff', 1)
  pointLight.position.set(0, 2, 12)

  scene.add(toru1, toru2, toru3, toru4, toru5, pointLight)

  // 애니메이션화 적용
  function render(time) {
    time *= 0.001
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
