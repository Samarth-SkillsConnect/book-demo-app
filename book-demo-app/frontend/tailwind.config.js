// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,jsx}",
//     "./components/**/*.{js,jsx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",        // Added ts/tsx for completeness
    "./components/**/*.{js,jsx,ts,tsx}",   // Added ts/tsx for completeness
    "./app/**/*.{js,jsx,ts,tsx}",          // Added for Next.js 'app' directory support
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: 0, transform: "translateX(-32px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: 0, transform: "translateX(32px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "bounce-in": {
          "0%": { opacity: 0, transform: "scale(0.8)" },
          "60%": { opacity: 1, transform: "scale(1.05)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        }
      },
      animation: {
        "fade-in": "fade-in 0.7s cubic-bezier(.4,0,.2,1) both",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both",
        "slide-in-left": "slide-in-left 0.7s cubic-bezier(.4,0,.2,1) both",
        "slide-in-right": "slide-in-right 0.7s cubic-bezier(.4,0,.2,1) both",
        "bounce-in": "bounce-in 0.6s cubic-bezier(.4,0,.2,1) both"
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        "card": "0 4px 24px 0 rgba(80, 112, 255, 0.10)",
        "focus": "0 0 0 3px rgba(80, 112, 255, 0.25)",
      },
      colors: {
        "primary": "#3763f4",
        "primary-dark": "#2743b8",
        "accent": "#6366f1",
        "background": "#f0f4fa",
      }
    }
  // },
  // plugins: [
  //   require('@tailwindcss/forms'),
  //   require('@tailwindcss/typography'),
  //   require('@tailwindcss/aspect-ratio'),
  // ],
}
}