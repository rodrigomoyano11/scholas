import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { AdminsService } from '../../services/admins/admins.service'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class AdminsComponent implements OnInit {
  constructor(public adminsService: AdminsService) {}

  ngOnInit(): void {
    this.adminsService.getAdmins()
  }
}
