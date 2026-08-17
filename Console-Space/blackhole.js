(() => {
  // Stop previous version
  window.__blackHoleStop?.();

  const STYLE_ID = "__bh_style__";
  const HOLE_ID = "__bh_hole__";
  const VORTEX_ID = "__bh_vortex__";

  document.getElementById(STYLE_ID)?.remove();
  document.getElementById(HOLE_ID)?.remove();
  document.getElementById(VORTEX_ID)?.remove();

  // ==============================
  // SETTINGS
  // ==============================

  const SETTINGS = {
    // Minimum and maximum time for an element
    // to reach the black hole.
    minDuration: 14000,
    maxDuration: 42000,

    // Minimum and maximum spiral rotations
    minRotations: 2.5,
    maxRotations: 6,

    // Pause after everything enters
    restartDelay: 3000,

    // Black hole size
    holeSize: 150
  };

  // ==============================
  // CSS
  // ==============================

  const style = document.createElement("style");

  style.id = STYLE_ID;

  style.textContent = `
    #${HOLE_ID} {
      position: fixed;
      left: 50%;
      top: 50%;

      width: ${SETTINGS.holeSize}px;
      height: ${SETTINGS.holeSize}px;

      transform: translate(-50%, -50%);

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          #000 0%,
          #000 65%,
          rgba(0, 0, 0, 0.8) 80%,
          transparent 100%
        );

      box-shadow:
        0 0 40px rgba(0, 0, 0, 0.9),
        0 0 90px rgba(0, 0, 0, 0.8);

      z-index: 2147483647;

      pointer-events: none;
    }

    #${VORTEX_ID} {
      position: fixed;
      left: 50%;
      top: 50%;
      width: min(150vmin, 1600px);
      height: min(150vmin, 1600px);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 2147483645;
      opacity: 0.35;
    }

    #${VORTEX_ID} svg {
      width: 100%;
      height: 100%;
      animation: bhWindSpin 25s linear infinite;
      transform-origin: 50% 50%;
    }

    @keyframes bhWindSpin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .__bh_wind_stream {
      fill: none;
      stroke: rgba(255, 255, 255, 0.4);
      stroke-linecap: round;
      filter: blur(2px);
    }

    .__bh_wind_stream:nth-child(even) {
      stroke: rgba(180, 140, 255, 0.3);
      filter: blur(3px);
    }

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

  // ==============================
  // BLACK HOLE & WIND VORTEX
  // ==============================

  const hole = document.createElement("div");
  hole.id = HOLE_ID;
  document.body.appendChild(hole);

  const vortex = document.createElement("div");
  vortex.id = VORTEX_ID;
  vortex.innerHTML = `
    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path class="__bh_wind_stream" stroke-width="6" d="M 50 500 C 120 220, 320 80, 580 120 C 820 160, 930 380, 850 620 C 760 840, 500 920, 280 800 C 120 700, 180 480, 320 360 C 460 250, 680 280, 740 440 C 790 580, 660 700, 500 680 C 380 660, 340 520, 420 440 C 480 380, 580 420, 560 500" />
      <path class="__bh_wind_stream" stroke-width="10" d="M 120 720 C 50 480, 180 200, 440 120 C 720 30, 920 180, 900 440 C 880 700, 620 900, 380 820 C 200 750, 150 520, 260 380 C 360 250, 580 220, 680 320 C 780 420, 740 600, 600 640 C 480 680, 400 560, 450 480" />
      <path class="__bh_wind_stream" stroke-width="4" d="M 200 180 C 450 40, 780 90, 900 320 C 1000 530, 860 800, 620 880 C 360 950, 100 780, 80 520 C 60 280, 280 120, 500 160 C 700 200, 800 380, 720 540 C 650 680, 460 700, 380 580 C 320 480, 420 380, 520 420" />
      <path class="__bh_wind_stream" stroke-width="8" d="M 880 680 C 760 900, 420 950, 200 780 C 0 600, 60 280, 280 140 C 520 0, 820 80, 910 320 C 990 540, 820 760, 600 800 C 400 830, 260 680, 300 500 C 330 360, 480 300, 600 380 C 680 440, 660 560, 550 580" />
    </svg>
  `;
  document.body.appendChild(vortex);

  // ==============================
  // FIND VISUAL ELEMENTS
  // ==============================

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

  /*
    Select visual elements instead of every
    nested container.

    This prevents parent + child elements
    from being transformed twice.
  */

  const elements = all.filter(el => {

    if (ignored.has(el.tagName))
      return false;

    if (el.closest(`#${HOLE_ID}, #${VORTEX_ID}`))
      return false;

    const r =
      el.getBoundingClientRect();

    if (
      r.width < 2 ||
      r.height < 2
    ) {
      return false;
    }

    // Direct text content
    const hasText =
      [...el.childNodes].some(node =>
        node.nodeType === Node.TEXT_NODE &&
        node.textContent.trim().length > 0
      );

    // Important visual elements
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

  // ==============================
  // REMOVE NESTED DUPLICATES
  // ==============================

  const visualElements =
    elements.filter(el => {

      let parent = el.parentElement;

      while (parent && parent !== document.body) {

        if (elements.includes(parent)) {
          return false;
        }

        parent = parent.parentElement;
      }

      return true;
    });

  // ==============================
  // SAVE ORIGINAL STATE
  // ==============================

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

  // ==============================
  // RANDOM FUNCTION
  // ==============================

  const random = (min, max) =>
    min + Math.random() * (max - min);

  const randomDirection = () =>
    Math.random() > 0.5 ? 1 : -1;

  // ==============================
  // SHUFFLE
  // ==============================

  function shuffle(array) {

    const result = [...array];

    for (
      let i = result.length - 1;
      i > 0;
      i--
    ) {

      const j =
        Math.floor(
          Math.random() * (i + 1)
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

  // ==============================
  // RESTORE PAGE
  // ==============================

  function restore() {

    states.forEach(state => {

      const el = state.el;

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

  // ==============================
  // ANIMATION VARIABLES
  // ==============================

  let stopped = false;
  let frame = null;

  // ==============================
  // ONE CYCLE
  // ==============================

  async function runCycle() {

    if (stopped)
      return;

    restore();

    await new Promise(resolve =>
      setTimeout(resolve, 1000)
    );

    if (stopped)
      return;

    const centerX =
      window.innerWidth / 2;

    const centerY =
      window.innerHeight / 2;

    // Random order every cycle
    const shuffled =
      shuffle(states);

    const animations =
      shuffled.map(state => {

        const el = state.el;

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

        // Starting angle
        const startAngle =
          Math.atan2(dy, dx);

        // RANDOM SPEED
        const duration =
          random(
            SETTINGS.minDuration,
            SETTINGS.maxDuration
          );

        // RANDOM NUMBER OF SPINS
        const rotations =
          random(
            SETTINGS.minRotations,
            SETTINGS.maxRotations
          );

        // RANDOM DIRECTION
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

    // ==========================
    // PUT ALL ELEMENTS
    // IN FIXED POSITIONS
    // ==========================

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

      el.style.opacity = "1";
    });

    // ==============================
    // ANIMATION LOOP
    // ==============================

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

          if (anim.startTime === null) {
            anim.startTime = now;
          }

          let progress =
            (now - anim.startTime) /
            anim.duration;

          progress =
            Math.min(progress, 1);

          /*
            Smooth acceleration/deceleration.

            Radius always goes:
            
            START → 0

            Therefore every element
            MUST enter the black hole.
          */

          const eased =
            progress * progress *
            (3 - 2 * progress);

          // ==========================
          // SPIRAL RADIUS
          // ==========================

          const radius =
            anim.distance *
            (1 - eased);

          // ==========================
          // SPIRAL ANGLE
          // ==========================

          const angle =
            anim.startAngle +
            anim.direction *
            eased *
            Math.PI *
            2 *
            anim.rotations;

          // ==========================
          // POSITION
          // ==========================

          const x =
            anim.centerX +
            Math.cos(angle) *
            radius;

          const y =
            anim.centerY +
            Math.sin(angle) *
            radius;

          // ==========================
          // ROTATION
          // ==========================

          const rotate =
            anim.direction *
            eased *
            1440;

          // ==========================
          // SCALE
          // ==========================

          /*
            Slowly becomes tiny
            as it enters the hole.
          */

          const scale =
            1 -
            eased * 0.98;

          // ==========================
          // FADE
          // ==========================

          let opacity = 1;

          if (progress > 0.82) {

            opacity =
              1 -
              (
                (progress - 0.82) /
                0.18
              );
          }

          // ==========================
          // APPLY
          // ==========================

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

          // ==========================
          // FINISHED
          // ==========================

          if (progress >= 1) {

            /*
              At progress = 1:

              radius = 0

              So element's center is
              EXACTLY at black hole center.
            */

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

            anim.el.style.opacity = "0";

            anim.el.style.visibility =
              "hidden";

            anim.finished = true;

            finishedCount++;
          }
        });

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

    // ==============================
    // WAIT
    // ==============================

    await new Promise(resolve =>
      setTimeout(
        resolve,
        SETTINGS.restartDelay
      )
    );

    if (stopped)
      return;

    // ==============================
    // NEW RANDOM CYCLE
    // ==============================

    runCycle();
  }

  // ==============================
  // STOP FUNCTION
  // ==============================

  window.__blackHoleStop = () => {

    stopped = true;

    if (frame) {
      cancelAnimationFrame(frame);
    }

    restore();

    document
      .getElementById(VORTEX_ID)
      ?.remove();

    document
      .getElementById(HOLE_ID)
      ?.remove();

    document
      .getElementById(STYLE_ID)
      ?.remove();

    console.log(
      "Black-hole animation stopped."
    );
  };

  // ==============================
  // START
  // ==============================

  runCycle();

  console.log(
    "Black-hole spiral animation started."
  );

  console.log(
    "Every element gets random speed and rotations."
  );

  console.log(
    "Run __blackHoleStop() to stop."
  );

})();
      
