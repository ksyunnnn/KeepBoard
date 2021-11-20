/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  purge: ['./src/**/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        black: '#36312E',
      },
      spacing: {
        'sm-full': 'calc(100vh - 2rem)',
        'screen-1/4': '25vh',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['disabled'],
      textColor: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        '.container': {
          padding: theme('spacing.4'),
          maxWidth: theme('screens.sm'),
          '@screen sm': {
            maxWidth: theme('screens.sm'),
          },
          '@screen md': {
            maxWidth: theme('screens.sm'),
          },
          '@screen lg': {
            maxWidth: theme('screens.sm'),
          },
        },
      });
    },
  ],
};
