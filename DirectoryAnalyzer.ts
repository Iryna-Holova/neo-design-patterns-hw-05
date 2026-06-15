import * as fs from 'fs';
import * as path from 'path';
import { DirectoryReport } from './DirectoryReport';

export class DirectoryAnalyzer {
  analyze(dirPath: string): DirectoryReport {
    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) {
      throw new Error(`Path is not a directory: ${dirPath}`);
    }

    const report: DirectoryReport = {
      files: 0,
      directories: 0,
      totalSize: 0,
      extensions: {},
    };

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const entryStats = fs.statSync(fullPath);

      if (entry.isDirectory()) {
        report.directories++;
        const subReport = this.analyze(fullPath);
        report.files += subReport.files;
        report.directories += subReport.directories;
        report.totalSize += subReport.totalSize;

        // Merge extensions from subdirectory
        for (const ext in subReport.extensions) {
          if (report.extensions[ext]) {
            report.extensions[ext] += subReport.extensions[ext];
          } else {
            report.extensions[ext] = subReport.extensions[ext];
          }
        }
      } else if (entry.isFile()) {
        report.files++;
        report.totalSize += entryStats.size;

        const ext = path.extname(entry.name).toLowerCase();
        if (report.extensions[ext]) {
          report.extensions[ext]++;
        } else {
          report.extensions[ext] = 1;
        }
      }
    }
    return report;
  }
}
