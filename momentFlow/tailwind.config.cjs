/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, low-saturation palette
        mf: {
          background: '#f7f3ee', // 米白偏暖
          surface: '#fbf6f0', // 奶油卡片底
          surfaceSoft: '#fdf8f3',
          accent: '#f2a766', // 暖橙
          accentSoft: '#f8c191',
          text: '#3f3a33',
          textMuted: '#7a7167',
          borderSoft: '#e6ded3',
        },
      },
      boxShadow: {
        'mf-card': '0 18px 40px rgba(31, 24, 15, 0.06)',
        'mf-card-soft': '0 10px 24px rgba(31, 24, 15, 0.04)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
