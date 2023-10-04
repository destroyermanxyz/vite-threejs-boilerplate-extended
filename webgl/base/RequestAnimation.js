import Stats from "stats.js";

export default class Time extends EventTarget {
    constructor() {
        super();

        this.previousTime = 0;

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);

        this.tick = this.tick.bind(this);
        this.myReq = requestAnimationFrame(this.tick);
    }

    tick(t) {
        this.stats.begin();

        this.elapsedTime = t / 1000;
        this.deltaTime = this.elapsedTime - this.previousTime;
        this.previousTime = this.elapsedTime;

        this.dispatchEvent(new Event("tick"));

        console.log("tick");

        this.stats.end();
        this.myReq = requestAnimationFrame(this.tick);
    }

    destroy() {
        cancelAnimationFrame(this.myReq);
    }
}
