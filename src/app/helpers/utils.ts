import { Observable } from "rxjs";
import { take } from "rxjs/operators";

export class Utils {

  static getDefaultThumbnail(): string[] {
    return [
      "https://via.placeholder.com/150/92c952",
      "https://via.placeholder.com/150/771796",
      "https://via.placeholder.com/150/24f355",
      "https://via.placeholder.com/150/d32776"
    ]
  }

  static obserableToPromise<T>(observable: Observable<T>): Promise<T> {
    return observable.pipe(take(1)).toPromise();
  }
}