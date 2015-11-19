/**
 * Created by Kristoffer on 19/11/2015.
 */
"use strict";

function Renderer () {}

Renderer.prototype.renderer = function () {

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
    renderer.setClearColor( 0xbfd1e5 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowDarkness = 1.0;

    container.innerHTML = "";
    container.appendChild( renderer.domElement );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';

    container.appendChild( stats.domElement );
};