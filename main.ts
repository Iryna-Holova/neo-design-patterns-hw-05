import { ReportManager } from './ReportManager';

const targetPath = process.argv[2] || '.';
const format = process.argv[3] || 'json';

try {
  const reportManager = new ReportManager(format);
  reportManager.generateReport(targetPath);
} catch (err: any) {
  console.error(`Error: ${err.message}`);
  console.error(`Supported formats: json, csv, xml`);
  console.error(`Usage: npx ts-node main.ts <path> <format>`);
  process.exit(1);
} 