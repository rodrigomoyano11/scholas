import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ValidationService } from 'src/app/auth/services/validation/validation.service'
import { AdminsService } from '../../services/admins/admins.service'

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css'],
})
export class NewAdminComponent implements OnInit {
  newAdminForm: FormGroup

  constructor(
    private fb: FormBuilder,
    public validation: ValidationService,
    private router: Router,
    private adminsService: AdminsService,
  ) {
    this.newAdminForm = this.fb.group({
      email: ['', [Validators.required, validation.isValidEmail()]],
    })
  }

  ngOnInit(): void {
    this.adminsService.getUsers()
  }

  setNewAdmin(): void {
    const email = <string>this.newAdminForm.controls['email'].value
    const uid = this.adminsService.selectUidAdmin(email)

    this.adminsService.addAdmin(uid)

    void this.router.navigate(['/admin/admins'])
  }
}
