(() => {
  // Stop previous version
  window.__blackHoleStop?.();

  const STYLE_ID = "__bh_style__";
  const HOLE_ID = "__bh_hole__";

  document.getElementById(STYLE_ID)?.remove();
  document.getElementById(HOLE_ID)?.remove();

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
          #000 38%,
          #09000f 52%,
          rgba(70,0,130,.8) 64%,
          rgba(130,20,255,.3) 72%,
          transparent 78%
        );

      box-shadow:
        0 0 25px rgba(130,0,255,.8),
        0 0 70px rgba(100,0,255,.5),
        0 0 150px rgba(70,0,180,.3);

      z-index: 2147483647;

      pointer-events: none;
    }

    #${HOLE_ID}::before {
      content: "";

      position: absolute;

      left: 50%;
      top: 50%;

      width: 220%;
      height: 55%;

      transform:
        translate(-50%, -50%)
        rotate(-15deg);

      border-radius: 50%;

      border-top: 8px solid rgba(255,120,0,.55);
      border-bottom: 8px solid rgba(110,0,255,.65);

      filter: blur(7px);

      animation: bhDisk 6s linear infinite;
    }

    #${HOLE_ID}::after {
      content: "";

      position: absolute;

      left: 50%;
      top: 50%;

      width: 65%;
      height: 65%;

      transform: translate(-50%, -50%);

      border-radius: 50%;

      background: #000;

      box-shadow:
        inset 0 0 35px #000,
        0 0 25px #000;
    }

    @keyframes bhDisk {
      from {
        transform:
          translate(-50%, -50%)
          rotate(0deg);
      }

      to {
        transform:
          translate(-50%, -50%)
          rotate(360deg);
      }
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
  // BLACK HOLE
  // ==============================

  const hole = document.createElement("div");

  hole.id = HOLE_ID;

  document.body.appendChild(hole);

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

    if (el.closest(`#${HOLE_ID}`))
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
