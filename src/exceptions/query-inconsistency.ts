import { Inconsistency } from './inconsistency.class';

export class QueryInconsistency extends Inconsistency {
  private constructor(public _code: string, public _message: string) {
    super(_code, _message);
  }

  static missingId(entityName: string) {
    return new QueryInconsistency('SYS01', entityName + ' ID does not exist.');
  }
}
