// import Cookies from 'universal-cookie'
// const cookies = new Cookies();


// class CookiesService {
// //   GET
// get(name) {
//     return cookies.get(name);
// }
// // SET
// set(name,value,options) {
//     return cookies.set(name,value, options)
// }
// // REMOVE 
// remove(name, options) {
//     return cookies.remove(name, options) 
// }

// }

// export default new CookiesService()

import Cookies from 'universal-cookie';
import type { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

class CookiesService {
  // GET
  get(name: string): string | undefined {
    return cookies.get(name);
  }

  // SET
  set(name: string, value: any, options?: CookieSetOptions): void {
    cookies.set(name, value, options);
  }

  // REMOVE
  remove(name: string, options?: CookieSetOptions): void {
    cookies.remove(name, options);
  }
}

export default new CookiesService();