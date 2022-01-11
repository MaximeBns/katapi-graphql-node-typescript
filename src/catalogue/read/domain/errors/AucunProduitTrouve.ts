import {Erreur} from "../../../../shared/domain/error/erreur";

export class AucunProduitTrouve implements Erreur {
  readonly code: number;
  readonly message: string;

  constructor(private statusCode: number, private statusMessage: string) {
    this.code = statusCode
    this.message = statusMessage
  }
}
