# Robot Maze - 3D Pathfinding Visualization

A 3D interactive robot maze simulation built with Three.js where an animated robot autonomously navigates through a maze to collect stars using pathfinding algorithms.

## 🎮 Demo

Watch an expressive 3D robot navigate through a maze, change facial expressions, and perform animations while collecting stars!

## 🚀 Getting Started

### Prerequisites
- Node.js (v12 or higher)
- npm

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   # or
   node index.js
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5000`

## 🎯 How It Works

### Project Structure
```
robotMaze/
├── index.js          # Express server
├── index.html        # Main HTML page
├── index.css         # Basic styling
├── package.json      # Dependencies
├── res/              # Resources
│   ├── map00.csv     # Maze layout data
│   ├── RobotExpressive.glb  # 3D robot model
│   ├── star.obj      # 3D star model
│   └── square.png    # Wall texture
└── src/              # Source code
    ├── main.js       # Three.js scene setup
    ├── map.js        # Map loading and rendering
    ├── mapLoader.js  # CSV map parser
    ├── robot.js      # Robot animations and controls
    ├── moveCtrl.js   # Pathfinding algorithm
    └── lib/
        └── ObjLoader.js  # OBJ model loader
```

### Workflow

1. **Server Side (Node.js + Express)**
   - Loads maze data from `res/map00.csv`
   - Serves static files and provides REST API at `/map`
   - Express server runs on port 5000

2. **Client Side (Three.js)**
   - Initializes 3D scene with camera, lights, and controls
   - Fetches maze data via AJAX from `/map` endpoint
   - Renders 3D environment based on CSV data
   - Loads animated robot model with facial expressions
   - Implements autonomous pathfinding algorithm

### Map Format (CSV)

The maze is defined in `res/map00.csv` using a 9x9 grid:
- `0` = Wall/Block (rendered as blue cubes)
- `1` = Empty walkable space
- `2` = Robot starting position
- `3` = Star/Goal to collect

Example:
```
1,1,1,1,1,1,0,1,3
0,1,0,0,1,1,0,1,1
2,1,1,1,1,1,1,0,1
...
```

## 🎮 User Interaction

- **Mouse Controls**: Orbit camera around the 3D scene
- **Passive Viewing**: Watch the robot autonomously solve the maze
- **No Direct Control**: Robot uses AI pathfinding algorithm

## 🤖 Robot Features

- **Autonomous Navigation**: Uses pathfinding to find stars
- **Facial Expressions**: Dynamic morphing of facial features
- **Animation States**: Walking, running, idle, dancing, etc.
- **Smooth Movement**: Tween-based animations between grid positions
- **Smart Rotation**: Faces movement direction automatically

## 🏗️ Main Functions

### Core Initialization
- `bodyLoaded()` - Entry point when page loads
- `init()` - Sets up Three.js scene, camera, lights, renderer
- `createMap()` - Builds 3D maze from CSV data

### Map Generation
- `loadMap()` - AJAX call to fetch map data
- `createCube()` - Renders wall blocks
- `createStar()` - Places collectible stars
- `addGridHelper()` - Adds visual grid overlay

### Robot System
- `createRobot()` - Loads 3D robot model with animations
- `queryActions()` - Sets up animation mixer and actions
- `fadeToAction()` - Smooth animation transitions
- `morphFace()` - Changes facial expressions randomly

### Pathfinding
- `nextStep()` - Main pathfinding algorithm
- `addCandidate()` - Finds possible movement directions
- `canWalk()` - Checks if position is valid
- `moveForward()` / `mouseBackward()` - Movement execution

### Animation Loop
- `animate()` - Continuous rendering and updates
- `createTween()` - Smooth position interpolation
- `createRotationTween()` - Smooth rotation animations

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **3D Graphics**: Three.js (r126)
- **Animation**: Tween.js
- **3D Models**: GLTF/GLB format for robot, OBJ format for stars
- **Data Format**: CSV for maze layout

## 🎨 Customization

### Creating New Mazes
1. Edit `res/map00.csv` with your desired layout
2. Use the number format: 0=wall, 1=empty, 2=start, 3=goal
3. Restart the server to load the new maze

### Modifying Robot Behavior
- Adjust pathfinding in `src/moveCtrl.js`
- Change animation timing in `src/robot.js`
- Modify facial expressions in `morphFace()` function

### Visual Customization
- Camera position and angle in `src/main.js`
- Lighting setup in `init()` function
- Materials and colors in map generation functions

## 🐛 Troubleshooting

### Black Canvas
- Ensure all CDN scripts are loading properly
- Check browser console for JavaScript errors
- Verify server is running on port 5000

### Robot Not Moving
- Check that map data is loading (`/map` endpoint)
- Verify CSV format is correct
- Look for pathfinding algorithm errors in console

### Missing 3D Models
- Ensure `res/` folder contains all model files
- Check file paths in the code match actual file locations

---

**Enjoy watching your robot solve the maze! 🤖✨**