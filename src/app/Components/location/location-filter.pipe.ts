import {Pipe, PipeTransform} from '@angular/core';
import {AddressModel} from '../../custom-common/models/address.model';

@Pipe({
  name:'locationFilter'
})
export class LocationFilterPipe implements PipeTransform{
  transform(location: AddressModel[], searchTerm: string) {
    if(!location || !searchTerm){
      return location;
    }
    return location.filter(item =>
      item.location.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1
      || item.district.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1);
  }
}
