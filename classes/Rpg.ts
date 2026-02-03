export default class Rpg {
  private _id: string

  constructor(id: string) {
    this._id = id
  }

  static GenerateCode() {
    return Math.random().toString(36).substring(2, 10)
  }

}
