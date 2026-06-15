import { ReportAdapter } from './ReportAdapter';
import { DirectoryReport } from './DirectoryReport';

export class XmlReportAdapter implements ReportAdapter {
  export(report: DirectoryReport): string {
    const extensionsXml = Object.entries(report.extensions)
      .map(([ext, count]) => `    <extension name="${ext}" count="${count}"/>`)
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<report>\n  <files>${report.files}</files>\n  <directories>${report.directories}</directories>\n  <totalSize>${report.totalSize}</totalSize>\n  <extensions>\n${extensionsXml}\n  </extensions>\n</report>`;
  }
}
