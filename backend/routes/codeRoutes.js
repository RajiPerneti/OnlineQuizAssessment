const express = require("express");
const router = express.Router();

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

function runProcess(command, args, input, timeout = 5000) {
  return new Promise((resolve) => {
    const process = spawn(command, args);

    let stdout = "";
    let stderr = "";
    let finished = false;

    const timer = setTimeout(() => {
      if (!finished) {
        finished = true;
        process.kill();

        resolve({
          type: "runtime_error",
          output: "Execution timed out.",
        });
      }
    }, timeout);

    process.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    process.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    process.on("error", (error) => {
      clearTimeout(timer);

      if (!finished) {
        finished = true;

        resolve({
          type: "runtime_error",
          output: error.message,
        });
      }
    });

    process.on("close", (code) => {
      clearTimeout(timer);

      if (finished) return;

      finished = true;

      if (code !== 0) {
        resolve({
          type: "error",
          output: stderr.trim() || stdout.trim(),
        });
        return;
      }

      resolve({
        type: "success",
        output: stdout.trim(),
      });
    });

    if (input) {
      process.stdin.write(input);
    }

    process.stdin.end();
  });
}

router.post("/execute", async (req, res) => {
  const {
    language,
    code,
    input,
    expectedOutput,
  } = req.body;

  if (!language || !code) {
    return res.status(400).json({
      message: "Language and code are required.",
    });
  }

  const expected = String(expectedOutput || "").trim();

  // =========================
  // JAVASCRIPT
  // =========================

  if (language === "JavaScript") {
    try {
      const outputs = [];

      const customConsole = {
        log: (...values) => {
          outputs.push(values.join(" "));
        },
      };

      const executeCode = new Function(
        "console",
        code
      );

      executeCode(customConsole);

      const actualOutput = outputs.join("\n").trim();

      return res.json({
        status:
          actualOutput === expected
            ? "correct"
            : "wrong",

        output: actualOutput,
        expectedOutput: expected,
      });
    } catch (error) {
      return res.json({
        status: "syntax_error",
        output: error.message,
        expectedOutput: expected,
      });
    }
  }

  // =========================
  // PYTHON
  // =========================

  if (language === "Python") {
    const tempFolder = fs.mkdtempSync(
      path.join(os.tmpdir(), "quiz-python-")
    );

    const filePath = path.join(
      tempFolder,
      "main.py"
    );

    try {
      fs.writeFileSync(filePath, code);

      const result = await runProcess(
        "python",
        [filePath],
        input || ""
      );

      fs.rmSync(tempFolder, {
        recursive: true,
        force: true,
      });

      if (result.type === "error") {
        return res.json({
          status: "syntax_error",
          output: result.output,
          expectedOutput: expected,
        });
      }

      if (result.type === "runtime_error") {
        return res.json({
          status: "runtime_error",
          output: result.output,
          expectedOutput: expected,
        });
      }

      return res.json({
        status:
          result.output === expected
            ? "correct"
            : "wrong",

        output: result.output,
        expectedOutput: expected,
      });

    } catch (error) {
      return res.json({
        status: "runtime_error",
        output: error.message,
        expectedOutput: expected,
      });
    }
  }

  // =========================
  // JAVA
  // =========================

  if (language === "Java") {
    const tempFolder = fs.mkdtempSync(
      path.join(os.tmpdir(), "quiz-java-")
    );

    const filePath = path.join(
      tempFolder,
      "Main.java"
    );

    try {
      fs.writeFileSync(filePath, code);

      const compileResult = await runProcess(
        "javac",
        [filePath],
        ""
      );

      if (compileResult.type === "error") {
        fs.rmSync(tempFolder, {
          recursive: true,
          force: true,
        });

        return res.json({
          status: "syntax_error",
          output: compileResult.output,
          expectedOutput: expected,
        });
      }

      const runResult = await runProcess(
        "java",
        [
          "-cp",
          tempFolder,
          "Main",
        ],
        input || ""
      );

      fs.rmSync(tempFolder, {
        recursive: true,
        force: true,
      });

      if (runResult.type === "error") {
        return res.json({
          status: "runtime_error",
          output: runResult.output,
          expectedOutput: expected,
        });
      }

      if (runResult.type === "runtime_error") {
        return res.json({
          status: "runtime_error",
          output: runResult.output,
          expectedOutput: expected,
        });
      }

      return res.json({
        status:
          runResult.output === expected
            ? "correct"
            : "wrong",

        output: runResult.output,
        expectedOutput: expected,
      });

    } catch (error) {
      return res.json({
        status: "runtime_error",
        output: error.message,
        expectedOutput: expected,
      });
    }
  }

  // =========================
  // C / C++
  // =========================

  if (
    language === "C" ||
    language === "C++"
  ) {
    return res.json({
      status: "not_supported",
      output:
        "C/C++ compiler is not installed yet.",
      expectedOutput: expected,
    });
  }

  return res.json({
    status: "not_supported",
    output: `Unsupported language: ${language}`,
    expectedOutput: expected,
  });
});

module.exports = router;