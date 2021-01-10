import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textLight: '#e4ebf2',
    primary: '#0366d6',
    background: '#24292',
    mainBackground: '#e1e4e8'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    font: Platform.select({
      android: 'Roboto',
      ios: 'Arial'
    })
  
  },
  fontWeights: {
    normal: '500',
    bold: '700',
  },
};

export default theme;
