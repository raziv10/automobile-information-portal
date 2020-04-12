export class BaseModel {
  id: number;
  name: string;

  constructor(item?: BaseModel) {
    if (item) {
      this.id = item.id;
      this.name = item.name;
    }
  }
}
