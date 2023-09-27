import * as THREE from "three";

import Debug from "./base/Debug.js";
import RequestAnimation from "./base/RequestAnimation.js";
import Camera from "./base/Camera.js";
import Renderer from "./base/Renderer.js";
import World from "./world/World.js";
import Resources from "./base/Resources.js";

export default class Experience {
    constructor(canvas) {
        window.experience = this;

        this.canvas = canvas;

        this.debug = new Debug();
        this.scene = new THREE.Scene();
        this.requestAnimation = new RequestAnimation();
        this.resources = new Resources();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();

        this.resizeHandler = this.resize.bind(this);
        window.addEventListener("resize", this.resizeHandler);

        this.updateHandler = this.update.bind(this);
        this.requestAnimation.addEventListener("tick", this.updateHandler);
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
        this.world.resize();
    }

    update() {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    destroy() {
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();

                for (const key in child.material) {
                    const value = child.material[key];

                    if (value && typeof value.dispose === "function") {
                        value.dispose();
                    }
                }
            }
        });

        for (let i = this.scene.children.length - 1; i >= 0; i--) {
            this.scene.remove(this.scene.children[i]);
        }

        if (this.camera.controls) {
            this.camera.controls.dispose();
        }
        if (this.renderer.instance) {
            this.renderer.instance.dispose();
        }
        if (this.debug.active) {
            this.debug.ui.destroy();
        }

        window.removeEventListener("resize", this.resizeHandler);
        this.requestAnimation.destroy();
        this.world.destroy();
    }
}
