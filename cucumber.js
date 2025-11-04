module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/steps/**/*.ts', 'src/support/**/*.ts'],
    format: ['progress', 'html:test-reports/cucumber-report.html', 'junit:test-reports/cucumber-report.xml'],
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['tests/**/*.feature'],
    // Set default timeout to 60 seconds (60000 milliseconds)
    timeout: 60000
  }
};
