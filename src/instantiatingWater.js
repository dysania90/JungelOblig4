/**
 * Created by ReidunMarieTennebo on 13.11.2015.
 */

function instantiateWater(light) {

    var waterNormals = new THREE.ImageUtils.loadTexture( 'textures/waternormals.jpg' );
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    var water = new THREE.Water( renderer, camera, scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 	1.0,
        sunDirection: light.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 50.0,
        width: 2000,
        height: 2000,
        widthSegments: 250,
        heightSegments: 400,
        depth: 1500,
        param: 4,
        filterparam: 1
    } );

    var mirrorMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( water.width * 500, water.height * 500 ),
        water.material
    );

    mirrorMesh.add( water );
    mirrorMesh.rotation.x = - Math.PI * 0.5;
    mirrorMesh.position.y += 1000;
    scene.add( mirrorMesh );
}

