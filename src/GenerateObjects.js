/**
 * Created by Kristoffer on 03/11/2015.
 */

GenerateObjects = {}

//Move placements of objects here

/////////////////////////////////////////////
//           Billboard grass              //
///////////////////////////////////////////
var spriteTL, spriteTR, spriteBL, spriteBR, spriteC;

var mapC;
var sceneOrtho;

var group;

var grassTextureA = THREE.ImageUtils.loadTexture( "models/2Dbillboard/grass02.png" );
var grassTextureB = THREE.ImageUtils.loadTexture( "models/2Dbillboard/grass01.png" );
var grassTextureC = THREE.ImageUtils.loadTexture( "models/2Dbillboard/grass03.png" );

var materialA = new THREE.SpriteMaterial( { map: grassTextureA} );
var materialB = new THREE.SpriteMaterial( { map: grassTextureB} );
var materialC = new THREE.SpriteMaterial( { map: grassTextureC} );

var palmTexture;
var plantTexture;
var shipTexture;






var amount, radius;

var j;
var models = ['models/palmTrees/palm_straight.obj', 'models/palmTrees/palm_bend.obj',
    'models/palmTrees/palm_dual.obj', 'models/palmTrees/palm_trio.obj',
    'resources/mesh/samples/terrain/plants/tropical_plant2/tropical_plant.obj' ];

GenerateObjects.billboard = function () {

    amount = 300;
    radius = 5500;
    j = 0;

    for ( var a = 0; a < amount; a ++ ) {
        if (j == 3) {
            j = 0;
        }
        var x = radius * (2 * Math.random() - 1);
        var y = radius * (2 * Math.random() - 1);
        var z = radius * (2 * Math.random() - 1);

        material = [materialA.clone(), materialB.clone(), materialC.clone()];

        var sprite = new THREE.Sprite( material[j] );

        sprite.position.set( x, y, z );
        sprite.position.y = groundMesh.getHeightAtPoint(sprite.position) + 100;
        sprite.scale.set(256,256,1.0);

        groundMesh.add(sprite);
        j++;
    }

};


GenerateObjects.ship = function() {

    objectMaterialLoader = new THREE.OBJMTLLoader();

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

            groundMesh.add( object );
        }, onProgress, onError );


};

GenerateObjects.palms3D = function () {
    j = 0;
    amount = 400;
    radius = 100000;

    palmTexture = new THREE.Texture();
    palmTexture.wrapS = palmTexture.wrapT = THREE.RepeatWrapping;

    loader.load( 'resources/textures/samples/terrain/tree/palm_tree/diffuse.png', function ( image ) {
        palmTexture.image = image;
        /*            texture.transparent = true;
         texture.opacity = 0.01;*/
        palmTexture.needsUpdate = true;
    } );

    objectLoader = new THREE.OBJLoader( manager );

    var forest = new THREE.Object3D();

    for(var i = 0; i < amount; i++) {

        if(j === 4) {
            j = 0;
        }
        objectLoader.load( models[j], function ( object ) {

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {

                    child.material = new THREE.MeshLambertMaterial({
                        map:palmTexture, alphaTest: 0.75
                    });
                }
            } );


            bbox = new THREE.Box3().setFromObject(object);
            randx = (radius *(10 * Math.random() - 1))-5000;
            /*randy = (radius *(4 * Math.random() - 1))-5000;*/
            randz = (radius *(10 * Math.random() - 1))-5000;

            object.position.set(randx, 0, randz);
            object.position.y = groundMesh.getHeightAtPoint(object.position);
            /*object.position.y -= bbox.min.y;*/

            object.name = "Palm";

            /*            object.castShadow = true;
             object.receiveShadows = true;*/

            object.scale.set(7,7,7);

            if ((object.position.y > (growthLowerLevel)) && (object.position.y < (growthUpperLevel))) {
                groundMesh.add(object);
            }


        }, onProgress, onError );
        j++;
    }
};

GenerateObjects.plants3D = function () {


    plantTexture = new THREE.Texture();

    objectLoader = new THREE.OBJLoader( manager );
    amount = 30;
    radius = 2000;

    loader.load( 'resources/textures/samples/terrain/plants/tropical_plant2/diffuse.png', function ( image ) {

        plantTexture.image = image;
        plantTexture.needsUpdate = true;

    } );

    for(var i = 0; i < numBoxes; i++) {

        objectLoader.load(models[4], function (object) {

            object.traverse(function (child) {

                if (child instanceof THREE.Mesh) {

                    child.material = new THREE.MeshLambertMaterial({
                        map:plantTexture, alphaTest: 0.75
                    });
                }

            });

            bbox = new THREE.Box3().setFromObject(object);
            randx = radius * (2 * Math.random() - 1);
            randy = radius * (2 * Math.random() - 1);
            randz = radius * (2 * Math.random() - 1);

            object.position.set(randx, randy, randz);
            object.position.y = groundMesh.getHeightAtPoint(object.position);

            object.name = "Tropical plant";

            /*            object.castShadow = true;
             object.receiveShadows = true;*/

            object.scale.set(5,5,5);

            if ((object.position.y > growthLowerLevel) && (object.position.y < growthUpperLevel)) {
                groundMesh.add(object);
            }


        }, onProgress, onError);
        j++;
    }
};
