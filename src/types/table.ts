export type TableHead = {
  name: string
  width: string
  align: 'left' | 'center' | 'right'
  children?: {
    name: string
    width: string
  }[]
}
