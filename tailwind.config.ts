import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        space: ["Space Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        spacedark: "#0a1128",
        space: {
          purple: "#7e22ce",
          indigo: "#4f46e5",
          blue: "#2563eb",
          violet: "#8b5cf6",
          pink: "#db2777",
          cyan: "#0891b2",
        },
        cosmic: {
          purple: "#9333ea",
          indigo: "#4338ca",
          pink: "#be185d",
          blue: "#1e40af",
          deep: "#020617",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowing: {
          "0%": { 
            boxShadow: "0 0 5px rgba(138, 43, 226, 0.7)",
            opacity: "0.7"
          },
          "50%": { 
            boxShadow: "0 0 20px rgba(138, 43, 226, 0.9), 0 0 30px rgba(138, 43, 226, 0.3)",
            opacity: "1"
          },
          "100%": { 
            boxShadow: "0 0 5px rgba(138, 43, 226, 0.7)",
            opacity: "0.7"
          }
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" }
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        rotate3d: {
          "0%": { transform: "rotate3d(0, 1, 0, 0deg)" },
          "100%": { transform: "rotate3d(0, 1, 0, 360deg)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glowing": "glowing 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fadeIn": "fadeIn 0.7s ease-in-out",
        "rotate3d": "rotate3d 15s linear infinite",
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to right bottom, rgb(126, 34, 206), rgb(79, 70, 229), rgb(37, 99, 235))',
        'cosmic-purple': 'linear-gradient(to right, rgb(147, 51, 234), rgb(79, 70, 229))',
        'cosmic-fade': 'linear-gradient(to bottom, rgba(10, 17, 40, 0), rgba(10, 17, 40, 1))',
        'star-pattern': 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      },
      dropShadow: {
        'cosmic': '0 0 10px rgba(138, 43, 226, 0.5)',
        'cosmic-lg': '0 0 20px rgba(138, 43, 226, 0.7)',
      },
      textShadow: {
        'cosmic': '0 0 10px rgba(138, 43, 226, 0.7)',
      },
      boxShadow: {
        'cosmic': '0 0 15px rgba(138, 43, 226, 0.5)',
        'cosmic-lg': '0 0 30px rgba(138, 43, 226, 0.7)',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
