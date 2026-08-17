# Black Hole Web Animation

A JavaScript and CSS visual effect that transforms webpage elements into a slow, randomized spiral animation, pulling them into a black hole at the center of the page.

## Features

- Slow spiral movement toward a central black hole
- Random speed for each element
- Random number of rotations
- Random rotation direction
- Elements gradually shrink and fade as they enter the black hole
- Every animated element eventually reaches the black hole
- Automatically repeats in an infinite loop
- Works by injecting JavaScript and CSS into the current webpage
- No external libraries required

## Usage

### 1. Host the script

Upload `blackhole.js` to a GitHub repository.

Example Raw GitHub URL:

```text
https://raw.githubusercontent.com/USERNAME/REPOSITORY/main/blackhole.js
```

### 2. Run it on a webpage

Open the target webpage and open DevTools Console.

Run:

```js
(()=>{const s=document.createElement("script");s.src="https://raw.githubusercontent.com/CodeiAnshu/black-hole-web-animation/main/Console-Space/blackhole.js";document.body.appendChild(s)})()
```

Replace `USERNAME/REPOSITORY` with your GitHub username and repository name.

## Stop the Animation

If the script includes the stop function, run:

```js
__blackHoleStop()
```

## Customization

The main animation settings can be adjusted in `blackhole.js`, including:

```js
const SETTINGS = {
  minDuration: 14000,
  maxDuration: 42000,
  minRotations: 2.5,
  maxRotations: 6,
  restartDelay: 3000,
  holeSize: 150
};
```

### Speed

Increase `minDuration` and `maxDuration` for a slower effect.

### Rotations

Increase `minRotations` and `maxRotations` to make elements spiral around the black hole more times.

### Black Hole Size

Change `holeSize` to increase or decrease the central black hole.

## How It Works

The script:

1. Finds visible webpage elements.
2. Records their original positions.
3. Places them in fixed positions for animation.
4. Gives each element a random duration and rotation count.
5. Moves each element along a shrinking spiral path.
6. Gradually rotates, scales, and fades the element.
7. Brings the element exactly to the center of the black hole.
8. Restores the webpage.
9. Starts a new cycle with new random animation values.

## Notes

This is a browser-side visual experiment. It temporarily modifies DOM element styles while the animation is running.

Some websites may prevent externally hosted scripts because of their Content Security Policy (CSP). In that case, run the script directly through DevTools Snippets or Console.

## License

MIT License
