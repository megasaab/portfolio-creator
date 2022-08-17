export class HttpResponse {

  /* Result request handing */
  success: boolean;
  /* Returned data, if success = true */
  data?: any;
  /* Error describes, if success = false */
  errors?: any[];

  constructor(success: boolean, data?: any, errors?: any[]) {
    this.success = success;
    this.data = data;
    this.errors = errors;
  }

}
