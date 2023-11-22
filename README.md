# Pang Game

This is web-based game created using React.js

## Overview
![description1](https://github.com/minizzang/PangGame/assets/79495204/972c8121-1d0b-43d4-a774-e4b7f0cf17df)
**(1) Score** <br/>
Show the current score.

**(2) Board size controller** <br/>
You can change the size of the square board. Minimum: 3x3, Maximum: 15x15.

**(3) Copy URL button** <br/>
Click the button to copy the current url to the clipboard. <br/>
This allows you to share the game while maintaining its current status.

**(4) Dark theme toggle** <br/>
Pang supports dark theme.
![main_dark](https://github.com/minizzang/PangGame/assets/79495204/20a9de99-7b7e-40f0-9bf6-06cde9c87168)


## How to play
![play](https://github.com/minizzang/PangGame/assets/79495204/99ef8ec4-4a50-4754-9d6e-41b388f90a1a)
- Balloons will be randomly placed.
- You have to click and pop the balloon according to the rules.

![description2](https://github.com/minizzang/PangGame/assets/79495204/86005d70-9b26-40d2-8584-cd3b3c7fd7b6)
- Balloons connected up, down, left and right are considered a group and pop together when clicked.
- You should pop the balloons in the order in which you can pop them the most.
- For example, balloons separated by the same color in the picture are a group and should pop in the order of 1, 2, 3, and 4.
- If the numbers are the same, the order doesn't matter.


## Score
- If you pop it well in order, you get +1 point,
- if you pop an empty space -1 point,
- if you click it out of order, the game ends.

