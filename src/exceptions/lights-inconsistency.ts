import { Inconsistency } from './inconsistency.class';

export class LightsInconsistency extends Inconsistency {
  private constructor(public _code: string, public _message: string) {
    super(_code, _message);
  }

  static missingLocation() {
    return new LightsInconsistency(
      'LIG01',
      'La ubicación ingresada no existe.',
    );
  }

  static missingNewStatus() {
    return new LightsInconsistency(
      'LIG02',
      'Ingrese el nuevo estado de la luz.',
    );
  }
}
