/**
 * Created by endre on 12.10.15.
 */
'use strict';

var HeightMapBufferGeometry = function(heightData, widthSegments, depthSegments, maxHeight) {

    if (maxHeight === undefined) {
        maxHeight = 255;
    }

    // Create the mesh as a 1 x 1 mesh, each cell is (1/widthSegments) x (1/depthSegments).
    THREE.PlaneBufferGeometry.call(this, 1, 1, widthSegments-1, depthSegments-1);

    this.type = 'HeightMapBufferGeometry';
    this.parameters.scale = new THREE.Vector3(1,1,1);

    this.rotateX( - Math.PI / 2 );

    var vertices = this.attributes.position.array;

    for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {

        vertices[ j + 1 ] = heightData[ i ] / maxHeight;

    }

    this.computeVertexNormals();
    this.computeBoundingBox();
    this.computeBoundingSphere();
};

HeightMapBufferGeometry.prototype = Object.create( THREE.PlaneBufferGeometry.prototype );

HeightMapBufferGeometry.prototype.computeVertexIndex = function(xPos, zPos) {
    var widthVertices = this.parameters.widthSegments + 1;
    var depthVertices = this.parameters.heightSegments + 1;

    xPos -= this.boundingBox.min.x;
    zPos -= this.boundingBox.min.z;

    xPos = xPos / this.parameters.scale.x;
    zPos = zPos / this.parameters.scale.z;

    if (xPos < 0) {
        xPos = 0;
    } else if (xPos >= 1) {
        xPos = (widthVertices - 1)/widthVertices;
    }

    if (zPos < 0) {
        zPos = 0;
    } else if (zPos >= 1) {
        zPos = (depthVertices - 1)/depthVertices;
    }

    xPos = Math.floor(xPos * widthVertices);
    zPos = Math.floor(zPos * depthVertices);

    return zPos*widthVertices + xPos;
};

HeightMapBufferGeometry.prototype.getHeightAtPoint = function(localPos) {
    var vertexIndex = 3*this.computeVertexIndex(localPos.x, localPos.z);

    return this.attributes.position.array[vertexIndex + 1];
};

HeightMapBufferGeometry.prototype.scale = function(x, y, z) {
    THREE.PlaneBufferGeometry.prototype.scale.call(this, x,y,z);

    this.parameters.scale.set(x,y,z);
};