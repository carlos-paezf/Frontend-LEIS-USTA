import { Injectable } from '@angular/core';
import { ItemSidenav } from '../interfaces/item-sidenav';
import { itemsUtil } from '../../utils/items.util';


@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    public items: ItemSidenav[] = itemsUtil


    constructor() { }


    /**
     * Given an id, return the item with that id
     * @param {number} id - The id of the item you want to get.
     * @returns An ItemSidenav object
     */
    public getItemByID = (id: number): ItemSidenav => {
        const item: ItemSidenav[] = this.items.filter(item => item.id === id)
        return item[0]
    }


    /**
     * Given a term, return a list of items that match the term
     * @param {string} term - The search term that is entered by the user.
     * @returns An array of items that match the search term.
     */
    public getSuggestions = (term: string): ItemSidenav[] => {
        const items: ItemSidenav[] = this.items.filter(item => {
            const regex = new RegExp(`${term.toLowerCase()}[a-zA-Z]*`, 'g')
            return item.label.toLowerCase().match(regex)
        })
        return items
    }
}