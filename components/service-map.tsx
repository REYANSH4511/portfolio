"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ReactIcon,
  NodeIcon,
  MongoIcon,
  AwsIcon,
  AIIcon,
  PostgreSQLIcon,
} from "@/components/icons";

const nodes = [
  { id: "react", label: "React", icon: ReactIcon, x: 80, y: 30 },
  { id: "node", label: "Node.js", icon: NodeIcon, x: 180, y: 80 },
  { id: "mongodb", label: "MongoDB", icon: MongoIcon, x: 70, y: 130 },
  { id: "aws", label: "AWS", icon: AwsIcon, x: 190, y: 150 },
  { id: "ai", label: "AI", icon: AIIcon, x: 130, y: 190 },
  { id: "postgresql", label: "PostgreSQL", icon: PostgreSQLIcon, x: 30, y: 190 },
];

const connections = [
  ["react", "node"],
  ["node", "mongodb"],
  ["node", "postgresql"],
  ["node", "aws"],
  ["ai", "node"],
  ["ai", "aws"],
  ["postgresql", "aws"],
];

export function ServiceMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-4, 4]), springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as Window)?.innerWidth
        ? {
            width: window.innerWidth,
            height: window.innerHeight,
          }
        : { width: 0, height: 0 };
      const x = e.clientX - rect.width / 2;
      const y = e.clientY - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative rounded-2xl border border-border bg-elevated/50 p-6 backdrop-blur-sm">
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-accent/5 to-success/5 pointer-events-none" />
      <motion.svg
        viewBox="0 0 240 240"
        className="relative h-full w-full"
        aria-label="Animated microservices architecture diagram showing Reyansh's tech stack. Move your cursor to tilt the map."
        role="img"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 800,
          willChange: "transform",
        }}
      >
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {connections.map(([fromId, toId], i) => {
          const from = nodes.find((n) => n.id === fromId)!;
          const to = nodes.find((n) => n.id === toId)!;
          return (
            <motion.line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              strokeWidth={1.5}
              className="text-border"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.08,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isHovered = hovered === node.id;
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.4 + i * 0.08,
                ease: "easeOut",
              }}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? 28 : 24}
                className="fill-elevated stroke-accent transition-all duration-200"
                strokeWidth={isHovered ? 2 : 1.5}
                filter="url(#glow)"
              />
              <foreignObject
                x={node.x - 12}
                y={node.y - 12}
                width={24}
                height={24}
                className="text-accent pointer-events-none"
              >
                <Icon className="h-6 w-6" />
              </foreignObject>
              {isHovered && (
                <motion.g
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <rect
                    x={node.x - 34}
                    y={node.y + 32}
                    width={68}
                    height={18}
                    rx={4}
                    className="fill-bg stroke-border"
                    strokeWidth={1}
                  />
                  <text
                    x={node.x}
                    y={node.y + 44}
                    textAnchor="middle"
                    className="fill-fg font-mono text-[8px]"
                  >
                    {node.label}
                  </text>
                </motion.g>
              )}
            </motion.g>
          );
        })}

        <motion.circle
          cx={nodes[1].x}
          cy={nodes[1].y}
          r={7}
          className="fill-success"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}
