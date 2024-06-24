export class StringUtil {
  constructor() { }

  static convertJsonToYaml(objJson: Record<string, string | number | boolean>): string {
    const lines: string[] = [];

    for (const [key, value] of Object.entries(objJson)) {
      let yamlValue: string;

      if (typeof value === 'string') {
        if (value.match(/[:#{}[\],&*!|>'"%@`]/)) {
          yamlValue = `"${value}"`;
        } else {
          yamlValue = value;
        }
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        yamlValue = value.toString();
      } else {
        yamlValue = JSON.stringify(value);
      }

      lines.push(`${key}: ${yamlValue}`);
    }

    return lines.join('\n');
  }

}