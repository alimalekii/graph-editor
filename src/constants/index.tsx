/**
 * Regex patterns for process config validation
 * @constant
 */
export const CONFIG_REGEX_MAP = {
  hdfsValidation: {
    regex: /^hdfs:\/\/[a-zA-Z0-9_.-]+(:\d+)?(\/[^\/]+)+\/?$/,
    example: 'hdfs://namenode.example.com:8020/user/example/directory',
  },
  numericValidation: {
    regex: /^\d+$/,
    example: '12345',
  },
  memoryValidation: {
    regex: /^\d+[kKmMgGtT]?$/,
    example: '512m',
  },
  booleanValidation: {
    regex: /^(true|false)$/,
    example: 'true',
  },
  directoryValidation: {
    regex: /^\/(?:[\w.-]+\/)*[\w.-]+$/,
    example: 'user/data-folder_01',
  },
  usernameValidation: {
    regex: /^[a-zA-Z]\w{3,19}$/,
    example: 'User123',
  },
  portValidation: {
    regex:
      /^(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|\d{1,4})$/,
    example: '8080',
  },
  urlValidation: {
    regex:
      /^(https?):\/\/(www\.)?([a-zA-Z0-9\-\.]+)\.([a-z]{2,5})([\/\w \.-]*)*\/?$/,
    example: 'http://www.example.com/path/to/resource?query=123',
  },
  ipValidation: {
    regex:
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])){3}$/,
    example: '192.168.1.1',
  },
  mongodbId: {
    regex: /^[0-9a-fA-F]{24}$/,
    example: '6579c504ad9466b212d262f4',
  },
  sparkMemoryValidation: {
    regex: /^(?:(\d+(?:\.\d+)?)([kKmMgGtTpPeE])?)?$/,
    example: '6579c504ad9466b212d262f4',
  },
  logicalOperatorValidation: {
    regex: /^(and|or)$/,
    example: 'and',
  },
  mongoConnectionStringeValidation: {
    regex:
      /^mongodb(?:\+srv)?:(?:\/\/)?(?:([^:@]+?):([^:@]+?)@)?(\w+?(?:\.\w+?)*):(\d+)(?:\/(\w+?))?(?:\?([\w=&]+))?$/,
    example: 'placeholder',
  },
  countMethodValidation: {
    regex: /^(distinct|count|approximate)$/,
    example: '"distinct" or "count" or "approximate"',
  },
  folderNameValidation: {
    regex: /^[a-zA-Z0-9_-]+$/,
    example: '"distinct" or "count" or "approximate"',
  },
  doubleNumericValidation: {
    regex: /^0(\.\d+)?$/,
    example: 'Double number',
  },
  hdfsdirectoryValidationRegex: {
    regex:
      /^hdfs:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}\/[a-zA-Z0-9_-]+$/,
    example: 'hdfs://192.168.11.95:9000/checkpoints',
  },
  sparkMemoryRegex: {
    regex: /^[0-9]+[kKmMgG]$/,
    example: '10G',
  },
  webServerPort: {
    regex: /^[1-9]\d{3}\/api$/,
    example: '42069/api',
  },
};
