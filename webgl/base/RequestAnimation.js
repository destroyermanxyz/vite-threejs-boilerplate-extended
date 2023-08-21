import Stats from "stats.js";
import * as THREE from "three";

export default class Time extends EventTarget {
    constructor() {
        super();

        this.clock = new THREE.Clock();
        this.previousTime = 0;

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                this.clock.stop();
            } else {
                this.clock.start();
            }
        });

        window.requestAnimationFrame(() => {
            this.tick();
        });
    }

    tick() {
        this.stats.begin();

        this.elapsedTime = this.clock.getElapsedTime();
        this.deltaTime = this.elapsedTime - this.previousTime;
        this.previousTime = this.elapsedTime;

        this.dispatchEvent(new Event("tick"));

        this.stats.end();
        window.requestAnimationFrame(() => this.tick());
    }
}
