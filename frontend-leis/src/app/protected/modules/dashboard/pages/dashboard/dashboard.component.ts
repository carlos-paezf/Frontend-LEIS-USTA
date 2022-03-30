import { Component, OnInit } from '@angular/core';
import { ItemsMenu, MsgGeneric } from 'src/app/protected/interfaces';
import { ITEMS_DASHBOARD } from 'src/app/protected/mocks';
import { MessagesService } from 'src/app/protected/services';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public items: ItemsMenu[] = []
    public msgEquipment: MsgGeneric[] = []
    public unreadMsgEquipment: number = 0
    public msgLoan: MsgGeneric[] = []
    public unreadMsgLoan: number = 0


    constructor(private _msgService: MessagesService) { }


    ngOnInit(): void {
        this.items = ITEMS_DASHBOARD

        this.getMessagesForEquipment()
        this.getMessagesForLoan()
    }


    /**
     * It gets all the messages for the equipment category and then it filters the messages to get the
     * unread messages and the read messages.
     */
    public getMessagesForEquipment = () => {
        this._msgService.getMessagesByCategory('equipment')
            .subscribe((msgs: MsgGeneric[]) => {
                const tempUnread = this.sortMsgs(msgs.filter(msg => !msg.check))
                const tempRead = this.sortMsgs(msgs.filter(msg => msg.check))
                this.msgEquipment = [...tempUnread, ...tempRead]
                this.msgEquipment.filter(msg => !msg.check).forEach(_ => this.unreadMsgEquipment += 1)
            })
    }


    /**
     * It gets all the messages for the loan category and then it filters the messages to get the unread
     * messages and the read messages.
     */
    public getMessagesForLoan = () => {
        this._msgService.getMessagesByCategory('loan')
            .subscribe((msgs: MsgGeneric[]) => {
                const tempUnread = this.sortMsgs(msgs.filter(msg => !msg.check))
                const tempRead = this.sortMsgs(msgs.filter(msg => msg.check))
                this.msgLoan = [...tempUnread, ...tempRead]
                this.msgLoan.filter(msg => !msg.check).forEach(_ => this.unreadMsgLoan += 1)
            })
    }


    /**
     * It sorts the messages by date.
     * @param {MsgGeneric[]} msgs - The messages to sort.
     * @returns An array of messages sorted by date.
     */
    public sortMsgs = (msgs: MsgGeneric[]) => {
        return msgs.sort((a, b) => {
            if (a.date < b.date) return 1
            if (a.date > b.date) return -1
            return 0
        })
    }
}
