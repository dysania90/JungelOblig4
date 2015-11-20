'use strict';

function Lava() {}

var particle;
var particles;
var particleCount;
var particleSystem;

Lava.prototype.initiateLava = function(lavaMesh){

    //Create the particle variables
    particleCount=300;
    particles=new THREE.Geometry();
    var particleTexture=THREE.ImageUtils.loadTexture('textures/lavatexture.jpg');
    var pMaterial=new THREE.ParticleBasicMaterial({
        color:0xFFFFFF,
        size:20,
        map:particleTexture,
        blending:THREE.AdditiveBlending,
        transparent:false
    });


    //Now create the individual particles
    for(var p=0;p<particleCount;p++){

        //Create a particle with random
        //position values,-250->250
        var pX= Math.random()*700-350;
        var pY= Math.random()*700-350;
        var pZ= Math.random()*700-350;
        particle=new THREE.Vector3(pX,pY,pZ);

        //create a velocity vector
        particle.velocity=new THREE.Vector3(
            0,//x
            200-Math.random(),//y:randomvel
            0);//z
        //particle.x-=300;
        //particle.z-=300;
        //Add it to the geometry
        particles.vertices.push(particle);
    }

    //Createtheparticlesystem
    particleSystem=new THREE.Points(particles,pMaterial);
    particleSystem.sortParticles=true;

    //Add it to the scene
    lavaMesh.add(particleSystem);

    window.addEventListener('resize',onWindowResize,false);
};

//animation loop
Lava.prototype.updateRain = function() {
    var pCount;

    //add some rotation to the system
    //particleSystem.rotation.y+=0.01;
    pCount=particleCount;
    while(pCount--){

        //get the particle
        particle = particles.vertices[pCount];

        //check if we need to reset
        if(particle.y<-200){
            particle.y=200;
            particle.velocity.y=0;
        }
        particleSystem.rotation.y +=0.0001;
        //update the velocity with
        //a splat of randomniz
       // particle.velocity.y-=Math.random()*.1;

        //and the position
        //particle.addSelf(particle.velocity);
        //particle.y += particle.velocity.y;
    }
    //kommentar

    //flag to the particle system
    //that we've changed its vertices.
    particleSystem.geometry.__dirtyVertices=true;

    //draw
    renderer.render(scene,camera);
};
