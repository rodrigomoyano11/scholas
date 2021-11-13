import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ToolbarButtons } from 'src/app/core/components/toolbar/toolbar.component'
import { LayoutService } from 'src/app/core/services/layout/layout.service'

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
            click: (): void => void this.router.navigate(['/admin/admins/create']),
          },
        },
      ],
    },
  ]

  isLoading = false

  constructor(
    public adminsService: AdminsService,
    public layout: LayoutService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.adminsService.getAdmins()
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
