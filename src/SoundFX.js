/**
 * Created by Kristoffer on 19/11/2015.
 */
'use strict';

function SoundFX () {}

SoundFX.prototype.jungleSounds = function () {

    var listener = new THREE.AudioListener();
    var audio = new THREE.Audio(listener);

    audio.load('audio/rainforest.mp3');
    audio.autoplay = true;
    audio.setLoop(500);

    scene.add(listener);
    scene.add(audio);
};