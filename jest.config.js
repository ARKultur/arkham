import { defaults } from 'jest-config';

/** @type {import('jest').Config} */
const config = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  transformIgnorePatterns: [
    '/node_modules/(?!(@react-native|react-native)/).*/',
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
};

export default config;
