'use client';
import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cubesData, interpolate } from '@/cubes/cubesPostion';
import Lenis from 'lenis';
import gsap from 'gsap';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const stickySectionRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const cubeElementsRefs = useRef<HTMLDivElement[]>([]);
  const headerPrimaryRef = useRef<HTMLDivElement>(null);
  const headerSecondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollInstance = new Lenis();
    scrollInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      scrollInstance.raf(time * 600);
    });
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.create({
      id: 'stickySectionTrigger',
      trigger: stickySectionRef.current,
      start: 'top top',
      end: () => `+=${stickySectionRef.current?.offsetHeight}px`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (scrollState: { progress: number }) => {
        const progress = scrollState.progress;

        if (logoContainerRef.current) {
          const logoBlur = Math.min(progress * 20, 1);
          logoContainerRef.current.style.filter = `blur(${interpolate(0, 20, logoBlur)}px)`;
          const logoOpacity = progress >= 0.03 ? Math.min((progress - 0.03) * 20, 1) : 0;
          logoContainerRef.current.style.opacity = `${1 - logoOpacity}`;
        }

        if (headerPrimaryRef.current) {
          const fadeStart = 0.08;
          const fadeDuration = 0.7;
          let headerOpacity = 1;
          if (progress > fadeStart) {
            headerOpacity = Math.max(1 - (progress - fadeStart) / fadeDuration, 0);
          }
          const scaleFactor = interpolate(1, 2, 1 - headerOpacity);
          const blurEffect = interpolate(0, 20, 1 - headerOpacity);
          headerPrimaryRef.current.style.opacity = `${headerOpacity}`;
          headerPrimaryRef.current.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
          headerPrimaryRef.current.style.filter = `blur(${blurEffect}px)`;
        }

        if (headerSecondaryRef.current) {
          let secondaryOpacity = 0;
          if (progress > 0.6) {
            secondaryOpacity = progress < 0.8 ? (progress - 0.6) / 0.2 : 1;
          }
          headerSecondaryRef.current.style.opacity = `${secondaryOpacity}`;
        }

        const firstPhaseProgress = Math.min(progress * 2, 1);
        const secondPhaseProgress = progress >= 0.5 ? (progress - 0.5) * 2 : 0;

        Object.entries(cubesData).forEach(([cubeClass, cubeData]) => {
          const cube = document.querySelector(`.${cubeClass}`) as HTMLElement;
          if (!cube) return;

          const { initial, final } = cubeData;
          const currentTop = interpolate(initial.top, final.top, firstPhaseProgress);
          const currentLeft = interpolate(initial.left, final.left, firstPhaseProgress);
          const currentRotateX = interpolate(initial.rotateX, final.rotateX, firstPhaseProgress);
          const currentRotateY = interpolate(initial.rotateY, final.rotateY, firstPhaseProgress);
          const currentRotateZ = interpolate(initial.rotateZ, final.rotateZ, firstPhaseProgress);
          const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);

          let additionalRotation = 0;
          if (cubeClass === 'cube-2') additionalRotation = interpolate(0, 180, secondPhaseProgress);
          if (cubeClass === 'cube-4') additionalRotation = interpolate(0, -180, secondPhaseProgress);

          cube.style.top = `${currentTop}%`;
          cube.style.left = `${currentLeft}%`;
          cube.style.transform = `translate3d(-50%, -50%, ${currentZ}px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY + additionalRotation}deg) rotateZ(${currentRotateZ}deg)`;
          cube.style.opacity = progress >= 0.01 ? '1' : '0';
        });
      }
    });

    return () => {
      scrollInstance.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ScrollTrigger.getAll().forEach((trigger: { kill: () => any }) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <section className="sticky h-screen bg-[#331707] text-[#ffe9d9]" ref={stickySectionRef}>
        <div
          className="logo absolute top-[24%] sm:top-[28%] md:top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4 sm:gap-6 z-20"
          ref={logoContainerRef}
        >
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <div className="flex flex-col items-center justify-end" key={rowIndex}>
              {Array.from({ length: 2 }).map((_, colIndex) => {
                const blockIndex = rowIndex * 2 + colIndex + 1;
                return (
                  <div
                    className={` ${blockIndex === 1
                      ? 'w-7 h-7 sm:w-9 sm:h-9 rotate-[42deg] origin-bottom-right'
                      : blockIndex === 3
                        ? 'w-7 h-7 sm:w-9 sm:h-9 translate-y-[-80%] origin-center-bottom'
                        : blockIndex === 5
                          ? 'w-7 h-7 sm:w-9 sm:h-9 rotate-[-42deg] origin-bottom-left'
                          : 'w-7 h-7 sm:w-9 sm:h-9'
                      } bg-[#ffe9d9]`}
                    key={blockIndex}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="cubes absolute top-0 left-0 h-screen w-full transform-style-preserve-3d perspective-1000">
          {Array.from({ length: 6 }).map((_, index) => {
            const images = {
              front: `/asset/${index + 1}-front.jpeg`,
              back: `/asset/${index + 1}-back.jpeg`,
              left: `/asset/${index + 1}-left.jpeg`,
              right: `/asset/${index + 1}-right.jpeg`,
              top: `/asset/${index + 1}-top.jpeg`,
              bottom: `/asset/${index + 1}-bottom.jpeg`,
            };

            return (
              <div
                className={`cube absolute w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] transform-style-preserve-3d opacity-0 cube-${index + 1}`}
                ref={(el) => { cubeElementsRefs.current[index] = el!; }}
                key={index}
              >
                {Object.entries(images).map(([side, imgSrc]) => (
                  <div
                    key={side}
                    className={`absolute w-full h-full transform-style-preserve-3d backface-hidden ${side} bg-yellow-700 z-20 relative`}
                  >
                    <Image
                      src={imgSrc}
                      alt={side}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div>
<div className="w-11/12 sm:w-3/4 md:w-3/5 lg:w-3/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center origin-center" ref={headerPrimaryRef}>
  <h1>The First Media Company crafted For the <br></br>Digital First generation</h1>
</div>


          <div className="header-two mt-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-[60%] md:w-[45%] text-center opacity-0" ref={headerSecondaryRef}>
<h2 className="text-base sm:text-lg md:text-2xl font-bold mb-3 font-[Inter]">
  Where innovation meets precision.
</h2>
<p className="text-sm sm:text-base md:text-lg leading-[1]">
Symphonia unites visionary thinkers, creative architects, and analytical experts, collaborating seamlessly to transform challenges into opportunities. Together, we deliver tailored solutions that drive impact and inspire growth.</p>

          </div>
        </div>
      </section>
    </div>
  );
}
