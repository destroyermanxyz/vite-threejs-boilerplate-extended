import Box from "./Box";

export default class World {
    constructor() {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.experience.world = this;
        this.box = new Box();

        // Wait for resources
        this.resources.addEventListener("resourcesLoaded", (e) => {
            console.log(e.detail); // take items from resources.js
        });
    }

    resize() {}

    update() {
        this.box.update();
    }

    destroy() {}
}
