(() => {

  window.__blackHoleStop?.();

  const STYLE_ID = "__bh_style__";
  const HOLE_ID = "__bh_hole__";
  const VORTEX_ID = "__bh_vortex__";

  document.getElementById(STYLE_ID)?.remove();
  document.getElementById(HOLE_ID)?.remove();
  document.getElementById(VORTEX_ID)?.remove();

  const SETTINGS = {
    minDuration: 18000,
    maxDuration: 50000,

    minRotations: 2.2,
    maxRotations: 6.5,

    restartDelay: 3500,

    holeSize: 150,

    vortexOpacity: 0.28,
    vortexSpeed: 0.000035,

    trailCount: 13
  };

  const style = document.createElement("style");

  style.id = STYLE_ID;

  style.textContent = `

    #${HOLE_ID} {
      position: fixed;

      left: 50%;
      top: 50%;

      width: ${SETTINGS.holeSize}px;
      height: ${SETTINGS.holeSize}px;

      transform:
        translate(-50%, -50%);

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          #000 0%,
          #000 48%,
          rgba(0,0,0,.98) 57%,
          rgba(0,0,0,.72) 69%,
          transparent 82%
        );

      box-shadow:
        0 0 25px rgba(255,255,255,.09),
        0 0 70px rgba(0,0,0,.85),
        0 0 130px rgba(0,0,0,.5);

      z-index: 2147483647;

      pointer-events: none;

      overflow: visible;
    }

    #${HOLE_ID}::before {
      content: "";

      position: absolute;

      left: 50%;
      top: 50%;

      width: 108%;
      height: 24%;

      transform:
        translate(-50%, -50%)
        rotate(-15deg);

      border-radius: 50%;

      background:
        radial-gradient(
          ellipse,
          rgba(255,255,255,.12) 0%,
          rgba(255,255,255,.045) 30%,
          transparent 72%
        );

      filter: blur(6px);

      opacity: .16;

      animation:
        bhOval 4.5s
        ease-in-out
        infinite;

      pointer-events: none;
    }

    @keyframes bhOval {

      0% {
        transform:
          translate(-50%, -50%)
          rotate(-15deg)
          scaleX(.94);
      }

      25% {
        transform:
          translate(-50%, -50%)
          rotate(30deg)
          scaleX(1.04);
      }

      50% {
        transform:
          translate(-50%, -50%)
          rotate(82deg)
          scaleX(.96);
      }

      75% {
        transform:
          translate(-50%, -50%)
          rotate(130deg)
          scaleX(1.03);
      }

      100% {
        transform:
          translate(-50%, -50%)
          rotate(165deg)
          scaleX(.94);
      }
    }

    #${HOLE_ID}::after {
      content: "";

      position: absolute;

      left: 50%;
      top: 50%;

      width: 68%;
      height: 68%;

      transform:
        translate(-50%, -50%);

      border-radius: 50%;

      background: #000;

      box-shadow:
        inset 0 0 35px #000,
        inset 0 0 15px rgba(255,255,255,.03);

      pointer-events: none;
    }

    #${VORTEX_ID} {
      position: fixed;

      left: 50%;
      top: 50%;

      width: min(145vmin, 1600px);
      height: min(145vmin, 1600px);

      transform:
        translate(-50%, -50%);

      pointer-events: none;

      z-index: 2147483645;

      overflow: visible;

      opacity: ${SETTINGS.vortexOpacity};

      transform-origin: center center;
    }

    #${VORTEX_ID} svg {
      width: 100%;
      height: 100%;

      overflow: visible;

      animation:
        bhVortexRotation
        55s
        linear
        infinite;

      transform-origin:
        50% 50%;
    }

    @keyframes bhVortexRotation {

      from {
        transform:
          rotate(0deg)
          scale(1);
      }

      50% {
        transform:
          rotate(180deg)
          scale(.97);
      }

      to {
        transform:
          rotate(360deg)
          scale(1);
      }
    }

    .__bh_trail {
      fill: none;

      stroke: rgba(255,255,255,.38);

      stroke-linecap: round;

      filter:
        blur(2px);

      transform-origin:
        center;

      animation:
        bhTrailPulse
        var(--trail-duration)
        ease-in-out
        infinite alternate;
    }

    .__bh_trail:nth-child(odd) {
      stroke:
        rgba(255,255,255,.22);
    }

    .__bh_trail:nth-child(3n) {
      stroke:
        rgba(255,255,255,.12);

      filter:
        blur(4px);
    }

    @keyframes bhTrailPulse {

      from {
        opacity: .25;
      }

      to {
        opacity: .75;
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

      transform-origin:
        center center !important;
    }

  `;

  document.head.appendChild(style);

  const hole =
    document.createElement("div");

  hole.id = HOLE_ID;

  document.body.appendChild(hole);

  const vortex =
    document.createElement("div");

  vortex.id = VORTEX_ID;

  vortex.innerHTML = `
    <svg
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >

      <path
        class="__bh_trail"
        style="--trail-duration: 4.7s"
        stroke-width="7"
        d="
          M 40 440
          C 180 170, 520 100, 760 250
          C 940 365, 900 620, 700 700
          C 480 790, 260 690, 285 510
          C 305 360, 505 315, 620 390
          C 715 452, 670 575, 565 590
          C 465 605, 420 520, 470 465
          C 515 416, 580 440, 588 490
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 5.4s"
        stroke-width="11"
        d="
          M 110 680
          C 60 440, 245 180, 520 155
          C 785 130, 930 320, 830 520
          C 730 720, 475 770, 330 630
          C 200 505, 310 340, 480 330
          C 650 320, 720 450, 645 540
          C 585 612, 480 590, 460 520
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 6.2s"
        stroke-width="4"
        d="
          M 20 530
          C 140 770, 450 900, 690 770
          C 910 650, 930 400, 760 260
          C 570 105, 320 180, 250 360
          C 190 510, 330 660, 485 630
          C 620 605, 665 500, 590 440
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 4.2s"
        stroke-width="13"
        d="
          M 160 280
          C 390 80, 760 130, 875 360
          C 970 555, 810 775, 570 810
          C 330 845, 145 690, 190 500
          C 225 350, 390 285, 525 350
          C 635 402, 650 520, 570 575
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 5.8s"
        stroke-width="6"
        d="
          M 75 350
          C 280 220, 470 230, 630 330
          C 820 450, 790 650, 620 700
          C 440 755, 280 655, 315 510
          C 340 405, 465 370, 555 420
          C 625 460, 610 535, 555 555
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 7s"
        stroke-width="9"
        d="
          M 900 600
          C 760 860, 390 890, 170 670
          C -10 490, 100 240, 350 180
          C 600 120, 840 245, 835 460
          C 830 635, 625 715, 480 620
          C 355 540, 390 410, 500 380
          C 590 355, 655 420, 625 485
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 4.9s"
        stroke-width="5"
        d="
          M 300 70
          C 600 30, 880 210, 900 460
          C 920 710, 690 900, 440 850
          C 205 805, 85 620, 165 440
          C 230 295, 420 270, 545 350
          C 665 428, 660 550, 570 600
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 6.5s"
        stroke-width="8"
        d="
          M 760 80
          C 950 250, 940 520, 790 700
          C 600 925, 280 850, 145 650
          C 15 455, 150 250, 360 210
          C 575 170, 760 310, 715 480
          C 675 625, 510 670, 420 560
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 5.1s"
        stroke-width="3"
        d="
          M 50 760
          C 220 900, 520 930, 750 790
          C 950 670, 970 390, 810 230
          C 640 60, 370 95, 225 250
          C 90 395, 165 570, 325 600
          C 465 625, 555 545, 520 475
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 5.9s"
        stroke-width="10"
        d="
          M 220 860
          C 60 700, 55 430, 225 250
          C 400 65, 700 120, 820 300
          C 940 480, 825 700, 620 735
          C 420 770, 270 640, 330 495
          C 375 385, 510 360, 585 430
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 4.4s"
        stroke-width="6"
        d="
          M 820 850
          C 590 930, 300 860, 180 670
          C 40 450, 150 220, 390 170
          C 630 120, 850 270, 820 480
          C 795 650, 600 720, 455 625
          C 335 545, 360 420, 470 375
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 6.8s"
        stroke-width="4"
        d="
          M 470 25
          C 730 80, 930 270, 890 510
          C 850 760, 600 900, 360 820
          C 130 745, 80 520, 190 345
          C 295 180, 510 190, 620 305
          C 720 410, 670 550, 570 590
        "
      />

      <path
        class="__bh_trail"
        style="--trail-duration: 5.6s"
        stroke-width="12"
        d="
          M 40 250
          C 260 90, 590 80, 800 240
          C 1000 390, 925 660, 710 760
          C 470 875, 205 735, 210 520
          C 215 335, 400 260, 555 345
          C 685 415, 690 535, 585 600
        "
      />

    </svg>
  `;

  document.body.appendChild(vortex);

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

  const elements =
    all.filter(el => {

      if (ignored.has(el.tagName))
        return false;

      if (
        el.closest(
          `#${HOLE_ID}, #${VORTEX_ID}`
        )
      )
        return false;

      const r =
        el.getBoundingClientRect();

      if (
        r.width < 2 ||
        r.height < 2
      )
        return false;

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

  const visualElements =
    elements.filter(el => {

      let parent =
        el.parentElement;

      while (
        parent &&
        parent !== document.body
      ) {

        if (
          elements.includes(parent)
        )
          return false;

        parent =
          parent.parentElement;
      }

      return true;
    });

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

  const random =
    (min, max) =>
      min +
      Math.random() *
      (max - min);

  const randomDirection =
    () =>
      Math.random() > .5
        ? 1
        : -1;

  function shuffle(array) {

    const result =
      [...array];

    for (
      let i =
        result.length - 1;
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

  let stopped = false;
  let frame = null;

  async function runCycle() {

    if (stopped)
      return;

    restore();

    await new Promise(resolve =>
      setTimeout(
        resolve,
        1200
      )
    );

    if (stopped)
      return;

    const centerX =
      window.innerWidth / 2;

    const centerY =
      window.innerHeight / 2;

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

        const duration =
          random(
            SETTINGS.minDuration,
            SETTINGS.maxDuration
          );

        const rotations =
          random(
            SETTINGS.minRotations,
            SETTINGS.maxRotations
          );

        const direction =
          randomDirection();

        const phase =
          random(
            -0.35,
            0.35
          );

        const spiralStrength =
          random(
            .82,
            1.25
          );

        const wobble =
          random(
            .015,
            .055
          );

        const rotationOffset =
          random(
            -180,
            180
          );

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

          phase,
          spiralStrength,
          wobble,

          rotationOffset,

          startTime:
            null,

          finished:
            false
        };
      });

    animations.forEach(anim => {

      const {
        state,
        el
      } = anim;

      el.classList.add(
        "__bh_moving"
      );

      el.style.left =
        state.left +
        "px";

      el.style.top =
        state.top +
        "px";

      el.style.width =
        state.width +
        "px";

      el.style.height =
        state.height +
        "px";

      el.style.opacity =
        "1";

      el.style.visibility =
        "visible";
    });

    await new Promise(resolve => {

      function animate(now) {

        if (stopped) {

          resolve();

          return;
        }

        let finishedCount =
          0;

        animations.forEach(anim => {

          if (anim.finished) {

            finishedCount++;

            return;
          }

          if (
            anim.startTime === null
          ) {

            anim.startTime =
              now +
              random(
                0,
                5000
              );
          }

          let progress =
            (
              now -
              anim.startTime
            ) /
            anim.duration;

          if (progress < 0) {

            progress = 0;
          }

          progress =
            Math.min(
              progress,
              1
            );

          const eased =
            1 -
            Math.pow(
              1 - progress,
              3.25
            );

          const radius =
            anim.distance *
            Math.pow(
              1 - eased,
              1.28
            );

          const angularProgress =
            Math.pow(
              eased,
              2.05
            );

          const angle =
            anim.startAngle +
            anim.phase +
            anim.direction *
            angularProgress *
            Math.PI *
            2 *
            anim.rotations *
            anim.spiralStrength;

          const wobbleAmount =
            Math.sin(
              eased *
              Math.PI *
              5 +
              anim.phase * 10
            ) *
            anim.distance *
            anim.wobble *
            (1 - eased);

          const x =
            anim.centerX +
            Math.cos(angle) *
            radius +
            Math.cos(angle + Math.PI / 2) *
            wobbleAmount;

          const y =
            anim.centerY +
            Math.sin(angle) *
            radius +
            Math.sin(angle + Math.PI / 2) *
            wobbleAmount;

          const rotate =
            anim.rotationOffset +
            anim.direction *
            angularProgress *
            randomRotationMultiplier(
              anim.rotations
            );

          const scale =
            Math.max(
              .012,

              1 -
              Math.pow(
                eased,
                1.72
              ) *
              .988
            );

          const stretch =
            1 +
            Math.pow(
              eased,
              2.4
            ) *
            2.2;

          const squash =
            1 /
            Math.sqrt(
              stretch
            );

          const blur =
            Math.min(
              3.5,
              eased * 3.5
            );

          let opacity =
            1;

          if (
            progress >
            .84
          ) {

            opacity =
              1 -
              (
                (
                  progress -
                  .84
                ) /
                .16
              );
          }

          anim.el.style.left =
            (
              x -
              anim.state.width / 2
            ) +
            "px";

          anim.el.style.top =
            (
              y -
              anim.state.height / 2
            ) +
            "px";

          anim.el.style.transform =
            `
              rotate(${rotate}deg)
              scale(
                ${scale * stretch},
                ${scale * squash}
              )
            `;

          anim.el.style.opacity =
            opacity;

          if (
            progress >= 1
          ) {

            anim.el.style.left =
              (
                anim.centerX -
                anim.state.width / 2
              ) +
              "px";

            anim.el.style.top =
              (
                anim.centerY -
                anim.state.height / 2
              ) +
              "px";

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

    await new Promise(resolve =>
      setTimeout(
        resolve,
        SETTINGS.restartDelay
      )
    );

    if (stopped)
      return;

    runCycle();
  }

  function randomRotationMultiplier(
    rotations
  ) {

    return (
      1200 +
      rotations * 180
    );
  }

  window.__blackHoleStop = () => {

    stopped = true;

    if (frame) {

      cancelAnimationFrame(
        frame
      );
    }

    restore();

    document
      .getElementById(
        VORTEX_ID
      )
      ?.remove();

    document
      .getElementById(
        HOLE_ID
      )
      ?.remove();

    document
      .getElementById(
        STYLE_ID
      )
      ?.remove();

    console.log(
      "Black-hole vortex animation stopped."
    );
  };

  runCycle();

  console.log(
    "Black-hole dimensional vortex started."
  );

  console.log(
    "Objects have random slow speed, direction, rotation, phase and spiral strength."
  );

  console.log(
    "Run __blackHoleStop() to stop."
  );

})();

