export type FiltreProduit = {
  by: string
  order: string
  contains?: string
  limit?: number
}

export enum FilteredProductFilled {
  Name = "name",
  Prix = "prix",
  Poids = "pods"
}

export enum OrderType {
  Asc = "ASC",
  Desc = "DESC"
}
