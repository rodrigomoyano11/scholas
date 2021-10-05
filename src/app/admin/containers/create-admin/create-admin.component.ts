import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ValidationService } from 'src/app/auth/services/validation/validation.service'
import { AdminsService } from '../../services/admins/admins.service'

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
})
export class CreateAdminComponent implements OnInit {
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
