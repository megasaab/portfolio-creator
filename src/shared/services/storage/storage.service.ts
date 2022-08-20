import { Injectable, Logger } from '@nestjs/common';
import { Category, CategoryDocument } from '../../schemas/Categories/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpResponse } from '../../../response';
import { INTERNAL_ERROR } from '../../../constants';
import { SecurityService } from '../security/security.service';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>, private securityService: SecurityService) {
  }

  async createProductsInStorage(dto: Category) {

    let httpResponse: HttpResponse;

    try {

      dto.subCategory.forEach(subCategory => {
        subCategory.uuid = this.securityService.generateUuid();
        subCategory.products.forEach(products => {
          products.uuid = this.securityService.generateUuid();
        });
      });

      const category: Category = await this.categoryModel.create(dto);

      if (category) {
        httpResponse = new HttpResponse(true, category);
      }
    } catch (err) {
      this.logger.error(`Error while create category/products: ${dto}\n${err}`);
      httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
    }

    return httpResponse;
  }
}
