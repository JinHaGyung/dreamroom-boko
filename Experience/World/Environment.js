import * as THREE from "three"
import Experience from "../Experience.js";
import GSAP from "gsap";
import Theme from "../Theme.js";

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;


        this.setSunlight();
    }
    setSunlight(){
        this.sunLight = new THREE.DirectionalLight(0xffffff, 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper)
        this.sunLight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunLight);

        this.ambientlight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(this.ambientlight)
    }
    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLight.color,{
                r:0.17254901960784313,
                g:0.23137254901960785,
                b:0.6862745098039216,
            });
            GSAP.to(this.ambientlight.color,{
                r:0.17254901960784313,
                g:0.23137254901960785,
                b:0.6862745098039216,
            });
            GSAP.to(this.sunLight,{
                intensity:0.78
            });
            GSAP.to(this.ambientlight,{
                intensity:0.78
            });
        }
        else{
            GSAP.to(this.sunLight.color,{
                r:255/255,
                g:255/255,
                b:255/255,
            });
            GSAP.to(this.ambientlight.color,{
                r:255/255,
                g:255/255,
                b:255/255,
            });
            GSAP.to(this.sunLight,{
                intensity:1
            });
            GSAP.to(this.ambientlight,{
                intensity:1
            });
        }

    }
    resize(){
    }
    update(){
    }
}