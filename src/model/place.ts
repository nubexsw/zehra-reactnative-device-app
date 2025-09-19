export class Place {
  title: string;
  imageUri: string;
  address: string;
  location: any;
  id: string;

  constructor(id: any, title: any, imageUri: any, location: any) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location?.address;
    this.location = { lat: location?.lat, lng: location?.lng };
    this.id = id === null ? new Date().toString() + Math.random.toString() : id;
  }
}
