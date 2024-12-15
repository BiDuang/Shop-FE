export interface BaseCommodity {
  cid: string
  name: string
  price: number
  album: string | null
  [key: string]: string | number | null
}

export interface Commodity extends BaseCommodity {
  description: string
}
