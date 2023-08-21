import * as THREE from "three";
import vertex from "../shaders/vertex.glsl?raw";
import fragment from "../shaders/fragment.glsl?raw";

export default class Plane {
    constructor() {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.requestAnimation = this.experience.requestAnimation;

        this.setInstance();
        this.update();
    }
    setInstance() {
        this.instance = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1, 1, 1),
            new THREE.ShaderMaterial({
                vertexShader: vertex,
                fragmentShader: fragment,
                uniforms: {
                    uTime: { value: 0.0 },
                    // uResolution: { value: new THREE.Vector4() },
                },
                side: THREE.DoubleSide,
                // wireframe: true
            })
        );

        this.scene.add(this.instance);
    }

    update() {
        this.instance.material.uniforms.uTime.value =
            this.requestAnimation.elapsedTime;
    }
}
