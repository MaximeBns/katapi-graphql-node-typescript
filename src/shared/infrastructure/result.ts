import {Edge} from "./edge";
import {PageInfo} from "./pageInfo";

export type Result<T> =  {
  totalCount?: number
  edges: Edge<T>[]
  pageInfo?: PageInfo
}
