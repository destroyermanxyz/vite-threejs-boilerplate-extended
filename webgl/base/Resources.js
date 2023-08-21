import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import sources from "../sources";

export default class Resources extends EventTarget {
    constructor() {
        super();

        this.sources = sources;

        if (sources === null) return;

        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    }

    startLoading() {
        // Load each source
        for (const source of this.sources) {
            if (source.type === "gltfModel") {
                this.loaders.gltfLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                });
            } else if (source.type === "texture") {
                this.loaders.textureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                });
            } else if (source.type === "cubeTexture") {
                this.loaders.cubeTextureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                });
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;

        this.manager.onLoad = () => {
            this.dispatchEvent(new Event("loaded"));
        };

        this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            let progressState = itemsLoaded / itemsTotal;
            progressState = Math.round(progressState * 100);
            document.querySelector(".loader").innerHTML = progressState + "%";
            // console.log(progressState);
        };
    }
}
