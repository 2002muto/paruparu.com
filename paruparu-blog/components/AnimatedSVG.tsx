"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedSVG = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<SVGGElement>(null);
  const sentence = useRef<any[]>([]);
  const letters = useRef<{ [key: string]: SVGElement }>({});

  useEffect(() => {
    const svg = svgRef.current;
    const stage = stageRef.current;
    if (!svg || !stage) return;

    const colors = [
      "#f80c12",
      "#ff9933",
      "#d0c310",
      "#69d025",
      "#12bdb9",
      "#4444dd",
      "#442299",
    ];
    const availableLetters = "abcdefghijklmnopqrstuvwxyz".split("");

    // SVG <defs>から文字のテンプレートを取得
    availableLetters.forEach((letter) => {
      const el = svg.querySelector(`#letter-${letter}`);
      if (el) {
        letters.current[letter] = el as SVGElement;
      }
    });

    const breakUp = (path: SVGPathElement): string[] => {
      const lengthChunks = 3;
      const length = path.getTotalLength();
      if (length === 0) return [];
      const count = Math.ceil(length / lengthChunks);
      const toReturn: string[] = [];
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i <= count; i++) {
        points.push(path.getPointAtLength(lengthChunks * i));
      }

      let chunks: { x: number; y: number }[][] = [[]];
      while (points.length) {
        if (chunks[0].length > 2 && points.length > 2 && Math.random() < 0.2) {
          chunks.unshift([chunks[0][chunks[0].length - 1]]);
        }
        chunks[0].push(points.shift()!);
      }

      chunks.forEach((chunk) => {
        if (chunk.length < 2) return;
        let pathString = `M${chunk[0].x},${chunk[0].y}`;
        for (let i = 1; i < chunk.length; i++) {
          pathString += `L${chunk[i].x},${chunk[i].y}`;
        }
        toReturn.push(pathString);
      });
      return toReturn;
    };

    const newLetter = (letter: SVGElement) => {
      const letterHolder = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      stage.appendChild(letterHolder);

      const paths = letter.querySelectorAll("path");
      const parts: (SVGPathElement | string)[] = [];

      paths.forEach((path) => {
        parts.push(...breakUp(path));
      });

      paths.forEach((path) => {
        parts.push(path.cloneNode(true) as SVGPathElement);
      });

      const toAnimate: SVGPathElement[] = [];
      parts.forEach((part) => {
        let newPath: SVGPathElement;
        if (typeof part === "string") {
          newPath = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          newPath.setAttribute("d", part);
          newPath.setAttribute("class", "letter");
          newPath.style.fill = "none";
          newPath.style.opacity = "0.7";
          newPath.style.strokeWidth = "10";
          newPath.style.stroke =
            colors[Math.floor(Math.random() * colors.length)];
        } else {
          newPath = part;
          (newPath as any).dontMove = true;
          newPath.style.strokeWidth = "5";
        }
        letterHolder.appendChild(newPath);
        toAnimate.push(newPath);
      });

      toAnimate.forEach((path, i) => {
        const length = path.getTotalLength();
        const startOffset = Math.random() > 0.5 ? -length : length;
        const strokeWidth = path.style.strokeWidth;
        path.style.strokeDasharray = `${length} ${length}`;
        const xyOffset = 200;

        if ((path as any).dontMove) {
          gsap.fromTo(
            path,
            { strokeWidth: 0, strokeDashoffset: startOffset },
            {
              duration: 1,
              strokeWidth: strokeWidth,
              strokeDashoffset: 0,
              delay: 0.8,
              ease: "power4.inOut",
            }
          );
        } else {
          gsap.fromTo(
            path,
            {
              strokeWidth: 1,
              x: `+=${Math.random() * xyOffset - xyOffset / 2}`,
              y: `+=${Math.random() * xyOffset - xyOffset / 2}`,
              scale: 1,
              strokeDashoffset: startOffset,
            },
            {
              duration: 1,
              bezier: [
                {
                  x: Math.random() * xyOffset - xyOffset / 2,
                  y: Math.random() * xyOffset - xyOffset / 2,
                },
                {
                  x: Math.random() * xyOffset - xyOffset / 2,
                  y: Math.random() * xyOffset - xyOffset / 2,
                },
                { x: 0, y: 0 },
              ],
              strokeWidth: strokeWidth,
              rotation: 0,
              scale: 1,
              strokeDashoffset: 0,
              ease: "power3.out",
              delay: i / 100 + Math.random() / 2,
            }
          );
        }
      });

      gsap.set(letterHolder, { transformOrigin: "50% 50%" });
      return letterHolder;
    };

    const positionSentence = () => {
      const letterWidth = 40;
      const letterGap = 10;
      const totalLetterSize = letterWidth + letterGap;
      const containerWidth = svg.clientWidth;
      const containerHeight = svg.clientHeight;

      const sentenceWidth =
        totalLetterSize * sentence.current.length - letterGap;
      const startLeft = (containerWidth - sentenceWidth) / 2;
      const startTop = (containerHeight - letterWidth / 2) / 2;

      sentence.current.forEach((letter, i) => {
        if (letter) {
          gsap.to(letter, {
            duration: 0.3,
            x: startLeft + totalLetterSize * i,
            y: startTop,
          });
        }
      });
    };

    const removeLast = () => {
      if (sentence.current.length > 0) {
        const removed = sentence.current.pop();
        if (removed) {
          const bits = removed.querySelectorAll("path");
          bits.forEach((bit: SVGPathElement) => {
            gsap.to(bit, {
              duration: 0.5,
              x: `+=${(Math.random() - 0.5) * 500}`,
              y: `+=${(Math.random() - 0.5) * 500}`,
              scale: 0,
              opacity: 0,
              rotation: (Math.random() - 0.5) * 360,
              ease: "power2.in",
              onComplete: () => {
                if (removed.parentNode) {
                  removed.parentNode.removeChild(removed);
                }
              },
            });
          });
        }
        positionSentence();
      }
    };

    const onInput = (input: string) => {
      if (letters.current[input]) {
        sentence.current.push(newLetter(letters.current[input]));
        positionSentence();
      } else if (input === "backspace") {
        removeLast();
      }
    };

    let welcomeMessage = "paruparu.com";
    const autoTypeSpeed = 250;

    const addWelcomeLetter = () => {
      if (welcomeMessage.length > 0) {
        onInput(welcomeMessage.substring(0, 1));
        welcomeMessage = welcomeMessage.substring(1);
        setTimeout(addWelcomeLetter, autoTypeSpeed);
      } else {
        setupInput();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      onInput(e.key.toLowerCase());
    };

    const setupInput = () => {
      window.addEventListener("keydown", handleKeyDown);
    };

    addWelcomeLetter();

    const handleResize = () => positionSentence();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#2a2a3e] flex items-center justify-center overflow-hidden">
      <svg ref={svgRef} className="w-full h-full">
        <defs>
          {/* ここにすべての文字のSVGパス定義を追加 */}
          <g id="letter-a">
            <path d="M-12.2,27.5L0.5-20.1l18.6,43.8" />
            <path d="M-15.6,12.4l34.7-8.7" />
          </g>
          <g id="letter-b">
            <path d="M-4.5-16.5l-2.6,44.6" />
            <path d="M-20.1-9.6c0,0,26.9-19.5,34.7-6.9C20.9-6.4,0,1.7,0,1.7s23.7-6.5,23.5,11.7c-0.3,25.7-39.4,6.8-39.4,6.8" />
          </g>
          <g id="letter-c">
            <path d="M18.2-13.6c0,0-27.3-21.4-32.5,17.1s32.5,17.7,32.5,17.7" />
          </g>
          <g id="letter-d">
            <path d="M-6.6-20.1l-1.6,47.5" />
            <path d="M-18.4-11.4c13.7-9.6,31.1-6,37.8,4.7c5,8,4.1,19.5-2.4,26.8c-8.4,9.3-24.8,10.2-36.3,0" />
          </g>
          <g id="letter-e">
            <path d="M8.4,3.6l-21.3,0.5" />
            <path d="M16.3-18.9l-24.4,0.8l-0.8,44.5l22.9-0.2" />
          </g>
          <g id="letter-f">
            <path d="M20.9-17.2l-28.1,0.8l1.6,41" />
            <path d="M4.7,0.9l-22.2,0.8" />
          </g>
          <g id="letter-g">
            <path d="M7.8,3.4l10.3,0.3v20c-9.7,5.4-21,5-28.4-0.8C-21.9,13.6-21.4-8-8.7-16.5c8.6-5.8,21.3-4.7,30.7,3.2" />
          </g>
          <g id="letter-h">
            <path d="M-9.7-16.7l0,40.7" />
            <path d="M13.9-16.7l0,40.7" />
            <path d="M13.9,7.5l-24.4,0" />
          </g>
          <g id="letter-i">
            <path d="M1.7-18.8v44.9" />
          </g>
          <g id="letter-j">
            <path d="M4.5-13c4.7,24.3,4.7,37.4,0,39.4C1.3,27.8-4,24-11.3,15.4" />
            <path d="M-8.1-7.9l22.9-11.4" />
          </g>
          <g id="letter-k">
            <path d="M-9.7-18.8l0.8,44.9" />
            <path d="M3.8-16.4L-9.3,5.8" />
            <path d="M13.1,19.3L-9.3,5.8" />
          </g>
          <g id="letter-l">
            <path d="M13.3,26.1H-9.9v-44.9" />
          </g>
          <g id="letter-m">
            <path d="M26.7,27.3L11.4-20L-1.8,2.9l-8.7-18.1L-23.3,21" />
          </g>
          <g id="letter-n">
            <path d="M15.4-17.6L14.6,21L-12-7.4V25" />
          </g>
          <g id="letter-o">
            <path d="M1.7,23c-9.6,0-16.8-10.3-16.6-19.7c0.2-9.5,8-19.2,17.3-18.9C12.2-15.2,19.2-4,18.2,5.7C17.4,13.9,10.7,23,1.7,23z" />
          </g>
          <g id="letter-p">
            <path d="M-13.3-17.6c18,2.8,30.1,8.6,30,13.4c-0.2,4.6-11.4,9-26,11" />
            <path d="M-10.7,25l4.6-39" />
          </g>
          <g id="letter-q">
            <path d="M0,22c-9.6,0-16.8-10.3-16.6-19.7c0.2-9.5,8-19.2,17.3-18.9C10.5-16.2,17.5-5,16.5,4.7C15.8,12.9,9,22,0,22z" />
            <path d="M0.3,4.3C9.8,19.6,11.8,23.2,20,24" />
          </g>
          <g id="letter-r">
            <path d="M-10.8,28.6l0.7-49.2v-0.2c9.6-2.5,19.4,1.1,22.9,7.7c2.6,4.8,2,11.7-3.5,16.1C3.9,7.3-4.4,7.9-10.8,4.3" />
            <path d="M0.1,6.6l14.2,22.2" />
          </g>
          <g id="letter-s">
            <path d="M13.8-10.3c-1.6-4.3-5.9-7.5-11.1-8c-6.5-0.6-12,3.2-13.9,7.4c-1.7,3.8-0.5,8,2,10.8c4.3,4.8,8.7,5.4,17.3,8 c5.3,1.6,7.8,5.5,6.9,10.2c-0.7,3.9-5.4,6.7-9.7,7.4c-6.5,1-14-2.8-17.3-9.7" />
          </g>
          <g id="letter-t">
            <path d="M-17.7-17.7h38.8" />
            <path d="M1.1,25l0.6-42.7" />
          </g>
          <g id="letter-u">
            <path d="M-14.5-18.9v34.3c0,0,0.2,10.1,7.7,10.6s17.3,0,17.3,0s7.7-1.6,7.4-9.7c-0.3-8.1,0-35.2,0-35.2" />
          </g>
          <g id="letter-v">
            <path d="M16.1-16.3l-13.5,40l-15.2-40" />
          </g>
          <g id="letter-w">
            <path d="M22.8-14.4L7.4,21.7L-2.4,7.6l-10.2,14.1l-6.8-34" />
          </g>
          <g id="letter-x">
            <path d="M18.8-10.5l-34.2,35.4" />
            <path d="M-11-19.5l26.7,46.4" />
          </g>
          <g id="letter-y">
            <path d="M-11.8-14.2L5.9,1.4" />
            <path d="M15.2-20.9L-5.3,28.3" />
          </g>
          <g id="letter-z">
            <path d="M16.3,24.5l-29.1-2.1l29.1-39.5h-29.1" />
          </g>
        </defs>
        <g ref={stageRef} />
      </svg>
    </div>
  );
};

export default AnimatedSVG;
