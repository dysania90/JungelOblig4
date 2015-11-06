/**
 * Created by Kristoffer on 03/11/2015.
 */

var worldWidth = 512, worldDepth = 512,
    worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

//
// Height map generation/extraction
//

function generateMap () {

var useRandomHeightMap = false;

if (useRandomHeightMap) {
    terrainData = generateHeight( worldWidth, worldDepth );
} else {
    var heightMapImage = document.getElementById('heightmap');
    terrainData = getPixelValues(heightMapImage, 'r');
    worldWidth = heightMapImage.width;
    worldDepth = heightMapImage.height;
    worldHalfWidth = Math.floor(worldWidth / 2);
    worldHalfDepth = Math.floor(worldDepth / 2);
}
var waterMapImage = document.getElementById('watermap');
waterData = getPixelValues(waterMapImage, 'r');

// Not required to use the generated texture
terrainTexture = new THREE.CanvasTexture( generateTexture( terrainData, worldWidth, worldDepth ) );
terrainTexture.wrapS = THREE.ClampToEdgeWrapping;
terrainTexture.wrapT = THREE.ClampToEdgeWrapping;

//
// Generate terrain geometry and mesh


var heightMapGeometry = new HeightMapBufferGeometry(terrainData, worldWidth, worldDepth);
// We scale the geometry to avoid scaling the node, since scales propagate.
heightMapGeometry.scale(50*worldWidth, 1000, 50*worldDepth);

var dirtroadGeometry = new HeightMapBufferGeometry(terrainData, worldWidth, worldDepth);
dirtroadGeometry.scale(40*worldWidth, 1000, 40*worldDepth);


terrainMesh = new HeightMapMesh( heightMapGeometry, new THREE.MeshLambertMaterial( { map: groundtexture } ) );
terrainMesh.name = "terrain";

scene.add( terrainMesh );

var waterGeometry = new HeightMapBufferGeometry(waterData, worldWidth, worldDepth);
waterGeometry.scale(50*worldWidth, 1000, 50*worldDepth);

waterMesh = new HeightMapMesh(waterGeometry, new THREE.MeshLambertMaterial({ map: watertexture}));
waterMesh.name = "water";

waterMesh.position.y -= 976;
var waterLevel = waterMesh.position.y + 976;
/*        for(var i = 0; i <terrainData.length; i++) {
 if(terrainData[])
 }*/
/*        dirtroadMesh = new HeightMapMesh( dirtroadGeometry, new THREE.MeshBasicMaterial( { map: dirtroadtexture } ) );
 dirtroadMesh.name = "dirtroad";
 scene.add(dirtroadMesh);*/

}

function generateHeight( width, height ) {

    var size = width * height, data = new Uint8Array( size ),
        perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;

    for ( var j = 0; j < 4; j ++ ) {

        for ( var i = 0; i < size; i ++ ) {

            var x = i % width, y = ~~ ( i / width );
            data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

        }

        quality *= 5;

    }

    return data;

}

function getPixelValues(domImage, pixelComponents) {
    "use strict";
    var canvas = document.createElement('canvas');
    canvas.width = domImage.width;
    canvas.height = domImage.height;

    var context2d = canvas.getContext('2d');
    context2d.drawImage(domImage, 0, 0, domImage.width, domImage.height);

    var imageData = context2d.getImageData(0, 0, domImage.width, domImage.height);

    var componentExtractor = [];

    if (pixelComponents === undefined) {
        pixelComponents = 'rgba';
    }

    if (pixelComponents === 'r') { // Could extend this to other kinds of component extractors (eg. 'g', 'b','rb')
        componentExtractor = [0];
    } else if (pixelComponents === 'rg') {
        componentExtractor = [0,1];
    } else if (pixelComponents === 'rgb') {
        componentExtractor = [0,1,2];
    }else if (pixelComponents === 'rgba') {
        componentExtractor = [0,1,2,3];
        // return imageData.data;
    } else {
        console.error("unknown color component type");
        return [];
    }

    var imageSize = imageData.height * imageData.width;
    console.log(imageSize, imageData.data.length, imageData.data.length/4);
    var numComponents = componentExtractor.length;

    var pixelData = new Uint8ClampedArray(imageSize * numComponents);

    for (var i= 0, i4 = 0; i < imageSize; i++, i4 += 4) {
        for (var componentIdx = 0; componentIdx < numComponents; componentIdx++) {
            pixelData[i*numComponents + componentIdx] = imageData.data[i4 + componentExtractor[componentIdx]];
        }
    }

    return pixelData;
}

