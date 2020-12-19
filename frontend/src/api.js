export default class API {
  /** @param {String} url */
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.loginPath = 'auth/login';
    this.signupPath = 'auth/signup';
    this.userPath = 'user/';
    this.feedPath = 'user/feed';
  }

  // Utility to Handle Different Types of Responses and Raise Specific Errors
  // Partial Attribution :  https://developers.google.com/web/updates/2015/03/introduction-to-fetch
  static status(response) {
    if (response.status === 200) {
      // console.log(response);
      return Promise.resolve(response);
    }
    /*
    if (response.status === 401 || response.status === 403) {
      // console.log(response);
      return Promise.reject(new Error('401 Unauthorized or 403 Forbidden error.'));
    }
    if (response.status === 404) {
      // console.log(response);
      return Promise.reject(new Error('404 error. Either URL is wrong or a network issue'));
    }
    */

    return Promise.reject(response);
  }

  request(path, options) {
    return new Promise((resolve, reject) => {
      const mergedpath = `${this.baseURL}/${path}`;
      fetch(mergedpath, options)
        .then(API.status)
        .then((response) => response.json())
        .then((body) => { resolve(body); })
        .catch((err) => { reject(err); });
    });
  }
}
