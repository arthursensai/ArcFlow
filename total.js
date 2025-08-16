const fs = require('fs');
const path = require('path');

const targetExtensions = ['.ts', '.tsx', '.js', '.jsx'];
const ignoreDirs = ['node_modules', '.next'];
const ignoreFiles = ['package-lock.json'];

let totalLines = 0;
let totalFiles = 0;
let logData = [];

function countLinesInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.split('\n').length;
}

function scanDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (!ignoreDirs.includes(entry.name)) {
        scanDirectory(fullPath);
      }
    } else if (
      targetExtensions.includes(path.extname(fullPath)) &&
      !ignoreFiles.includes(path.basename(fullPath))
    ) {
      const lineCount = countLinesInFile(fullPath);
      totalLines += lineCount;
      totalFiles++;
      
      // Log file details
      logData.push({
        file: fullPath,
        lines: lineCount,
        extension: path.extname(fullPath)
      });
    }
  }
}

function writeLogFile() {
  const timestamp = new Date().toISOString();
  const logContent = [
    `Code Analysis Log - ${timestamp}`,
    `===========================================`,
    ``,
    `Summary:`,
    `- Total lines of code: ${totalLines}`,
    `- Files counted: ${totalFiles}`,
    ``,
    `File Details:`,
    ...logData.map(item => `${item.file} - ${item.lines} lines (${item.extension})`),
    ``,
    `Extensions breakdown:`,
    ...Object.entries(
      logData.reduce((acc, item) => {
        acc[item.extension] = (acc[item.extension] || 0) + 1;
        return acc;
      }, {})
    ).map(([ext, count]) => `${ext}: ${count} files`),
    ``
  ].join('\n');

  const logFileName = `code-analysis-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.log`;
  fs.writeFileSync(logFileName, logContent);
  console.log(`📝 Log file created: ${logFileName}`);
}

scanDirectory(process.cwd());

console.log(`✅ Total lines of code: ${totalLines}`);
console.log(`📁 Files counted: ${totalFiles}`);

writeLogFile();