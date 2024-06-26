"use client";

import React, { useState } from "react";

import styles from "./nux.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Installation docs</h1>
      <p>
        <ul className={styles.content}>
          <li>
            <a href="https://docs.replay.io/test-suites/cypress/cypress-installation">
              Cypress
            </a>
          </li>
          <li>
            <a href="https://docs.replay.io/test-suites/playwright/playwright-installation">
              Playwright
            </a>
          </li>

          <li>
            <a href="https://docs.replay.io/test-suites/puppeteer">Puppeteer</a>
          </li>

          <li>
            <a href="https://docs.replay.io/test-suites/jest">Jest</a>
          </li>

          <li>
            <a href="https://docs.replay.io/test-suites/webdriver-io">
              Webdriver-io
            </a>
          </li>
        </ul>
      </p>
    </div>
  );
}

export function TestRunsNUX() {
  const [testRunner, setTestRunner] = useState("");
  const cypressCodeString = `const { defineConfig } = require('cypress');
// Add this line to require the replay plugin
const { plugin: replayPlugin } = require('@replayio/cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Add this line to install the replay plugin
      replayPlugin(on, config, {
        upload: true,
        apiKey: process.env.REPLAY_API_KEY,
      });
      // Make sure that setupNodeEvents returns config
    }
  }
});`;

  const playwrightCodeString = `import { PlaywrightTestConfig, devices } from "@playwright/test";
  import { devices as replayDevices } from "@replayio/playwright";
   
  const config: PlaywrightTestConfig = {
    reporter: [["@replayio/playwright/reporter", {
      apiKey: process.env.REPLAY_API_KEY,
      upload: true
    }], ['line']],
    projects: [
      {
        name: "replay-chromium",
        use: { ...replayDevices["Replay Chromium"] as any },
      }
    ],
  };
  export default config;`;

  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <div className={styles["instructions"]}>
          <div className="my-8 text-lg">&lt;- Back to library</div>
          <h1 className={styles["default"]}>Let&apos;s get started</h1>
          <p>
            Please select your test runner and follow the instructions below. If
            you have any questions, please check out our{" "}
            <a href="https://docs.replay.io" className="underline">
              documentation
            </a>
            .
          </p>
        </div>

        <h1>Team name</h1>
        <div className={styles.teamNameContainer}>
          <input
            type="text"
            value="<team name goes here>"
            className={`${styles["input-style"]} ${styles["team-name"]}`}
          />
          <button disabled className={styles.saveButton}>
            Save
          </button>
        </div>
        <label htmlFor="test-runner" className={styles["section-header"]}>
          Test runner
        </label>
        <select
          className={styles["select-style"]}
          id="test-runner"
          value={testRunner}
          onChange={(e) => setTestRunner(e.target.value)}
        >
          <option value="">Select a test runner</option>
          <option value="cypress">Cypress</option>
          <option value="playwright">Playwright</option>
          <option value="jest">Jest</option>
        </select>

        <label htmlFor="package-manager" className={styles["section-header"]}>
          Package manager
        </label>
        <select className={styles["select-style"]} id="package-manager">
          <option value="npm">npm</option>
          <option value="yarn">Yarn</option>
          <option value="pnpm">pnpm</option>
        </select>

        <hr className={styles["default"]} />

        {testRunner === "cypress" && (
          <div className={styles["instructions-list"]}>
            <p className={styles["step-number"]}>
              1. Install the @replayio/cypress package in your project
            </p>
            <input
              type="text"
              value="npm install @replayio/cypress -D"
              className={styles["input-style"]}
            />

            <p className={styles["step-number"]}>
              2. Add the Replay plugin to cypress.config.js
            </p>
            <pre className={styles["textarea-style-pre"]}>
              {cypressCodeString}
            </pre>

            <p className={styles["step-number"]}>
              3. Import Replay to your support file
            </p>
            <input
              type="text"
              value="require('@replayio/cypress/support');"
              className={styles["input-style"]}
            />

            <p className={styles["step-number"]}>
              4. Save this API key in your .env file (remember to save!)
            </p>
            <input
              type="text"
              value="rwk_j6hPY4bAcpFivoNIPcOT0h4tgkOL4WqOH7Zblah"
              className={styles["input-style"]}
            />

            <p className={styles["step-number"]}>
              5. Run cypress as you normally would
            </p>
            <input
              type="text"
              value="npx cypress run --browser replay-chromium"
              className={styles["input-style"]}
            />
          </div>
        )}
        {testRunner === "playwright" && (
          <div className={styles["instructions-list"]}>
            <p className={styles["step-number"]}>
              1. Install the @replayio/playwright package in your project
            </p>
            <input
              type="text"
              value="npm install @replayio/playwright -D"
              className={styles["input-style"]}
            />

            <p className={styles["step-number"]}>
              2. Add Replay Chromium browser and Replay Reporter to your
              playwright.config.ts file.
            </p>
            <pre className={styles["textarea-style-pre"]}>
              {playwrightCodeString}
            </pre>

            <p className={styles["step-number"]}>
              3. Save this API key in your .env file (remember to save!)
            </p>
            <input
              type="text"
              value="rwk_j6hPY4bAcpFivoNIPcOT0h4tgkOL4WqOH7Zblah"
              className={styles["input-style"]}
            />

            <p className={styles["step-number"]}>
              4. Run playwright as you normally would
            </p>
            <input
              type="text"
              value="npx playwright test --project replay-chromium"
              className={styles["input-style"]}
            />
          </div>
        )}
        {testRunner === "jest" && (
          <div className={styles["instructions-list"]}>
            <p className={styles["step-number"]}>
              1. Install replay-node,{" "}
              <a href="https://docs.replay.io/reference-guide/recording/replay-node-(experimental)">
                as described here
              </a>
            </p>

            <p className={styles["text-description"]}>
              2. Run{" "}
              <span className={styles["code"]}>
                replay-node --exec $jestCmd
              </span>{" "}
              to record the test. For example:{" "}
              <span className={styles["code"]}>
                replay-node --exec npm test
              </span>{" "}
              would record all of the tests run by the test script in your
              package.json,
              <span className={styles["code"]}>
                replay-node --exec npm run test -- specific.test.ts
              </span>{" "}
              would pass “specific.test.ts” to npm run test and record that.
            </p>
          </div>
        )}
      </div>
      <div className={styles["backgroundImage"]}></div>
    </div>
  );
}

export default TestRunsNUX;
