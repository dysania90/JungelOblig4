/* Created by Kristoffer on 03/11/2015. */
'use strict';

function GenerateTexture() {}

var groundMesh;

GenerateTexture.prototype.terrain = function(generateMap) {
    var groundMapImage;
    var groundData;
    var groundGeometry;
    var groundTexture;

    groundMapImage = document.getElementById('groundmap');
    groundData = generateMap.getPixelValues(groundMapImage, 'r');
    worldWidth = groundMapImage.width;
    worldHeight = groundMapImage.height;
    worldHalfWidth = Math.floor(worldWidth / 2);
    worldHalfHeight = Math.floor(worldHeight / 2);
    groundGeometry = new HeightMapBufferGeometry(groundData, worldWidth, worldHeight);
    groundGeometry.scale(50*worldWidth, 4500, 50*worldHeight);
    groundTexture = THREE.ImageUtils.loadTexture( "textures/groundDirtTexture.jpg" );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 256, 256 );
    groundTexture.magFilter = THREE.NearestFilter;
    groundTexture.minFilter = THREE.LinearMipMapLinearFilter;
    groundMesh = new HeightMapMesh( groundGeometry,  new THREE.MeshLambertMaterial( { map: groundTexture } ));
    groundMesh.name = "terrain";
    groundMesh.receiveShadow = true;
    scene.add( groundMesh );
};

GenerateTexture.prototype.mountain = function(generateMap) {
    var mountainMapImage;
    var mountainData;
    var mountainGeometry;
    var mountainTexture;
    var mountainMesh;

    mountainMapImage = document.getElementById('mountainmap');
    mountainData = generateMap.getPixelValues(mountainMapImage, 'r');
    mountainGeometry = new HeightMapBufferGeometry(mountainData, worldWidth, worldHeight);
    mountainGeometry.scale(50*worldWidth, 4500, 50*worldHeight);
    mountainTexture = THREE.ImageUtils.loadTexture( "textures/mountainTexture.jpg" );
    mountainTexture.wrapS = mountainTexture.wrapT = THREE.RepeatWrapping;
    mountainTexture.repeat.set( 64, 64 );
    mountainTexture.magFilter = THREE.NearestFilter;
    mountainTexture.minFilter = THREE.LinearMipMapLinearFilter;
    mountainMesh = new HeightMapMesh( mountainGeometry, new THREE.MeshLambertMaterial({ map: mountainTexture }));
    mountainMesh.name = "mountain";
    mountainMesh.receiveShadow = true;
    groundMesh.add(mountainMesh);
};

GenerateTexture.prototype.lava = function() {
    var lavaTexture;
    var lavaGeometry;
    var lavaMesh;

    lavaTexture = THREE.ImageUtils.loadTexture( "textures/lavaTexture.jpg" );
    lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping;
    lavaGeometry = new THREE.CircleGeometry(700, 1000);
    lavaMesh = new THREE.Mesh(lavaGeometry,new THREE.MeshLambertMaterial({side: THREE.DoubleSide, map: lavaTexture}));
    lavaMesh.position.set(2457, 3118, -7502);
    lavaMesh.rotation.x = - Math.PI /2;
    lavaMesh.name = "lava";
    return lavaMesh;
};

GenerateTexture.prototype.beach = function(generateMap) {
    var beachMapImage;
    var beachData;
    var beachGeometry;
    var beachTexture;
    var beachMesh;

    beachMapImage = document.getElementById('beachmap');
    beachData = generateMap.getPixelValues(beachMapImage, 'r');
    beachGeometry = new HeightMapBufferGeometry(beachData, worldWidth, worldHeight);
    beachGeometry.scale(50*worldWidth, 4500, 50*worldHeight);
    beachTexture = THREE.ImageUtils.loadTexture( "textures/beachTexture.jpg" );
    beachTexture.wrapS = beachTexture.wrapT = THREE.RepeatWrapping;
    beachTexture.repeat.set( 64, 64 );
    beachTexture.magFilter = THREE.NearestFilter;
    beachTexture.minFilter = THREE.LinearMipMapLinearFilter;
    beachMesh = new HeightMapMesh( beachGeometry, new THREE.MeshLambertMaterial({ map: beachTexture }));
    beachMesh.name = "beach";
    beachMesh.receiveShadow = true;
    scene.add(beachMesh);
};

GenerateTexture.prototype.water = function(ambientLight) {
    var waterNormals;
    var waterMesh;
    var parameters = {
        width: 2000,
        height: 2000,
        widthSegments: 250,
        heightSegments: 250,
        depth: 1500,
        param: 4,
        filterparam: 1
    };

    waterNormals = new THREE.ImageUtils.loadTexture( 'textures/waternormals.jpg' );
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    water = new THREE.Water( renderer, camera, scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 1.0,
        sunDirection:  ambientLight.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 50.0
    });
    waterMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(parameters.width * 500, parameters.height * 500),
        water.material
    );
    water.opacity = 0.5;
    waterMesh.add( water );
    waterMesh.rotation.x = - Math.PI * 0.5;
    waterMesh.position.y += 70;
    waterMesh.name = "water";
    waterMesh.receiveShadow = true;
    growthLowerLevel = waterMesh.position.y + 120;
    growthUpperLevel = 1241;
    scene.add(waterMesh);
};