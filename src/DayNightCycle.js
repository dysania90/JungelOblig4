/**
 * Created by Kristoffer on 02/11/2015.
 */

function sunLight (){
    var light = new THREE.DirectionalLight(0xf5a914, 2.0); //colour of the sun
    this.object3d	= light;

    this.update	= function(sunAngle){
        light.position.x = 0;
        light.position.y = Math.sin(sunAngle) * 90000;
        light.position.z = Math.cos(sunAngle) * 90000;

    }
}