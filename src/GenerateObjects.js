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

GenerateObjects.billboard = function () {


    var amount = 300;
    var radius = 5500;
    var j = 0;
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

GenerateObjects.palms2D = function () {
    spriteModels = ["resources/textures/samples/terrain/tree/palm_tree/palm_straight2.png",
        "resources/textures/samples/terrain/tree/palm_tree/palm_dual.png",
        "resources/textures/samples/terrain/tree/palm_tree/palm_bend.png",
        "resources/textures/samples/terrain/tree/palm_tree/palm_bend_dual.png",
        "resources/textures/samples/terrain/tree/palm_tree/palm_trio.png"
    ];

    spriteGeom = new THREE.Geometry();


    for(var i = 0; i < numBoxes; i++) {

        spriteTexture = THREE.ImageUtils.loadTexture( spriteModels[0] );
        spriteTexture.minFilter = THREE.NearestFilter;
        if(j === 4) {
            j = 0;
        }

        radius = 800;
        randx = radius * (2 * Math.random() - 1);
        randy = radius * (2 * Math.random() - 1);
        randz = radius * (2 * Math.random() - 1);


        palmSprite = new THREE.PointsMaterial({
            size: 1000,
            sizeAttenuation: true,
            map: spriteTexture,
            transparent: true,
            color: 0XFFFFFF
        });

        var kk = new THREE.Vector3(randx,groundMesh.getHeightAtPoint(customBox2), randz);
        spriteGeom.vertices.push(kk);
        myPalm = new THREE.Points(spriteGeom, palmSprite);
        myPalm.sortParticles = true;

        customBox2.add(myPalm);

        j++;
    }
    //myPalm.position.set(100, terrainMesh.getHeightAtPoint(myPalm.position), 100);
    /*        groundMesh.add(palmSprite);
     palmSprite.position.set()*/
};

GenerateObjects.palms3D = function () {

    loader.load( 'resources/textures/samples/terrain/tree/palm_tree/diffuse.png', function ( image ) {
        palmTexture.image = image;
        /*            texture.transparent = true;
         texture.opacity = 0.01;*/
        palmTexture.needsUpdate = true;
    } );


    objectLoader = new THREE.OBJLoader( manager );

    models = ['models/palmTrees/palm_straight.obj', 'models/palmTrees/palm_bend.obj',
        'models/palmTrees/palm_dual.obj', 'models/palmTrees/palm_trio.obj',
        'resources/mesh/samples/terrain/plants/tropical_plant2/tropical_plant.obj' ];

    j = 0;

    for(var i = 0; i < numBoxes; i++) {

        if(j === 4) {
            j = 0;
        }
        objectLoader.load( models[j], function ( object ) {

            object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {

                    child.material.map = palmTexture;

                }

            } );


            bbox = new THREE.Box3().setFromObject(object);
            randx = radius * (2*Math.random() - 1);
            randy = radius * (2*Math.random() - 1);
            randz = radius * (2*Math.random() - 1);

            object.position.set(randx, randy, randz);
            object.position.y = groundMesh.getHeightAtPoint(object.position);
            /*object.position.y -= bbox.min.y;*/
            object.castShadow = true;
            object.receiveShadows = true;
            object.transparent = true;
            object.opacity = 0.01;

            object.name = "Palm";
            object.boundingBox = bbox;

            if(object.position.y > (waterLevel + 70)) {
                groundMesh.add(object);
            }


        }, onProgress, onError );
        j++;
    }
};

GenerateObjects.plants3D = function () {

    objectLoader = new THREE.OBJLoader( manager );

    loader.load( 'resources/textures/samples/terrain/plants/tropical_plant2/diffuse.png', function ( image ) {

        plantTexture.image = image;
        plantTexture.needsUpdate = true;

    } );

    for(var i = 0; i < numBoxes; i++) {

        objectLoader.load(models[4], function (object) {

            object.traverse(function (child) {

                if (child instanceof THREE.Mesh) {

                    child.material.map = plantTexture;

                }

            });

            bbox = new THREE.Box3().setFromObject(object);
            randx = radius * (2 * Math.random() - 1);
            randy = radius * (2 * Math.random() - 1);
            randz = radius * (2 * Math.random() - 1);

            object.position.set(randx, randy, randz);
            object.position.y = groundMesh.getHeightAtPoint(object.position);
            /*object.position.y -= bbox.min.y;*/

            object.name = "Tropical plant";

            object.castShadow = true;
            object.receiveShadows = true;

            if (object.position.y > (waterLevel + 70)) {
                groundMesh.add(object);
            }


        }, onProgress, onError);
        j++;
    }
};

//Make function to add objects easier