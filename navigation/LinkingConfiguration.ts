import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Home: {
        screens: {
          HomeScreen: 'home',
        },
      },
      Technology: {
        screens: {
          TechnologyScreen: 'technology',
          },
        },
    },
  },
};
