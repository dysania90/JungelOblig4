/**
 * Created by Kristoffer on 03/11/2015.
 */

GenerateObjects = {}

/////////////////////////////////////////////
//           Billboard grass              //
///////////////////////////////////////////

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

//Make function to add objects easier