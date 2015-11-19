/**
 * Created by Kristoffer on 19/11/2015.
 */
SoundFX = {};

SoundFX.jungleSounds = function () {
    var listener = new THREE.AudioListener();
    scene.add(listener);
    var audio = new THREE.Audio(listener);
    audio.load('audio/rainforest.mp3');
    audio.autoplay = true;
    audio.setLoop(500);
    scene.add(audio);
};