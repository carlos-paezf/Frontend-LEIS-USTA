export interface ItemsMenu {
    id: number
    icon?: string,
    label: string,
    routerLink: string,
    routes?: ItemsMenu[],
    color?: string
}
