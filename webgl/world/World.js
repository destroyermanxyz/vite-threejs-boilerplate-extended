import Plane from "./Plane";

export default class World {
    constructor() {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.plane = new Plane();

        // Wait for resources
        this.resources.addEventListener("resourcesLoaded", (e) => {
            console.log(e.detail); // take items from resources.js
        });
    }

    resize() {}

    update() {
        this.plane.update();
    }

    destroy() {}
}
