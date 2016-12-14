window.THREE = require('three');
require('./libs/OrbitControls.js');
require('./libs/EffectComposer.js');

(function(){
  var scene, camera, renderer;
  var geometry, material, mesh;

  init();
  animate();

  function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    geometry = new THREE.BoxGeometry( 200, 200, 200 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

  }

  function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

  }
})();

(function(){

  var double = function(number) {
    return new Promise(function(resolve) {
      resolve(number * 2);
    });
  };

  /* 3倍にする */

  var treble = function(number) {
    return new Promise(function(resolve) {
      resolve(number * 3);
    });
  };

  /* 表示する */

  // var dump = function(number) {
  //   console.log(number);
  //   return number;
  // };

  var dump = function(number) {
    if(number > 119 ){
      console.log(number +':120以上です!');
    }else if(number <= 119){
      console.log(number +':120以下です!');
    }
    return number;
  };

  /* 実行 */

  double(10)       // 10*2 -> 20
      .then(dump)    // コンソールに表示: 20
      .then(treble)  // 20*3 -> 60
      .then(dump)    // コンソールに表示: 60
      .then(double)  // 60*2 -> 120
      .then(dump);   // コンソールに表示: 120
})();
