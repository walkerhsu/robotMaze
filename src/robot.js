let robot, face, actions, expressions, activeAction, previousAction;
const api = { state: 'Running' };
const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];

function createRobot(x , z) {
    const loader = new THREE.GLTFLoader();
    loader.load('/res/RobotExpressive.glb', function (gltf) {
        robot = gltf.scene;
        robot.position.x = x * scaler;
        robot.position.z = z * scaler;
        scene.add(robot);
        queryActions(robot, gltf.animations);
        nextStep()
        
    }, undefined, function (e) {
        console.error(e);
    });
}

function resetRobot(x, z) {
    let size = Math.floor(mapinfo.length/2)
    robot.position.x = (x-size) * scaler;
    robot.position.z = (z-size) * scaler;
    robot.rotation.y = 0;
    let id = randint(1, 3)
    changeState(id)
    nextStep();

}

function queryActions(model , animations) {
    mixer = new THREE.AnimationMixer(model);
    actions = {};
    for (let i = 0; i < animations.length; i++) {
        const clip = animations[i];
        const action = mixer.clipAction(clip);

        if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
            action.clampWhenFinished = true;
            action.loop = THREE.LoopOnce;
        }
        actions[clip.name] = action;
    }
    face = model.getObjectByName( 'Head_4' );
    expressions = Object.keys( face.morphTargetDictionary ); //a list  
    
    activeAction = actions[api.state];
    activeAction.play();
}

function fadeToAction(name , duration) {
    previousAction = activeAction
    activeAction = actions[name]

    if (previousAction !== activeAction) {
        previousAction.fadeOut(duration)
    }

    activeAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        .play()
}

function morphFace() {
    let id = randint(0, expressions.length-1)
    let value = Math.random()

    console.log(expressions[id])
    face.morphTargetInfluences[id] = value; //influence the weigh of the expression
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeEmotion(id){
    function restoreEmotion() {
        mixer.removeEventListener('finished', restoreEmotion)
        fadeToAction(api.state, 0.2)
    }
    fadeToAction(emotes[id], 1)
    mixer.addEventListener('finished', restoreEmotion)
}

function changeState() {
    function restoreState() {
        mixer.removeEventListener('finished', restoreState)
        fadeToAction(api.state, 0.5)
    }
    statesID = randint(0, states.length-1)
    fadeToAction(states[statesID], 1)
    mixer.addEventListener('finished', restoreState)
}

function createTween(dir) {
    console.log(dir)
    let steps = 1 * scaler
    let speed = 400
    let denominator = (api.state == 'Walking') ? 1 : 2;
    
    let offset = { step: 0 }                // ???????????????????????? onUpdate ?????????????????? 
    let target = { step: steps }             // ??????????????????????????????????????????
    let position = new THREE.Vector3 (0, 0, 0)
    position.copy( robot.position );

    const onUpdate = () => {
        // ??????
        //console.log(offset.step)
        if (dir == 'south') {
            robot.position.z = position.z + offset.step
        } else if (dir == 'north') {
            robot.position.z =  position.z - offset.step
        } else if (dir == 'east') {
            robot.position.x = position.x + offset.step
        } else if (dir == 'west') {
            robot.position.x = position.x - offset.step
        }
    }
    let miliseconds = speed*steps/denominator
    //console.log(miliseconds)  
    let tween = new TWEEN.Tween(offset)                     // ????????? offset
        .to(target, miliseconds)                // ????????????ms???????????? target
        .onUpdate(onUpdate)
        .onComplete(() => {
            tween.stop()
            console.log(mousePos)
            morphFace()
            changeState()
            nextStep()
        })
    // ????????????
    tween.start()
}

let prevAngle = 0
function createRotationTween(angle) {
    console.log('previous angle is ' + prevAngle + ' and currect angle is ' + angle)
    let offset = { step: prevAngle }      // ???????????????????????? onUpdate ?????????????????? 
    let target = { step: angle }   // ??????????????????????????????????????????
    prevAngle = angle

    const onUpdate = () => {
        // ??????
        //console.log(offset)
        robot.rotation.y = offset.step
    }

    let tween = new TWEEN.Tween(offset)                     // ????????? offset
        .to(target, 250)                // ????????????ms???????????? target
        .onUpdate(onUpdate)
        .onComplete(() => {
            tween.stop()
            morphFace()
            //changeEmotion()
            createTween(direction)
        })

    // ????????????
    tween.start()
}