# Equipment loan

Vamos a crear un nuevo componente con el siguiente comando 

```txt
ng g c protected/modules/loan/pages/loan-request --skip-tests
```
Se agrego ruta de loan-request a  loan routing :
            {
                path:'request',
                data:{breadcrumb:'Solitud de prestamos'},
                component: LoanRequestComponent
            },
Tambien se configuro mocks  sidnav :
id: 3,
        icon: 'pi pi-comments',
        label: 'Préstamos',
        routerLink: '/loan',
        routes:[
            {
                id: 3.1,
                icon: 'pi pi-comments',
                label: 'Solicitud Prestamos',
                routerLink:'/loan/request'

            }
 Se agrego a loan request el modal para serie y codigo QR
                      