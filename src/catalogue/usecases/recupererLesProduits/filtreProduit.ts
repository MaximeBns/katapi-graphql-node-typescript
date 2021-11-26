export type FiltreProduit = {
  by: string
  order: string
  compare?: Compare
  contains?: string
  limit?: number
}


export interface Compare {
  sign?: string
  than?: number
}


export enum FilteredProductFilled {
  Name = "name",
  Prix = "prix",
  Poids = "pods"
}


export enum CompareSign {
  Greater = "GREATER",
  Lower = "LOWER",
  LowerOrEqual = "LOWER_THAN_OR_EQUAL",
  GreaterOrEqual = "GREATER_THAN_OR_EQUAL_TO"
}

export enum OrderType {
  Asc = "ASC",
  Desc = "DESC"
}
