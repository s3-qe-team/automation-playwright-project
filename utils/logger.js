/**
 * Simple logger utility for test execution
 */

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

class Logger {
  constructor(context = 'TEST') {
    this.context = context;
  }

  /**
   * Format log message
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @returns {string} Formatted log message
   */
  formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }

  /**
   * Log error message
   * @param {string} message - Error message
   */
  error(message) {
    console.error(this.formatMessage(LOG_LEVELS.ERROR, message));
  }

  /**
   * Log warning message
   * @param {string} message - Warning message
   */
  warn(message) {
    console.warn(this.formatMessage(LOG_LEVELS.WARN, message));
  }

  /**
   * Log info message
   * @param {string} message - Info message
   */
  info(message) {
    console.log(this.formatMessage(LOG_LEVELS.INFO, message));
  }

  /**
   * Log debug message
   * @param {string} message - Debug message
   */
  debug(message) {
    if (process.env.DEBUG === 'true') {
      console.log(this.formatMessage(LOG_LEVELS.DEBUG, message));
    }
  }

  /**
   * Log test step
   * @param {string} step - Test step description
   */
  step(step) {
    console.log(this.formatMessage(LOG_LEVELS.INFO, `STEP: ${step}`));
  }
}

module.exports = Logger;
