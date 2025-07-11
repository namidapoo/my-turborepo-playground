#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Create coverage directory structure
const coverageDir = path.join(__dirname, "../coverage");
const mergedDir = path.join(coverageDir, "merged");
const reportDir = path.join(coverageDir, "report");

// Ensure directories exist
if (!fs.existsSync(mergedDir)) {
	fs.mkdirSync(mergedDir, { recursive: true });
}
if (!fs.existsSync(reportDir)) {
	fs.mkdirSync(reportDir, { recursive: true });
}

try {
	// Find all coverage.json files
	const coverageFiles = [];
	const searchForCoverageFiles = (dir) => {
		const files = fs.readdirSync(dir);
		files.forEach((file) => {
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory()) {
				searchForCoverageFiles(filePath);
			} else if (file === "coverage.json") {
				coverageFiles.push(filePath);
			}
		});
	};

	searchForCoverageFiles(path.join(__dirname, "../packages"));

	if (coverageFiles.length === 0) {
		console.log("No coverage files found.");
		return;
	}

	console.log(`Found ${coverageFiles.length} coverage files:`);
	coverageFiles.forEach((file) => console.log(`  - ${file}`));

	// Merge coverage files
	const mergedFile = path.join(mergedDir, "coverage.json");
	execSync(`npx nyc merge ${coverageFiles.join(" ")} ${mergedFile}`);

	// Generate report
	execSync(`npx nyc report --reporter=html --reporter=text --report-dir=${reportDir} --temp-dir=${mergedDir}`);

	console.log("Coverage reports merged successfully!");
	console.log(`HTML report available at: ${path.join(reportDir, "index.html")}`);
} catch (error) {
	console.error("Error merging coverage reports:", error.message);
	process.exit(1);
}