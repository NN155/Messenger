module.exports = {
    reporters: [
      "default",
      [ "jest-html-reporter", {
        pageTitle: "Test Report",
        outputPath: "reports/test-report.html",
      }]
    ],
  };
  