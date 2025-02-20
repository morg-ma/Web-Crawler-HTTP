# Web Crawler

## Overview
This project is a simple web crawler built with Node.js that recursively crawls web pages on a given domain, extracts links, and generates a report on the number of times each page was found.

## Features
- Crawls a website and extracts internal links.
- Normalizes URLs to avoid duplicate entries.
- Generates a report listing pages and their link occurrences.
- Includes Jest tests for URL normalization, link extraction, and sorting logic.

## Installation
### Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/morg-ma/Web-Crawler-HTTP.git
   cd Web-Crawler-HTTP
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
Run the crawler with:
```sh
npm start <website-url>
```
Example:
```sh
npm start https://example.com
```

## Project Structure
- **main.js**: Entry point that starts crawling and prints the report.
- **crawl.js**: Implements the web crawling logic.
- **report.js**: Generates and prints the report.
- **crawl.test.js**: Tests for URL normalization and link extraction.
- **report.test.js**: Tests for sorting the crawled pages.
- **package.json**: Defines project metadata and dependencies.

## Testing
Run tests using:
```sh
npm test
```

