/**
 * Created by Kristoffer on 02/11/2015.
 */
'use strict';

function DayNightCycle() {}

///////////////////////////////////////////////
//                Sunlight                  //
/////////////////////////////////////////////

DayNightCycle.prototype.sunLight = function() {
    var light = new THREE.DirectionalLight(0xf5a914, 2.0); //color of the sun
    var lensFlare;
    var flareColor;
    var textureFlare0;
    this.object3d = light;

    light.name = 'sun';
    light.position.set(10000, 10000, 10000);

    scene.add(light);
    scene.add(new THREE.DirectionalLightHelper(light, 100));

    textureFlare0 = THREE.ImageUtils.loadTexture("textures/solarFlare.png");
    textureFlare0.transparent = true;
    textureFlare0.opacity = 1.0;
    textureFlare0.alphaTest = 0.5;
    textureFlare0.minFilter = THREE.LinearMipMapLinearFilter;
    flareColor = new THREE.Color(0xffaacc);
    lensFlare = new THREE.LensFlare(textureFlare0, 350, 0.0, THREE.AdditiveBlending, flareColor);
    lensFlare.add(textureFlare0, 60, 0.6, THREE.AdditiveBlending);
    lensFlare.add(textureFlare0, 70, 0.7, THREE.AdditiveBlending);
    lensFlare.add(textureFlare0, 120, 0.9, THREE.AdditiveBlending);
    lensFlare.add(textureFlare0, 70, 1.0, THREE.AdditiveBlending);
    lensFlare.position.set(light.position.x, light.position.y, light.position.z);
    scene.add(lensFlare);

    this.update	= function(sunAngle) {
        light.position.x = 0;
        light.position.y = Math.sin(sunAngle) * 10000;
        light.position.z = -Math.cos(sunAngle) * 10000;

    }
};

/////////////////////////////////////////////
//                 Skybox                 //
///////////////////////////////////////////

DayNightCycle.prototype.skybox = function () {
    var urlPrefix;
    var urls;
    var textureCube;
    var shader;
    var skyBoxMaterial;
    var mat;
    var skyBox;

    urlPrefix = 'textures/';
    urls = [ urlPrefix + 'sea_negx.jpg',
        urlPrefix + 'sea_posx.jpg',
        urlPrefix + 'sea_negy.jpg',
        urlPrefix + 'sea_posy.jpg',
        urlPrefix + 'sea_negz.jpg',
        urlPrefix + 'sea_posz.jpg' ];

    textureCube = THREE.ImageUtils.loadTextureCube(urls);
    textureCube.format = THREE.RGBFormat;
    shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
    shader.uniforms['tCube'].value = textureCube; // apply textures to shader

    // create shader material
    skyBoxMaterial = new THREE.ShaderMaterial({
        fragmentShader : shader.fragmentShader,
        vertexShader : shader.vertexShader,
        uniforms : shader.uniforms,
        depthWrite : false,
        side : THREE.BackSide
    });
    mat = new THREE.MeshBasicMaterial({envMap: textureCube, side: THREE.BackSide});
    // create skybox mesh
    skyBox = new THREE.Mesh(new THREE.BoxGeometry(300000, 400000, 300000), mat);
    skyBox.doubleSided = true;
    groundMesh.add(skyBox);
};

DayNightCycle.prototype.createAmbientLight = function () {
    var ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.name = 'ambientLight';
    return ambientLight;
};