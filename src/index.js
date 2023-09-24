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

  // 텍스쳐 추가

  const textureLoader = new THREE.TextureLoader()
  const textureBaseColor = textureLoader.load(
    '../public/images/texture/stone-basecolor.jpg'
  )
  const textureNormalColor = textureLoader.load(
    '../public/images/texture/stone-normal.jpg'
  )
  const textureHeightColor = textureLoader.load(
    '../public/images/texture/stone-height.png'
  )
  const textureRoughnessColor = textureLoader.load(
    '../public/images/texture/stone-roughness.jpg'
  )

  console.log(textureRoughnessColor)

  // 구 생성
  const geometry = new THREE.SphereGeometry(0.3, 32, 16)
  const material01 = new THREE.MeshStandardMaterial({ map: textureBaseColor })
  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalColor,
  })
  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalColor, // 그림자 부분을 추가
    displacementMap: textureHeightColor, // 밝고 어두운 부분을 높낮이를 처리
    displacementScale: 0.07,
  })
  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalColor, // 그림자 부분을 추가
    displacementMap: textureHeightColor, // 밝고 어두운 부분을 높낮이를 처리
    displacementScale: 0.07,
    roughnessMap: textureRoughnessColor, // 조금 더 디테일한 질감 처리
    roughness: 1,
  })

  const obj01 = new THREE.Mesh(geometry, material01)
  const obj02 = new THREE.Mesh(geometry, material02)
  const obj03 = new THREE.Mesh(geometry, material03)
  const obj04 = new THREE.Mesh(geometry, material04)

  obj01.position.x = -2
  obj02.position.x = -1
  obj03.position.x = 0
  obj04.position.x = 1

  // light
  const pointLight = new THREE.PointLight('#fff', 1)
  pointLight.position.set(0, 2, 12)

  scene.add(obj01, obj02, obj03, obj04, pointLight)
  camera.position.z = 3

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
