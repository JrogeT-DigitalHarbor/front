import { environment } from 'src/environments/environment';

export class Utils {

  public static set(key: string, value: any): void {
    if (typeof (sessionStorage) !== 'undefined') {
      sessionStorage.setItem(key, this.encryptData(value));
    } else {
      Utils.log('Utils:undefined');
    }
  }

  public static get(key: string): string {
    if (typeof (sessionStorage) !== 'undefined') {
      const item = sessionStorage.getItem(key);
      if (item == null) {
        return '';
      }
      const decrypt = this.decryptData(item);
      return decrypt;
    } else {
      Utils.log('Utils:undefined');
      return '';
    }
  }

  private static encryptData(data: string): string {
    return data;
  }

  private static decryptData(data: string): string {
    return data;
  }

  public static delete(key: string): void {
    if (typeof (sessionStorage) !== 'undefined') {
      sessionStorage.removeItem(key);
    } else {
      Utils.log('Utils:undefined');
    }
  }

  public static deleteAll(): void {
    if (typeof (sessionStorage) !== 'undefined') {
      sessionStorage.clear();
    } else {
      Utils.log('NOT DEFINED SESSION');
    }
  }

  public static log(printable: any): void {
    if (!environment.production) {
      console.log(printable);
    }
  }

  public static getSectionNumber(sectionName: string): number {
    const sections: Array<string> = ['hospitals', 'doctors', 'patients', 'specialties'];
    return sections.indexOf(sectionName);
  }
}
