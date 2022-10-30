export class UserModel {

  constructor(public email: string,
              public id: string,
              private _token: string,
              private _tokenExpiryDate: Date) {}

  get token(){

    if(!this._tokenExpiryDate || this._tokenExpiryDate < new Date()){
      return null;
    }
    return this._token;
  }
}
