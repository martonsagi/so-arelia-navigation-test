export class CaseList {
  message = 'CaseList with parameter';
  refNo = 'empty';

  // set parameters
  activate(params) {
    this.refNo = params.RefNo || 'empty';
    console.log("activated: case-list");
  }
}
