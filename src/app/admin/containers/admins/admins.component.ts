import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'

import { AdminsService } from '../../services/admins/admins.service'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  toolbarButtons: ToolbarButtons = [
    {
      style: 'primary',
      data: [
        {
          label: 'Agregar nuevo administrador',
          icon: 'add',
          action: {
            type: 'button',
            click: (): void => void this.router.navigate(['/admin/new-admin']),
          },
        },
      ],
    },
  ]

  constructor(
    public adminsService: AdminsService,
    public layout: LayoutService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.adminsService.getAdmins()
  }
}
