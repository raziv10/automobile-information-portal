import {BaseModel} from './base-model';

export class AddressModel extends BaseModel {
  company: string;
  email: string;
  contact: string;
  timing: string;
  location: string;
  district: string;
  zipCode: number;
  ratings: number;
  longitude: number;
  latitude: number;
}
