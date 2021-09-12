import { Component, OnInit } from '@angular/core'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'
import { ButtonData } from '../../components/list-header/list-header.component'
import { AdminsService } from '../../services/admins/admins.service'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  buttonsData: ButtonData[] = [
    {
      label: 'Agregar nuevo administrador',
      icon: 'add',
      action: {
        type: 'link',
        callback: () => '/admin/new-admin',
      },
    },
  ]

  constructor(public adminsService: AdminsService, public layout: LayoutService) {}

  ngOnInit(): void {
    this.adminsService.getAdmins()
  }
}
