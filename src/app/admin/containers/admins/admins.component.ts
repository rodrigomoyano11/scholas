import { Component, OnInit } from '@angular/core'
import { AdminsService } from '../../services/admins/admins.service'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  constructor(public adminsService: AdminsService) {}

  ngOnInit(): void {
    this.adminsService.getAdmins()
  }
}
