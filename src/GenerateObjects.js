/*Created by Kristoffer on 03/11/2015.*/
'use strict';

function GenerateObjects () {};


var MODELS = ['models/palmTrees/palm_straight.obj', 'models/palmTrees/palm_bend.obj',
    'models/palmTrees/palm_dual.obj', 'models/palmTrees/palm_trio.obj',
    'resources/mesh/samples/terrain/plants/tropical_plant2/tropical_plant.obj' ];



var grassTextureA = THREE.ImageUtils.loadTexture( "models/2Dbillboard/grass01.png" );
var grassTextureB = THREE.ImageUtils.loadTexture( "models/2Dbillboard/grass02.png" );
var grassTextureC = THREE.ImageUtils.loadTexture( "models/2Dbillboard/grass03.png" );

var grassTextures = [grassTextureA, grassTextureB, grassTextureC];

var radius;
var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
};
var loader = new THREE.ImageLoader( manager );

//////////////////////////////
//      Billboard grass     //
//////////////////////////////

GenerateObjects.prototype.billboard = function (num) {


/*
    var materialA = new THREE.SpriteMaterial( { map: grassTextureA} );
    var materialB = new THREE.SpriteMaterial( { map: grassTextureB} );
    var materialC = new THREE.SpriteMaterial( { map: grassTextureC} );*/

    var amount = 3000;
    var radiusA = 5500;
    var j = 0;

    var totalGeometry = new THREE.Geometry();
    var mat;

    for ( var a = 0; a < amount; a ++ ) {
        if (j == 2) {
            j = 0;
        }
        mat = new THREE.MeshBasicMaterial( { map: grassTextures[num], alphaTest: 0.7, side: THREE.DoubleSide} );

        var x = radiusA * (2 * Math.random() - 1);
        var y = radiusA * (2 * Math.random() - 1);
        var z = radiusA * (2 * Math.random() - 1);

/*        var material = [materialA.clone(), materialB.clone(), materialC.clone()];

        var sprite = new THREE.Sprite( material[j] );*/


        var geom = new THREE.PlaneGeometry( 300, 300 );
        var mesh = new THREE.Mesh( geom, mat );

        mesh.position.set( x, y, z );
        mesh.position.y = groundMesh.getHeightAtPoint(mesh.position) + 100;

        var mesh2 = new THREE.Mesh(geom, mat);
        mesh2.position.set(x,mesh.position.y,z);
        mesh2.rotation.y =- Math.PI * 0.5;

        mesh.updateMatrix();
        mesh2.updateMatrix();

        totalGeometry.merge(mesh.geometry, mesh.matrix);
        totalGeometry.merge(mesh2.geometry, mesh2.matrix);


        j++;
    }
    var total = new THREE.Mesh(totalGeometry, mat);
    groundMesh.add(total);

};

///////////////////////
//     3D Ship      //
/////////////////////

GenerateObjects.prototype.ship = function() {

    var objectMaterialLoader = new THREE.OBJMTLLoader();

    objectMaterialLoader.load(
        'models/pirate-ship-large-obj/pirate-ship-large.obj',
        'models/pirate-ship-large-obj/pirate-ship-large.mtl',
        function setUpShip( object ) {
            // Custom function to handle what's supposed to happen once we've loaded the model
            object.scale.set(2000, 2000, 2000);

            var bbox = new THREE.Box3().setFromObject(object);

            object.position.set(45000, 0, 1000);
            object.rotation.y = 45;
            object.position.y = groundMesh.getHeightAtPoint(object.position);

            // We should know where the bottom of our object is
            object.position.y -= bbox.min.y;

            object.name = "Ship";

            if(shadowsEnabled) {
                object.castShadow = true;
            }

            groundMesh.add( object );
        }, onProgress, onError );


};

GenerateObjects.prototype.palms3D = function () {
    var j = 0;
    var amount = 400;
    radius = 100000;

    var palmTexture = new THREE.Texture();
    palmTexture.wrapS = palmTexture.wrapT = THREE.RepeatWrapping;

    loader.load( 'resources/textures/samples/terrain/tree/palm_tree/diffuse.png', function ( image ) {
        palmTexture.image = image;
        palmTexture.needsUpdate = true;
    } );

    var objectLoader = new THREE.OBJLoader( manager );

    for(var i = 0; i < amount; i++) {

        if(j === 4) {
            j = 0;
        }
        objectLoader.load( MODELS[j], function ( object ) {

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {

                    child.material = new THREE.MeshLambertMaterial({
                        map:palmTexture, alphaTest: 0.75
                    });
                    child.castShadow = true;

                }
            } );

            var randx = (radius *(10 * Math.random() - 1))-5000;
            var randz = (radius *(10 * Math.random() - 1))-5000;

            object.position.set(randx, 0, randz);
            object.position.y = groundMesh.getHeightAtPoint(object.position);

            object.name = "Palm";

            if(shadowsEnabled) {
                object.castShadow = true;
            }

            object.scale.set(7,7,7);


            if ((object.position.y > (growthLowerLevel)) && (object.position.y < (growthUpperLevel))) {
                groundMesh.add(object);
            }
        }, onProgress, onError );
        j++;
    }
};

GenerateObjects.prototype.plants3D = function () {


    var plantTexture = new THREE.Texture();

    var objectLoader = new THREE.OBJLoader( manager );
    var amount = 30;
    radius = 2000;

    loader.load( 'resources/textures/samples/terrain/plants/tropical_plant2/diffuse.png', function ( image ) {

        plantTexture.image = image;
        plantTexture.needsUpdate = true;

    } );

    for(var i = 0; i < amount; i++) {

        objectLoader.load(MODELS[4], function (object) {

            object.traverse(function (child) {

                if (child instanceof THREE.Mesh) {

                    child.material = new THREE.MeshLambertMaterial({
                        map:plantTexture, alphaTest: 0.75
                    });
                    child.castShadow = true;
                }
            });

            var randx = radius * (2 * Math.random() - 1);
            var randy = radius * (2 * Math.random() - 1);
            var randz = radius * (2 * Math.random() - 1);

            object.position.set(randx, randy, randz);
            object.position.y = groundMesh.getHeightAtPoint(object.position);
            object.name = "Tropical plant";

            if(shadowsEnabled) {
                object.castShadow = true;
            }

            object.scale.set(5,5,5);

            if ((object.position.y > growthLowerLevel) && (object.position.y < growthUpperLevel)) {
                groundMesh.add(object);
            }
        }, onProgress, onError);
    }
};
