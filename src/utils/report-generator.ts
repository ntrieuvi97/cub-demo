import reporter from 'cucumber-html-reporter';

const options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber-report.json',
    output: 'reports/cucumber-report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "Development",
        "Browser": "Chromium",
        "Platform": "Windows",
        "Executed": "Local"
    }
};

reporter.generate(options);