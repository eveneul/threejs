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
  // fov: 화각, aspect: 종횡비

  /* 기존에 있는 canvas 태그와 연결 */
  const canvas = document.getElementById('canvas')
  const renderer = new THREE.WebGLRenderer({ canvas })

  /*  HTML과 연결시켜 주기 */
  // document.body.appendChild(renderer.domElement)
  // renderer.render(scene, camera)

  //렌더러 추가
  renderer.setSize(window.innerWidth, window.innerHeight) // 렌더러 사이즈는 화면에 꽉 차게

  // 애니메이션화 적용
  function render(time) {
    time *= 0.001
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
