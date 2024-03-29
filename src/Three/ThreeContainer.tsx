import React, { Component } from 'react'
import 'three/examples/js/loaders/PCDLoader'
import data from '../data/Zaghetto.pcd'

declare var THREE: any

class ThreeContainer extends Component {
  private mount: any
  private scene: any
  private camera: any
  private renderer: any
  private frameId: any

  public componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    console.log(width / height)
    const camera = new THREE.PerspectiveCamera(15, width / height, 0.01, 40)
    camera.position.x = 0.4
    camera.position.z = -2
    camera.up.set(0, 0, 1)
    console.log(camera)

    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    // renderer.setClearColor('#000000')
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    this.camera = camera
    this.renderer = renderer

    this.mount.appendChild(this.renderer.domElement)

    const loader = new THREE.PCDLoader()
    loader.load(data, (mesh: any) => {
      scene.add(mesh)
      console.log(mesh)
      console.log(data)
      // const center = mesh.geometry.boundingSphere.center;
    })

    this.scene = scene
    console.log(this.scene)

    this.start()
  }

  public componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  public start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  public stop() {
    cancelAnimationFrame(this.frameId)
  }

  public renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  public animate = () => {
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  public render() {
    return (
      <div
        style={ { width: '1000px', height: '800px' } }
        ref={ (mount) => (this.mount = mount) }
      />
    )
  }
}

export default ThreeContainer
