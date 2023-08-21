import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    constructor() {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.setInstance();
        this.setControls();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        this.instance.position.set(0, 0, 1);
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }

    resize() {
        this.instance.aspect = window.innerWidth / window.innerHeight;
        this.instance.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}
