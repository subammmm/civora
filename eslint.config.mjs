import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextVitals,
  { rules: { 'react/no-unescaped-entities': 'off' } },
  // Legacy, non-Next code kept in the repo; never linted before (next lint only covered app/ and lib/).
  { ignores: ['frontend/**', 'python_backend/**', 'public/**', 'scripts/**', 'tests/**', 'deploy_scripts/**'] },
];

export default config;
