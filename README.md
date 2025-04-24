# Snake-Game made in JavaScript using Kaboom.js lib
![screenRecordGif](https://github.com/user-attachments/assets/2f946ab8-f174-4d4f-a887-ab2c85f401c3)

This project was made for my college, i decided to use the **Kaboom.js** library in my first game project because it is easier to develop and focus only on the logic of the game.
# Kaboom library
Any information of how the **Kaboom.js** library work or how modify the code using this library, can be found on **Kaboom.js** site documentation: https://kaboomjs.com/
# Folder structure
- `/src` - Contains source code on `main.js` file.
- `/www` - Distribution folder, contains `index.html` and assests on `/sprites` folder.
# How to setup
```bash
git clone https://github.com/viictor0906/Snakegame-in-javascript-using-kaboom.git
cd Snakegame-in-javascript-using-kaboom
npm run dev
```
Will start a dev server at http://localhost:8000.
# Game mechanics and controls
#### Controls:
The snake-game have five functional buttons, each one has you function. 
- **LEFT KEY** - Move snake to left side.
- **RIGHT KEY** - Move snake to right side.
- **UP KEY** - Move snake to up.
- **DOWN KEY** - Move snake to down.
- **SPACE KEY** - Start and retry game on others scenes.
#### Mechanics:
- **Score** system that is incremented every time it collides with the **candy**.
- **Body** that increases with each collision with the **candy**.
- **Snake's head** collides with **body** at certain size(>20).
- Collision with the **candy** that increases the **score**, **size** and **speed** of the snake.
# Game scenes
The game have three different scenes.
- **MAIN MENU**
- **GAMEPLAY**
- **GAME OVER**
By default, the game will start on **MAIN MENU** scene, press SPACE, as stated in the text below the title, to start game. And press SPACE on **GAME OVER** scene to retry game.
