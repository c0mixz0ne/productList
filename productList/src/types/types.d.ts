export interface IDevice {
  id: number
  name: string
  nodes: INodes[]
}

export interface INode {
  id: number
  name: string
}
