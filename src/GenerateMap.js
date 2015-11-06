/**
 * Created by Kristoffer on 03/11/2015.
 */
GenerateMap = {}

// Separate what has to do with creating the map and generating textures
// Create a function generateMap that takes all input needed to generate the map, then generates it

GenerateMap.generateHeight = function ( width, height ) {

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

/**
 * Extract pixel values from image elements. Not guaranteed to contain exactly the same values as
 * the image file.
 * @param {HTMLImageElement} domImage an image.
 * @param {string} [pixelComponents='rgba'] the color components to extract
 * @returns {array|Uint8ClampedArray} a color array
 */
GenerateMap.getPixelValues = function (domImage, pixelComponents) {
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

/**
 * @param {Number} count number of positions
 * @param {THREE.Vector3} center where the position be centered about
 * @param {Number} radius the max area
 */
GenerateMap.generateRandomPositions = function (count, center, radius) {
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
