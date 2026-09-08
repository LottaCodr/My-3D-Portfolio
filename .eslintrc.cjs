module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',

    // This project is plain JavaScript with no `prop-types` declarations
    // anywhere, so per-prop PropTypes validation is not part of the workflow.
    'react/prop-types': 'off',

    // Every section in this app is exported through the SectionWrapper HOC
    // (`export default SectionWrapper(About, 'about')`). Fast Refresh cannot
    // statically analyse a call-expression export, so this rule reports on the
    // intentional HOC pattern rather than on a real defect.
    'react-refresh/only-export-components': 'off',
  },
  overrides: [
    {
      // These files render React Three Fiber elements (<mesh>, <ambientLight>,
      // <primitive>, <Points>, ...). Their props are three.js scene-graph
      // properties, not DOM attributes, so eslint-plugin-react's DOM allowlist
      // reports false positives for them.
      files: ['src/components/canvas/**/*.jsx'],
      rules: {
        'react/no-unknown-property': 'off',
      },
    },
  ],
}
