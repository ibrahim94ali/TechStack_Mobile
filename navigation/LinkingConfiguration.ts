import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Home: {
        screens: {
          HomeScreen: 'one',
          NewTechScreen: 'tw2o',
        },
      },
      Technology: {
        screens: {
          TechnologyScreen: 'two',
          },
        },
    },
  },
};
