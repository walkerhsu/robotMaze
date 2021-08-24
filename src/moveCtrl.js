let startx = 0
let starty = 0
let direction = 'south'
let mouseRoute = []
let candidatesStack = []
let visited = []
let currentItem = null
let mousePos = [0,0]
let nextItem = null
let forward = true
let angle = 0

function initMoveCtrl(x,y) {
    startx = x
    starty = y
    mouseRoute = []
    candidatesStack = []
    visited = []
    direction = 'south'
    angle = 0
    nextItem = null
    forward = true

    mousePos = [x,y]
    //append route item [direction, parent, child]  
    currentItem = [direction , [-1 , -1] , [x , y] ]
    mouseRoute[mouseRoute.length] = currentItem
    visited[visited.length] = [x,y]
    addCandidate(x,y)
    
}

function addCandidate(x , y) {
    
    if ( canWalk(x+1 , y) ) {
        let item = [ 'east' , [x , y] , [x+1 , y] ]
        candidatesStack[candidatesStack.length] = item
        console.log('canwalk--east')
    }
    if ( canWalk(x , y+1) ) {
        let item = [ 'south' , [x , y] , [x , y+1] ]
        candidatesStack[candidatesStack.length] = item
        console.log('canwalk--south')
    }
    if ( canWalk(x-1 , y) ) {
        let item = [ 'west' , [x , y] , [x-1 , y] ]
        candidatesStack[candidatesStack.length] = item
        console.log('canwalk--west')
    }
    if ( canWalk(x , y-1) ) {
        let item = [ 'north' , [x , y] , [x , y-1] ]
        candidatesStack[candidatesStack.length] = item
        console.log('canwalk--north')
    }
}

function canWalk(x , y) {
    return !(isBlock(x,y) || isVisited(x,y))
}

function isBlock (x , y) {
    let block = false
    if (x >= mapinfo[0].length || x<0 || y>=mapinfo.length || y<0) block = true
    else if (mapinfo[y][x] == '0') block = true
    return block
}

function isVisited(x , y) {
    let point = [x,y]
    for(let i = 0; i<visited.length; i++) {
        if ( (point[0] == visited[i][0]) && (point[1] ==visited[i][1]) ) {
            return true
        }
    }
    return false 
}

function nextStep() {
    if(forward) {
        moveforward()
    }
    //lastItem = lastStackItem(candidatesStack)
    lastRoute = lastStackItem(mouseRoute)
    if( ( lastRoute[2][0] != nextItem[1][0] ) || ( lastRoute[2][1] != nextItem[1][1] ) ){
        forward = false
        mouseBackward(lastRoute)
    }
    else {
        forward = true 
        if(isStar(nextItem[2][0] , nextItem[2][1]) ) {
            console.log('Star founded!!')
            resetRoute()
        }
        else {
            mouseForward(nextItem)
        }
        
    }
    
}

function moveforward() {
    if (candidatesStack.length>0) {
        nextItem = lastStackItem(candidatesStack)
        candidatesStack.pop()
        visited[visited.length] = nextItem[2]
        addCandidate(nextItem[2][0] , nextItem[2][1])
    }
    else if (candidatesStack.length == 0) {
        console.log('There is no way to go out!!!')
    }
}

function mouseForward(item) {
    console.log('moving forward...')
    console.log(item)
    mouseRoute[mouseRoute.length] = item
    mousePos = item[2]
    currentItem = item
    createRobotTween(item[0])
}

function mouseBackward(item) {
    console.log('moving backward...')
    console.log(item)
    newItem = [changeDir(item) , item[2] , item[1] ]
    mouseRoute.pop()
    mousePos = newItem[2]
    currentItem = newItem
    createRobotTween(newItem[0])
}

function isStar(x , y) {
    return (mapinfo[y][x] == '3')
}

function createRobotTween(dir) {
    if(direction != dir) {
        angle = calculateAngle(dir)
        direction = dir
        createRotationTween(angle)
    }
    else {
        createTween(direction)
    }
}

function calculateAngle(dirs) {
    angle = {'east'  :  Math.PI/2, 
             'west'  : -Math.PI/2, 
             'south' :  0, 
             'north' :  Math.PI, 
            } 
    return angle[dirs]
}

function changeDir(item) {
    reverse = { 'east' : 'west', 
                'west' : 'east', 
                'north': 'south', 
                'south': 'north'}
    return reverse[item[0]]
}

function popStack(stack) {
    return stack.pop()
}

function lastStackItem(stack) {
    return stack[stack.length-1]
}

function resetRoute() {
    changeEmotion(5)
    // reset after 3 secs
    let timer = setInterval(function(){
        initMoveCtrl(startx, starty)
        resetRobot(startx, starty)
        clearInterval(timer);
    }, 3000);
}

