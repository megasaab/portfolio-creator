import {ApiProperty} from "@nestjs/swagger";

export class HttpResponse {

  @ApiProperty({
    description: 'Result request handing',
    example: 'true'
  })
  success: boolean;
  @ApiProperty({
    description: 'Returned data, if success = true',
    example: this,
  })
  data?: any;
  @ApiProperty({
    description: 'Error describes, if success = false',
    example: ' [\n' +
        '            "Internal server error",\n' +
        '            "MongoServerError: E11000 duplicate key error collection: portfolio-db.users index: login_1 dup key: { login: \\"something\\" }"\n' +
        '        ]'
  })
  errors?: any[];

  constructor(success: boolean, data?: any, errors?: any[]) {
    this.success = success;
    this.data = data;
    this.errors = errors;
  }

}
