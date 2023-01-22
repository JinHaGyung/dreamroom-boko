import * as THREE from "three"
import Experience from "../Experience.js";
import GSAP from "gsap";
import { PointLightHelper } from "three/src/helpers/PointLightHelper.js"

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            esae: 0.1
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }
    setModel(){
        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }
            if(child.name === "tank"){
                child.children[0].material = new THREE.MeshPhysicalMaterial({
                    roughness : 0,
                    color: 0x5cc9f7,
                    ior : 3,
                    transmission : 1,
                    opacity : 1,
                })
            }
            if(child.name === "computer"){
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen
                })
            }
            if(child.name === "minifloor"){
                child.position.x = -0.515422;
                child.position.z = 7.25855 
            }
        })
        const pointLight = new THREE.PointLight( 0xf8f2aa, 1, 1.5, 1 );
        pointLight.position.set( 7.3, 13.8 , -2.2  );
        this.actualRoom.add( pointLight );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11,0.11,0.11);
    }
    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0])
        this.swim.play();
    }
    onMouseMove(){
        window.addEventListener("mousemove",(e)=>{
            this.rotation = ((e.clientX - window.innerWidth /2)*2)/window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        })
    }

    resize(){
    }
    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.esae
        );
        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009)
    }
}