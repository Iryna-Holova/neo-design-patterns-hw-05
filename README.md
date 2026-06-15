# Домашнє завдання до Теми Структурні патерни: Адаптер та Фасад

### Опис завдання

Мета домашнього завдання — опанувати застосування структурних патернів у реальному контексті, а саме:

- Фасад (Facade) — для спрощення складного процесу аналізу і побудови звіту;
- Адаптер (Adapter) — для уніфікації форматів виводу звіту.

Наше домашнє завдання моделює ситуацію зі створення справжньої інструментальної утиліти, яка зустрічається у проектах з CLI-архітектурою.

Реалізуйте консольну утиліту для аналізу файлової системи, яка:

- виконує повний аналіз обраної директорії;
- генерує звіт про її вміст;
- зберігає цей звіт у форматі `JSON`, `CSV` або `XML` залежно від обраного режиму;
- демонструє поєднання двох структурних патернів: Адаптер і Фасад;
- застосовує ієрархію фасадів: високорівневий фасад керує низькорівневим.

Архітектурні особливості застосунку наступні.

- Застосунок має два ієрархічні фасади:
  - `ReportManager` — високорівневий фасад, керує всім життєвим циклом;
  - `AnalyzerFacade` — низькорівневий фасад, координує аналіз і форматування;
- Патерн Адаптер дозволяє підключати нові формати без зміни вже написаної логіки застосунку;
- Розділення обов’язків — кожен компонент відповідає лише за свою зону.

### Патерни проектування

#### 1. Патерн "Фасад"

У проекті реалізовано два рівні фасадів:

1. **AnalyzerFacade** (низькорівневий фасад):
   - Приховує складність роботи з DirectoryAnalyzer
   - Координує взаємодію між аналізатором та адаптером
   - Надає простий метод generateReport()

2. **ReportManager** (високорівневий фасад):
   - Приховує роботу з AnalyzerFacade
   - Керує вибором адаптерів
   - Займається файловою системою
   - Обробляє помилки
   - Форматує імена файлів

#### 2. Патерн "Адаптер"

Реалізовано через інтерфейс ReportAdapter з трьома конкретними реалізаціями:

- JsonReportAdapter
- XmlReportAdapter
- CsvReportAdapter

### Структура файлів

```
├── DirectoryReport.ts    # Інтерфейс звіту
├── DirectoryAnalyzer.ts  # Аналіз директорій
├── ReportAdapter.ts      # Інтерфейс адаптера
├── JsonReportAdapter.ts  # Адаптер для JSON
├── XmlReportAdapter.ts   # Адаптер для XML
├── CsvReportAdapter.ts   # Адаптер для CSV
├── AnalyzerFacade.ts     # Низькорівневий фасад
├── ReportManager.ts      # Високорівневий фасад
└── main.ts              # Точка входу
```

## Встановлення та запуск

1. Встановіть залежності:

```bash
npm install
```

2. Запустіть аналіз:

```bash
# Аналіз поточної директорії з виводом у JSON (за замовчуванням)
npm start

# Аналіз вказаної директорії
npm start ./path/to/directory

# Аналіз з вказаним форматом (json, xml, csv)
npm start ./path/to/directory json
npm start ./path/to/directory xml
npm start ./path/to/directory csv
```

## Результати

Звіти зберігаються в директорії `reports` з іменами виду:

- `report-2026-06-15T17-15-53-498Z.json`
- `report-2026-06-15T17-17-38-692Z.xml`
- `report-2026-06-15T17-18-23-709Z.csv`

Кожен звіт містить:

- Кількість файлів
- Кількість директорій
- Загальний розмір файлів
- Статистику по розширеннях файлів

### Приклад виконання

```bash
$ npx ts-node main.ts "D:\react_native" csv
Report generated successfully: reports\report-2026-06-15T17-18-23-709Z.csv
```

### Приклади формату виводу

[**JSON формат:**](./reports/report-2026-06-15T17-15-53-498Z.json)

```json
{
  "files": 127329,
  "directories": 22371,
  "totalSize": 1236116727,
  "extensions": {
    "": 3947,
    ".json": 4593,
    ".md": 4603,
    ".sample": 42,
    ".js": 41686,
    ".ttf": 67,
    ".svg": 850,
    ...
  }
}
```

[**CSV формат:**](./reports/report-2026-06-15T17-18-23-709Z.csv)

```
Metric,Value
Total Files,127329
Total Directories,22371
Total Size (bytes),1236116727

Extension,Count
,3947
.json,4593
.md,4603
.sample,42
.js,41686
.ttf,67
.svg,850
...
```

[**XML формат:**](./reports/report-2026-06-15T17-17-38-692Z.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<report>
  <files>127329</files>
  <directories>22371</directories>
  <totalSize>1236116727</totalSize>
  <extensions>
    <extension name="" count="3947"/>
    <extension name=".json" count="4593"/>
    <extension name=".md" count="4603"/>
    <extension name=".sample" count="42"/>
    <extension name=".js" count="41686"/>
    <extension name=".ttf" count="67"/>
    <extension name=".svg" count="850"/>
    ...
  </extensions>
</report>
```

## Побудова та типізація

Проект використовує TypeScript з налаштуваннями:

- `strict: true` — перевірка типів у всіх аспектах
- `@types/node` — типи для Node.js API (`fs`, `path`, `process`)
- `tsconfig.json` з явним включенням типів: `"types": ["node"]`

Команди:

```bash
# Компіляція
npm run build

# Запуск через ts-node (з гарячою перезагрузкою)
npm start
```

## Обробка помилок

### Синтаксис команди

```bash
npx ts-node main.ts <path> <format>
```

- `<path>` — абсолютний або відносний шлях до директорії
- `<format>` — один з: `json`, `csv`, `xml` (за замовчуванням: `json`)

### Приклади помилок

**Невідомий формат:**

```bash
$ npx ts-node main.ts "D:\react_native" cku
Error: Unsupported format: cku
Supported formats: json, csv, xml
Usage: npx ts-node main.ts <path> <format>
```

**Директорія не існує:**

```bash
$ npx ts-node main.ts "D:\react_na" csv
Error: ENOENT: no such file or directory, stat 'D:\react_na'
Supported formats: json, csv, xml
Usage: npx ts-node main.ts <path> <format>
```

**Шлях не є директорією**

```bash
$ npx ts-node main.ts "D:\react_native\neoversityApp\app.json" csv
Error: Path is not a directory: D:\react_native\neoversityApp\app.json
Supported formats: json, csv, xml
Usage: npx ts-node main.ts <path> <format>
```

### Успішне виконання

```bash
$ npx ts-node main.ts "D:\react_native" csv
Report generated successfully: reports\report-2026-06-15T17-18-23-709Z.csv
```

## Архітектура

Проект демонструє застосування двох структурних патернів:

### Фасад (Facade)

- Скриває складність системи за простим інтерфейсом
- `AnalyzerFacade` — координує аналіз та форматування
- `ReportManager` — керує всіма етапами: вибір формату, генерація, збереження

### Адаптер (Adapter)

- Забезпечує єдиний інтерфейс `ReportAdapter` для різних форматів
- Дозволяє легко додавати нові формати без змін в іншому коді
- Поточні адаптери: JSON, CSV, XML
