export interface IPeriodos{
    data: IItemsCBox[],
    dias: IItemsCBoxV1[]
}

export interface ICbox {
    data: IItemsCBox[]
}

export interface IItemsCBox{
    value : number,
    label: string
}

export interface IItemsCBoxV1{
    id : string,
    label: string
}