import Plane from "./Plane";

export default class World {
    constructor() {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.plane = new Plane();

        // Wait for resources
        this.resources.addEventListener("loaded", () => {});
    }

    update() {
        this.plane.update();
    }
}
