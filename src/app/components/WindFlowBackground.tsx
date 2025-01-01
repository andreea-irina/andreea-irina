"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  isMouseTrail: boolean;
}

interface MousePosition {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  isMoving: boolean;
  lastMoveTime: number;
}

export default function WindFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const mouseParticlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef<MousePosition>({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    isMoving: false,
    lastMoveTime: 0,
  });
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Initialize dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Create wind particle
  const createParticle = (isMouseTrail: boolean = false): Particle => ({
    x: Math.random() * dimensions.width,
    y: Math.random() * dimensions.height,
    vx: 0,
    vy: 0,
    life: Math.random() * 0.5 + 0.5,
    size: 1,
    isMouseTrail,
  });

  // Create mouse particle
  const createMouseParticle = (
    x: number,
    y: number,
    vx: number,
    vy: number,
    speed: number
  ): Particle => ({
    x,
    y,
    vx: vx * 0.5,
    vy: vy * 0.5,
    life: 1,
    size: Math.min(1.5, 0.5 + speed * 0.05),
    isMouseTrail: true,
  });

  // Initialize particles
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const particleCount = Math.floor(
        (dimensions.width * dimensions.height) / 5000
      );
      particlesRef.current = Array.from({ length: particleCount }, () =>
        createParticle()
      );
      mouseParticlesRef.current = [];
    }
  }, [dimensions]);

  // Flow field function
  const getFlowVector = (x: number, y: number, time: number) => {
    const scale = 0.002;
    const timeScale = 0.0002;
    const angle =
      Math.sin(x * scale + time * timeScale) *
      Math.cos(y * scale + time * timeScale) *
      Math.PI *
      2;
    return {
      x: Math.cos(angle) * 2,
      y: Math.sin(angle) * 2,
    };
  };

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentTime = performance.now();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const prevX = mousePositionRef.current.x;
    const prevY = mousePositionRef.current.y;
    const vx = x - prevX;
    const vy = y - prevY;
    const speed = Math.sqrt(vx * vx + vy * vy);

    // Update mouse state
    mousePositionRef.current = {
      x,
      y,
      prevX: prevX || x,
      prevY: prevY || y,
      isMoving: speed > 1,
      lastMoveTime: currentTime,
    };

    // Create particles based on movement
    if (speed > 1) {
      // Moving: create trail particles
      const particleCount = Math.floor(speed / 5) + 1;
      for (let i = 0; i < particleCount; i++) {
        const ratio = i / particleCount;
        const particle = createMouseParticle(
          prevX + vx * ratio,
          prevY + vy * ratio,
          vx,
          vy,
          speed
        );
        mouseParticlesRef.current.push(particle);
      }
    } else {
      // Stationary or slow: create dot particle
      mouseParticlesRef.current.push(createMouseParticle(x, y, 0, 0, 0));
    }
  };

  // Animation loop
  const animate = (timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    timeRef.current = timestamp;

    // Clear canvas with semi-transparent background
    ctx.fillStyle = "rgba(251, 245, 243, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw wind particles
    particlesRef.current.forEach((particle, index) => {
      const flow = getFlowVector(particle.x, particle.y, timestamp);
      particle.vx = flow.x;
      particle.vy = flow.y;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.002;

      if (
        particle.life <= 0 ||
        particle.x < 0 ||
        particle.x > canvas.width ||
        particle.y < 0 ||
        particle.y > canvas.height
      ) {
        particlesRef.current[index] = createParticle();
      }

      const alpha = particle.life * 0.5;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(2, 67, 216, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x + particle.vx * 8, particle.y + particle.vy * 8);
      ctx.stroke();
    });

    // Update and draw mouse particles
    mouseParticlesRef.current = mouseParticlesRef.current.filter((particle) => {
      particle.life -= particle.isMouseTrail ? 0.02 : 0.05;
      if (particle.life <= 0) return false;

      if (particle.vx === 0 && particle.vy === 0) {
        // Static dot rendering
        ctx.beginPath();
        ctx.fillStyle = `rgba(2, 67, 216, ${particle.life * 0.8})`;
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Moving trail rendering
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.96;
        particle.vy *= 0.96;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(2, 67, 216, ${particle.life * 0.8})`;
        ctx.lineWidth = particle.size;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x + particle.vx, particle.y + particle.vy);
        ctx.stroke();
      }

      return true;
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Start animation
  useEffect(() => {
    if (canvasRef.current && dimensions.width && dimensions.height) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      if (ctx) {
        ctx.fillStyle = "#FBF5F3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{ background: "#FBF5F3" }}
      onMouseMove={handleMouseMove}
    />
  );
}
