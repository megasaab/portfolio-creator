import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/services/security/security-guards';
import { Category } from '../../../shared/schemas/Categories/category.schema';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { Vendor } from '../../../shared/schemas/Vendors/vendor.schema';

@UseGuards(JwtAuthGuard)
@Controller('v1/storage')
export class StorageController {

  constructor(private storageService: StorageService) {
  }

  @Post('/create')
  createProductsInStorage(@Body() categoryDto: Category) {
      return this.storageService.createProductsInStorage(categoryDto);
  }

  @Post('/create-vendor')
  createVendor(@Body() vendorDto: Vendor) {
    return this.storageService.createVendor(vendorDto);
  }
}
