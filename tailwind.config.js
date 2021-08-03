module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'scale-up': 'scaleUp 1s forwards',
        loader: 'spinner 1.5s linear infinite',
      },
      keyframes: {
        scaleUp: {
          from: {
            opacity: '0',
            transform: 'scale(0.8)',
          },
          to: {
            opacity: 'initial',
            transform: 'initial',
          },
        },

        spinner: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },

    variants: {
      extend: {
        backgroundColor: ['even'],
      },
    },
    plugins: [],
  },
}
