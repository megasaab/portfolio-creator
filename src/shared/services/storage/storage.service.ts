import { Injectable, Logger } from '@nestjs/common';
import { Category, CategoryDocument } from '../../schemas/Categories/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpResponse } from '../../../response';
import { INTERNAL_ERROR } from '../../../constants';
import { SecurityService } from '../security/security.service';
import { Vendor, VendorDocument } from '../../schemas/Vendors/vendor.schema';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>,
    private securityService: SecurityService) {
  }

  async createProductsInStorage(dto: Category): Promise<HttpResponse> {

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

  async createVendor(vendorDto: Vendor): Promise<HttpResponse> {

    let httpResponse: HttpResponse;

    try {

      const vendor: Vendor = await this.vendorModel.create(vendorDto);

      if (vendor) {
        httpResponse = new HttpResponse(true, vendor);
      }
    } catch (err) {
      this.logger.error(`Error while create vendor: ${vendorDto}\n${err}`);
      httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
    }

    return httpResponse;
  }
}
