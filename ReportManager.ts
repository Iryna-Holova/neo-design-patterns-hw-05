import { ReportAdapter } from './ReportAdapter';
import { JsonReportAdapter } from './JsonReportAdapter';
import { CsvReportAdapter } from './CsvReportAdapter';
import { XmlReportAdapter } from './XmlReportAdapter';
import { AnalyzerFacade } from './AnalyzerFacade';
import * as fs from 'fs';
import * as path from 'path';

export class ReportManager {
  private static readonly REPORTS_DIR = 'reports';
  private adapter: ReportAdapter;
  private fileExtension: string;
  private facade: AnalyzerFacade;

  constructor(format: string = 'json') {
    this.initReportsDirectory();
    [this.adapter, this.fileExtension] = this.getAdapter(format);
    this.facade = new AnalyzerFacade(this.adapter);
  }

  private initReportsDirectory(): void {
    if (!fs.existsSync(ReportManager.REPORTS_DIR)) {
      fs.mkdirSync(ReportManager.REPORTS_DIR);
    }
  }

  private getAdapter(format: string): [ReportAdapter, string] {
    switch (format.toLowerCase()) {
      case 'json':
        return [new JsonReportAdapter(), 'json'];
      case 'csv':
        return [new CsvReportAdapter(), 'csv'];
      case 'xml':
        return [new XmlReportAdapter(), 'xml'];
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  generateReport(dirPath: string): void {
    const reportContent = this.facade.generateReport(dirPath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportFileName = `report-${timestamp}.${this.fileExtension}`;
    const reportFilePath = path.join(
      ReportManager.REPORTS_DIR,
      reportFileName,
    );

    fs.writeFileSync(reportFilePath, reportContent);
    console.log(`Report generated successfully: ${reportFilePath}`);
  }
}
