/**
 * Created by Kristoffer on 03/11/2015.
 */

function generateObjects () {

for(var i = 0; i < numBoxes; i++) {

    if(j === 4) {
        j = 0;
    }
    objectLoader.load( models[j], function ( object ) {

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

                child.material.map = texture;

            }

        } );

        var bbox = new THREE.Box3().setFromObject(object);
        var randx = radius * (2*Math.random() - 1);
        var randy = radius * (2*Math.random() - 1);
        var randz = radius * (2*Math.random() - 1);

        object.position.set(randx, randy, randz);
        object.position.y = terrainMesh.getHeightAtPoint(object.position);
        /*object.position.y -= bbox.min.y;*/

        object.name = "Palm";

        if(object.position.y > (waterLevel + 70)) {
            terrainMesh.add(object);
        }


    }, onProgress, onError );
    j++;
}

for(var i = 0; i < numBoxes; i++) {

    objectLoader.load( models[4], function ( object ) {

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

                child.material.map = texture2;

            }

        } );

        var bbox = new THREE.Box3().setFromObject(object);
        var randx = radius * (2*Math.random() - 1);
        var randy = radius * (2*Math.random() - 1);
        var randz = radius * (2*Math.random() - 1);

        object.position.set(randx, randy, randz);
        object.position.y = terrainMesh.getHeightAtPoint(object.position);
        /*object.position.y -= bbox.min.y;*/

        object.name = "Tropical plant";

        if(object.position.y > (waterLevel + 70)) {
            terrainMesh.add(object);
        }


    }, onProgress, onError );
    j++;
}

var loader = new THREE.ImageLoader( manager );
loader.load( 'resources/textures/samples/terrain/tree/palm_tree/diffuse.png', function ( image ) {

    texture.image = image;
    texture.needsUpdate = true;

} );

loader.load( 'resources/textures/samples/terrain/plants/tropical_plant2/diffuse.png', function ( image ) {

    texture2.image = image;
    texture2.needsUpdate = true;

} );
}
function generateRandomPositions(count, center, radius) {
    var translationArray = new Float32Array(3 * count);

    var pos = new THREE.Vector3();
    for (var i = 0, i3 = 0; i < count; i++, i3 +=3) {
        // One method to generate random positions
        // TODO: make gauss distributed method, f.ex
        pos.x = radius * (2*Math.random() - 1);
        pos.y = radius * (2*Math.random() - 1);
        pos.z = radius * (2*Math.random() - 1);

        pos.add(center);
        //translationArray[i3 + 0] = pos.x;
        //translationArray[i3 + 1] = pos.y;
        //translationArray[i3 + 2] = pos.z;

        pos.toArray(translationArray, i3);
    }

    return translationArray;
}

/*for(var i = 0; i < numBoxes; i++) {

 objectMaterialLoader.load(
 'models/lowPolyTree/lowpolytree.obj',
 'models/lowPolyTree/lowpolytree.mtl',
 function setUpLowPolyTree( object ) {
 // Custom function to handle what's supposed to happen once we've loaded the model
 object.scale.set(100, 100, 100);

 var bbox = new THREE.Box3().setFromObject(object);
 var randx = radius * (2*Math.random() - 1);
 var randy = radius * (2*Math.random() - 1);
 var randz = radius * (2*Math.random() - 1);

 object.position.set(randx, randy, randz);
 object.position.y = terrainMesh.getHeightAtPoint(object.position);

 // We should know where the bottom of our object is
 object.position.y -= bbox.min.y;

 object.name = "LowPolyTree";

 if(object.position.y > 325 ) {
 terrainMesh.add(object);
 }
 }, onProgress, onError );

 }*/