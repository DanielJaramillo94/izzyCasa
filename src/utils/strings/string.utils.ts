export class StringUtils {
  static toHumanString(name: string) {
    const words = name.match(/[A-Za-z][a-z]*/g) || [];
    const humanString = words.join(' ');
    return humanString.charAt(0) + humanString.slice(1).toLowerCase();
  }
}
