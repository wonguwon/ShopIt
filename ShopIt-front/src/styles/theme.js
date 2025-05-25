const theme = {
  colors: {
    primary: '#646cff',
    secondary: '#535bf2',
    info: '#61dafb',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  fontSizes: {
    xs: '12px',    // 0.75rem
    sm: '14px',    // 0.875rem
    base: '16px',  // 1rem
    lg: '18px',    // 1.125rem
    xl: '20px',    // 1.25rem
    '2xl': '24px', // 1.5rem
    '3xl': '30px', // 1.875rem
    '4xl': '36px', // 2.25rem
    '5xl': '48px', // 3rem
  },
  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },
  spacing: {
    0: '0px',
    1: '4px',   // 0.25rem
    2: '8px',   // 0.5rem
    3: '12px',  // 0.75rem
    4: '16px',  // 1rem
    5: '20px',  // 1.25rem
    6: '24px',  // 1.5rem
    8: '32px',  // 2rem
    10: '40px', // 2.5rem
    12: '48px', // 3rem
    16: '64px', // 4rem
    20: '80px', // 5rem
    24: '96px', // 6rem
    32: '128px',// 8rem
    40: '160px',// 10rem
    48: '192px',// 12rem
    56: '224px',// 14rem
    64: '256px',// 16rem
  },
  borderRadius: {
    none: '0px',
    sm: '2px',    // 0.125rem
    base: '4px',  // 0.25rem
    md: '6px',    // 0.375rem
    lg: '8px',    // 0.5rem
    xl: '12px',   // 0.75rem
    '2xl': '16px',// 1rem
    '3xl': '24px',// 1.5rem
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

export default theme; 