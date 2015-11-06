/**
 * Created by Kristoffer on 02/11/2015.
 */
DayNightCycle = {}

// Need to find a way to make movement of light work

///////////////////////////////////////////////
//          Sunlight and movement           //
/////////////////////////////////////////////

DayNightCycle.sunLight = function  (){
    var light = new THREE.DirectionalLight(0xf5a914, 2.0); //colour of the sun
    this.object3d	= light;

    this.update	= function(sunAngle){
        light.position.x = 0;
        light.position.y = Math.sin(sunAngle) * 90000;
        light.position.z = Math.cos(sunAngle) * 90000;

    }
}

/////////////////////////////////////////////
//              Sun object                //
///////////////////////////////////////////

DayNightCycle.sunObject = function () {
    var sunGeometry	= new THREE.SphereGeometry( 20, 30, 30 );
    var sunMaterial	= new THREE.MeshBasicMaterial({
        color		: 0xff0000
    });
    var sunMesh	= new THREE.Mesh(sunGeometry, sunMaterial);
    this.object3d	= sunMesh;

    this.update	= function(sunAngle) {
        mesh.position.x = 0;
        mesh.position.y = Math.sin(sunAngle) * 400;
        mesh.position.z = Math.cos(sunAngle) * 400;
    }
}

/////////////////////////////////////////////
//                 Skybox                 //
///////////////////////////////////////////

DayNightCycle.Skybox = function () {}
// Karianne do this