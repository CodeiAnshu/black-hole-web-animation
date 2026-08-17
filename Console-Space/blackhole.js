(() => {
  // =========================================================
  // STOP PREVIOUS VERSION
  // =========================================================

  window.__blackHoleStop?.();

  const STYLE_ID = "__bh_style__";
  const HOLE_ID = "__bh_hole__";
  const VIGNETTE_CLASS = "__bh_page_vignette";

  document.getElementById(STYLE_ID)?.remove();
  document.getElementById(HOLE_ID)?.remove();
  document.querySelector(`.${VIGNETTE_CLASS}`)?.remove();


  // =========================================================
  // SETTINGS
  // =========================================================

  const SETTINGS = {

    // Random time for each element
    minDuration: 14000,
    maxDuration: 42000,

    // Random number of spiral rotations
    minRotations: 2.5,
    maxRotations: 6,

    // Pause before next cycle
    restartDelay: 3000,

    // Black hole size
    holeSize: 150
  };


  // =========================================================
  // CSS
  // =========================================================

  const style = document.createElement("style");

  style.id = STYLE_ID;

  style.textContent = `

/* =========================================================
   BLACK HOLE
   ========================================================= */

#${HOLE_ID} {

  position: fixed;

  left: 50%;
  top: 50%;

  width: ${SETTINGS.holeSize}px;
  height: ${SETTINGS.holeSize}px;

  transform: translate(-50%, -50%);

  border-radius: 50%;

  z-index: 2147483647;

  pointer-events: none;

  background:
    radial-gradient(
      circle,

      #000 0%,
      #000 34%,

      #030006 43%,
      #08000d 50%,

      rgba(30,0,55,.85) 58%,
      rgba(75,0,110,.45) 66%,

      rgba(100,0,150,.18) 73%,

      transparent 82%
    );

  box-shadow:

    0 0 15px rgba(0,0,0,1),

    0 0 35px rgba(45,0,75,.9),

    0 0 70px rgba(70,0,110,.7),

    0 0 130px rgba(50,0,90,.45),

    0 0 220px rgba(30,0,60,.25);

  isolation: isolate;
}


/* =========================================================
   DARK ROTATING GRAVITATIONAL FIELD
   ========================================================= */

#${HOLE_ID}::before {

  content: "";

  position: absolute;

  left: 50%;
  top: 50%;

  width: 270%;
  height: 270%;

  transform:
    translate(-50%, -50%)
    rotate(-20deg);

  border-radius: 50%;

  background:

    radial-gradient(
      ellipse at center,

      transparent 0%,
      transparent 30%,

      rgba(50,0,80,.12) 42%,
      rgba(100,0,130,.18) 48%,

      transparent 58%
    ),

    repeating-conic-gradient(

      from 0deg,

      transparent 0deg,

      rgba(90,0,130,.20) 5deg,

      rgba(20,0,35,.05) 12deg,

      transparent 20deg,

      rgba(120,0,150,.16) 27deg,

      transparent 38deg
    );

  filter:
    blur(9px)
    contrast(130%);

  opacity: .85;

  animation:
    bhGravitySpin 20s linear infinite;

  z-index: -2;
}


/* =========================================================
   INNER ACCRETION DISK
   ========================================================= */

#${HOLE_ID}::after {

  content: "";

  position: absolute;

  left: 50%;
  top: 50%;

  width: 210%;
  height: 72%;

  transform:
    translate(-50%, -50%)
    rotate(-18deg);

  border-radius: 50%;

  background:

    radial-gradient(
      ellipse,

      transparent 0%,
      transparent 27%,

      rgba(0,0,0,.98) 29%,

      rgba(20,0,30,.9) 36%,

      rgba(85,0,100,.55) 43%,

      rgba(130,10,110,.25) 48%,

      rgba(40,0,60,.12) 53%,

      transparent 62%
    );

  box-shadow:

    0 0 20px rgba(80,0,100,.5),

    0 0 45px rgba(100,0,120,.35),

    0 0 90px rgba(50,0,80,.25);

  filter: blur(2px);

  animation:
    bhAccretionSpin 12s linear infinite;

  z-index: -1;
}


/* =========================================================
   GRAVITATIONAL ROTATION
   ========================================================= */

@keyframes bhGravitySpin {

  from {

    transform:
      translate(-50%, -50%)
      rotate(0deg)
      scale(1);
  }

  to {

    transform:
      translate(-50%, -50%)
      rotate(360deg)
      scale(1);
  }
}


/* =========================================================
   ACCRETION DISK ROTATION
   ========================================================= */

@keyframes bhAccretionSpin {

  from {

    transform:
      translate(-50%, -50%)
      rotate(-18deg);
  }

  to {

    transform:
      translate(-50%, -50%)
      rotate(342deg);
  }
}


/* =========================================================
   FULL PAGE VIGNETTE
   ========================================================= */

.${VIGNETTE_CLASS} {

  position: fixed;

  inset: 0;

  z-index: 2147483645;

  pointer-events: none;

  background:

    radial-gradient(
      circle at 50% 50%,

      transparent 0%,
      transparent 25%,

      rgba(0,0,0,.05) 40%,

      rgba(0,0,0,.18) 65%,

      rgba(0,0,0,.42) 100%
    );

  mix-blend-mode: multiply;

  opacity: .75;
}


/* =========================================================
   MOVING ELEMENTS
   ========================================================= */

.__bh_moving {

  position: fixed !important;

  margin: 0 !important;

  pointer-events: none !important;

  z-index: 2147483646 !important;

  will-change:
    left,
    top,
    transform,
    opacity;
}

`;

  document.head.appendChild(style);


  // =========================================================
  // CREATE BLACK HOLE
  // =========================================================

  const hole = document.createElement("div");

  hole.id = HOLE_ID;

  document.body.appendChild(hole);


  // =========================================================
  // CREATE FULL PAGE VIGNETTE
  // =========================================================

  const vignette =
    document.createElement("div");

  vignette.className =
    VIGNETTE_CLASS;

  document.body.appendChild(vignette);


  // =========================================================
  // FIND VISUAL ELEMENTS
  // =========================================================

  const all = [
    ...document.body.querySelectorAll("*")
  ];

  const ignored = new Set([
    "SCRIPT",
    "STYLE",
    "LINK",
    "META",
    "HEAD",
    "BODY",
    "HTML",
    "BR",
    "HR",
    "NOSCRIPT"
  ]);


  const elements = all.filter(el => {

    if (ignored.has(el.tagName))
      return false;

    if (el.closest(`#${HOLE_ID}`))
      return false;

    if (el.closest(`.${VIGNETTE_CLASS}`))
      return false;

    const r =
      el.getBoundingClientRect();

    if (
      r.width < 2 ||
      r.height < 2
    ) {
      return false;
    }


    const hasText =
      [...el.childNodes].some(node =>
        node.nodeType === Node.TEXT_NODE &&
        node.textContent.trim().length > 0
      );


    const important =
      [
        "IMG",
        "VIDEO",
        "BUTTON",
        "A",
        "INPUT",
        "TEXTAREA",
        "SELECT",

        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",

        "P",
        "LI"
      ].includes(el.tagName);


    return hasText || important;
  });


  // =========================================================
  // REMOVE NESTED DUPLICATES
  // =========================================================

  const visualElements =
    elements.filter(el => {

      let parent =
        el.parentElement;

      while (
        parent &&
        parent !== document.body
      ) {

        if (elements.includes(parent)) {
          return false;
        }

        parent =
          parent.parentElement;
      }

      return true;
    });


  // =========================================================
  // SAVE ORIGINAL STATE
  // =========================================================

  const states =
    visualElements.map(el => {

      const r =
        el.getBoundingClientRect();

      return {

        el,

        left: r.left,
        top: r.top,

        width: r.width,
        height: r.height,

        position:
          el.style.position,

        transform:
          el.style.transform,

        opacity:
          el.style.opacity,

        zIndex:
          el.style.zIndex,

        transition:
          el.style.transition,

        visibility:
          el.style.visibility,

        widthStyle:
          el.style.width,

        heightStyle:
          el.style.height
      };
    });


  // =========================================================
  // RANDOM
  // =========================================================

  const random = (min, max) =>
    min +
    Math.random() *
    (max - min);


  const randomDirection = () =>
    Math.random() > .5
      ? 1
      : -1;


  // =========================================================
  // SHUFFLE
  // =========================================================

  function shuffle(array) {

    const result =
      [...array];

    for (
      let i = result.length - 1;
      i > 0;
      i--
    ) {

      const j =
        Math.floor(
          Math.random() *
          (i + 1)
        );

      [
        result[i],
        result[j]
      ] =
      [
        result[j],
        result[i]
      ];
    }

    return result;
  }


  // =========================================================
  // RESTORE PAGE
  // =========================================================

  function restore() {

    states.forEach(state => {

      const el =
        state.el;

      el.classList.remove(
        "__bh_moving"
      );

      el.style.position =
        state.position;

      el.style.left = "";

      el.style.top = "";

      el.style.width =
        state.widthStyle;

      el.style.height =
        state.heightStyle;

      el.style.transform =
        state.transform;

      el.style.opacity =
        state.opacity;

      el.style.zIndex =
        state.zIndex;

      el.style.transition =
        state.transition;

      el.style.visibility =
        state.visibility;
    });
  }


  // =========================================================
  // ANIMATION VARIABLES
  // =========================================================

  let stopped = false;

  let frame = null;


  // =========================================================
  // ONE CYCLE
  // =========================================================

  async function runCycle() {

    if (stopped)
      return;


    restore();


    await new Promise(resolve =>
      setTimeout(
        resolve,
        1000
      )
    );


    if (stopped)
      return;


    const centerX =
      window.innerWidth / 2;

    const centerY =
      window.innerHeight / 2;


    // Random order
    const shuffled =
      shuffle(states);


    const animations =
      shuffled.map(state => {

        const el =
          state.el;


        const elementCenterX =
          state.left +
          state.width / 2;


        const elementCenterY =
          state.top +
          state.height / 2;


        const dx =
          elementCenterX -
          centerX;


        const dy =
          elementCenterY -
          centerY;


        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        const startAngle =
          Math.atan2(
            dy,
            dx
          );


        // Random speed
        const duration =
          random(
            SETTINGS.minDuration,
            SETTINGS.maxDuration
          );


        // Random rotations
        const rotations =
          random(
            SETTINGS.minRotations,
            SETTINGS.maxRotations
          );


        // Random direction
        const direction =
          randomDirection();


        return {

          state,
          el,

          centerX,
          centerY,

          distance,
          startAngle,

          duration,
          rotations,
          direction,

          startTime: null,

          finished: false
        };
      });


    // =======================================================
    // FIXED POSITION
    // =======================================================

    animations.forEach(anim => {

      const {
        state,
        el
      } = anim;


      el.classList.add(
        "__bh_moving"
      );


      el.style.left =
        state.left + "px";


      el.style.top =
        state.top + "px";


      el.style.width =
        state.width + "px";


      el.style.height =
        state.height + "px";


      el.style.opacity =
        "1";

      el.style.visibility =
        "visible";
    });


    // =======================================================
    // ANIMATION LOOP
    // =======================================================

    await new Promise(resolve => {


      function animate(now) {

        if (stopped) {

          resolve();

          return;
        }


        let finishedCount = 0;


        animations.forEach(anim => {


          if (anim.finished) {

            finishedCount++;

            return;
          }


          if (
            anim.startTime === null
          ) {

            anim.startTime =
              now;
          }


          let progress =
            (
              now -
              anim.startTime
            ) /
            anim.duration;


          progress =
            Math.min(
              progress,
              1
            );


          // Smooth movement
          const eased =
            progress *
            progress *
            (
              3 -
              2 *
              progress
            );


          // =================================================
          // RADIUS
          // =================================================

          const radius =
            anim.distance *
            (1 - eased);


          // =================================================
          // SPIRAL ANGLE
          // =================================================

          const angle =
            anim.startAngle +

            anim.direction *
            eased *
            Math.PI *
            2 *
            anim.rotations;


          // =================================================
          // POSITION
          // =================================================

          const x =
            anim.centerX +
            Math.cos(angle) *
            radius;


          const y =
            anim.centerY +
            Math.sin(angle) *
            radius;


          // =================================================
          // ROTATION
          // =================================================

          const rotate =
            anim.direction *
            eased *
            1440;


          // =================================================
          // SCALE
          // =================================================

          const scale =
            1 -
            eased *
            .98;


          // =================================================
          // FADE
          // =================================================

          let opacity = 1;


          if (progress > .82) {

            opacity =
              1 -
              (
                (
                  progress -
                  .82
                ) /
                .18
              );
          }


          // =================================================
          // APPLY
          // =================================================

          anim.el.style.left =
            (
              x -
              anim.state.width / 2
            ) + "px";


          anim.el.style.top =
            (
              y -
              anim.state.height / 2
            ) + "px";


          anim.el.style.transform =
            `
              rotate(${rotate}deg)
              scale(${scale})
            `;


          anim.el.style.opacity =
            opacity;


          // =================================================
          // FINISHED
          // =================================================

          if (progress >= 1) {

            // Exact black-hole center
            anim.el.style.left =
              (
                anim.centerX -
                anim.state.width / 2
              ) + "px";


            anim.el.style.top =
              (
                anim.centerY -
                anim.state.height / 2
              ) + "px";


            anim.el.style.transform =
              `
                rotate(${rotate}deg)
                scale(0)
              `;


            anim.el.style.opacity =
              "0";


            anim.el.style.visibility =
              "hidden";


            anim.finished =
              true;


            finishedCount++;
          }
        });


        // =====================================================
        // ALL ELEMENTS ENTERED
        // =====================================================

        if (
          finishedCount ===
          animations.length
        ) {

          resolve();

          return;
        }


        frame =
          requestAnimationFrame(
            animate
          );
      }


      frame =
        requestAnimationFrame(
          animate
        );
    });


    if (stopped)
      return;


    // =======================================================
    // WAIT BEFORE RESET
    // =======================================================

    await new Promise(resolve =>
      setTimeout(
        resolve,
        SETTINGS.restartDelay
      )
    );


    if (stopped)
      return;


    // =======================================================
    // NEW RANDOM CYCLE
    // =======================================================

    runCycle();
  }


  // =========================================================
  // STOP FUNCTION
  // =========================================================

  window.__blackHoleStop = () => {

    stopped = true;


    if (frame) {

      cancelAnimationFrame(
        frame
      );
    }


    restore();


    document
      .getElementById(HOLE_ID)
      ?.remove();


    document
      .getElementById(STYLE_ID)
      ?.remove();


    document
      .querySelector(
        `.${VIGNETTE_CLASS}`
      )
      ?.remove();


    console.log(
      "Black-hole animation stopped."
    );
  };


  // =========================================================
  // START
  // =========================================================

  runCycle();


  console.log(
    "Black-hole spiral animation started."
  );


  console.log(
    "Every element gets random speed, rotations and direction."
  );


  console.log(
    "Run __blackHoleStop() to stop."
  );

})();
