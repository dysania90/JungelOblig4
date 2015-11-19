/**
 * Created by Kristoffer on 06/11/2015.
 */
'use strict';

function MovementAndCamera () {}

var splineCurve;
var splineGeometry;
var splineMaterial;
var splineCurveObject;
var splinePoints = [];

MovementAndCamera.prototype.createSpline = function () {
    splinePoints.push(
        new THREE.Vector3(-6055, 363, 6823),
        new THREE.Vector3(-7410, 473, 4319),
        new THREE.Vector3(-7325, 589, 3384),
        new THREE.Vector3(-6771, 656, 1500),
        new THREE.Vector3(-5361, 819, 622),
        new THREE.Vector3(-3990, 778, -198),
        new THREE.Vector3(-2719, 653, -809),
        new THREE.Vector3(-1539, 639, -821),
        new THREE.Vector3(-1347, 662, -2049),
        new THREE.Vector3(-2146, 780, -2958),
        new THREE.Vector3(-2686, 960, -3308),
        new THREE.Vector3(-3659, 803, -4455),
        new THREE.Vector3(-4422, 910, -4871),
        new THREE.Vector3(-4180, 1090, -6131),
        new THREE.Vector3(-3307, 1362, -6256),
        new THREE.Vector3(-2458, 1626, -5823),
        new THREE.Vector3(-1613, 1953, -5827),
        new THREE.Vector3(-764, 2610, -6107),
        new THREE.Vector3(648, 3272, -7156),
        new THREE.Vector3(1861, 3723, -8148),
        new THREE.Vector3(2692, 3891, -8536),
        new THREE.Vector3(2949, 3908, -8368),
        new THREE.Vector3(3457, 3859, -7789),
        new THREE.Vector3(3831, 3707, -6979),
        new THREE.Vector3(3849, 3536, -6290),
        new THREE.Vector3(3795, 3221, -5594),
        new THREE.Vector3(3224, 2735, -4829),
        new THREE.Vector3(2737, 2335, -4547),
        new THREE.Vector3(1900, 1960, -4115),
        new THREE.Vector3(1538, 1807, -3873),
        new THREE.Vector3(756, 1335, -2933),
        new THREE.Vector3(595, 1126, -2484),
        new THREE.Vector3(419, 955, -1954),
        new THREE.Vector3(-256, 642, -978),
        new THREE.Vector3(-150, 542, -308),
        new THREE.Vector3(950, 609, 83),
        new THREE.Vector3(2206, 633, 380),
        new THREE.Vector3(2581, 639, 683),
        new THREE.Vector3(2868, 570, 1500),
        new THREE.Vector3(3084, 547, 2288),
        new THREE.Vector3(3439, 531, 2883),
        new THREE.Vector3(3836, 500, 3175),
        new THREE.Vector3(4283, 548, 3371),
        new THREE.Vector3(5490, 499, 3630)
    );

    splineCurve = new THREE.CatmullRomCurve3(splinePoints);
    splineGeometry = new THREE.Geometry();
    splineGeometry.vertices = splineCurve.getPoints(200*splinePoints.length);

    splineMaterial = new THREE.LineBasicMaterial( {color: 0x0000ff} );
    splineCurveObject = new THREE.Line(splineGeometry, splineMaterial);
    scene.add(splineCurveObject);
};

MovementAndCamera.prototype.setCamera = function (posx, posz) {
    camera.position.x = posx;
    camera.position.z = posz;
    camera.position.y = groundMesh.getHeightAtPoint(camera.position) + 350;
};

MovementAndCamera.prototype.addTube = function () {

    var value = 1;

    var segments = 1;

    var radiusSegments = parseInt(document.getElementById('radiusSegments').value);

    if (tubeMesh) parent.remove(tubeMesh);

    extrudePath = splines[value];

    tube = new THREE.TubeGeometry(splineCurveObject, segments, 2, radiusSegments, closed2);

    addGeometry(tube, 0xff00ff);
    setScale();

}

MovementAndCamera.prototype.setScale = function() {

    scale = parseInt( document.getElementById('scale').value );
    tubeMesh.scale.set( scale, scale, scale );

}


MovementAndCamera.prototype.addGeometry = function( geometry, color ) {

    // 3d shape

    tubeMesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [
        new THREE.MeshLambertMaterial({
            color: color
        }),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0.3,
            wireframe: true,
            transparent: true
        })]);

    parent.add( tubeMesh );

}

MovementAndCamera.prototype.animateCamera = function( toggle ) {

    if ( toggle ) {

        animation = animation === false;
        document.getElementById('animation').value = 'Camera Spline Animation View: ' + (animation? 'ON': 'OFF');

    }

    lookAhead = document.getElementById('lookAhead').checked;

    showCameraHelper = document.getElementById('cameraHelper').checked;

    cameraHelper.visible = showCameraHelper;
    cameraEye.visible = showCameraHelper;
}