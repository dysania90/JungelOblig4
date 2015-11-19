/**
 * Created by Kristoffer on 02/11/2015.
 */
DayNightCycle = {};

///////////////////////////////////////////////
//          Sunlight and movement           //
/////////////////////////////////////////////

DayNightCycle.sunLight = function() {
    var light = new THREE.DirectionalLight(0xf5a914, 2.0); //color of the sun
    this.object3d = light;

    this.update	= function(sunAngle) {
        light.position.x = 0;
        light.position.y = Math.sin(sunAngle) * 10000;
        light.position.z = -Math.cos(sunAngle) * 10000;

    }
};

/////////////////////////////////////////////
//                 Skybox                 //
///////////////////////////////////////////

DayNightCycle.skybox = function () {
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