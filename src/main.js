let clock, mixer;
let camera, scene, renderer, controls;

let gridsize = 25
let cellnumber = 9

let scaler = gridsize / cellnumber

function bodyLoaded() {
    init()
    createMap()
    animate()
}

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
    camera.position.set(20, 20, 50);
    camera.lookAt(new THREE.Vector3(0, 1, 0));

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd0d0d0)

    clock = new THREE.Clock();

    // lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);

    //createFloor()

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function createFloor() {
    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 60, 60 ), 
                 new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );
}

function onWindowResize() {
    console.log(window.innerWidth , window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
    const dt = clock.getDelta();
    if (mixer) {
        mixer.update(dt);
    }
    TWEEN.update(time);
    renderer.render(scene, camera);

    // rotate stars
    for (let i = 0; i < stars.length; i++) {
        stars[i].rotation.z += 0.01
    }
    requestAnimationFrame(animate);
}