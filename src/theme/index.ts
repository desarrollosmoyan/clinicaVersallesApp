import {createTheme} from '@rneui/themed';
export const theme = createTheme({
  lightColors: {
    primary: '#0A188D',
  },
  darkColors: {
    primary: 'blue',
  },
  components: {
    Button: {
      raised: true,
    },
  },
});
