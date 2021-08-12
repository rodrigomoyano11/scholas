import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { LayoutService } from '../../services/layout/layout.service'

interface Item {
  name: string
  link: string
  type: 'internal' | 'external' | 'action'
  access: Array<'anonymous' | 'donor' | 'admin'>
}

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  donorItems: Item[] = [
    {
      name: 'Proyectos',
      link: '/landing/projects',
      type: 'internal',
      access: ['anonymous', 'donor']
    },
    {
      name: 'Quienes somos',
      link: '/landing',
      type: 'internal',
      access: ['anonymous', 'donor']
    },
    {
      name: 'Noticias',
      link: '/landing/news',
      type: 'internal',
      access: ['anonymous', 'donor']
    },
    {
      name: 'Preguntas frecuentes',
      link: '/landing',
      type: 'internal',
      access: ['anonymous', 'donor']
    },
    {
      name: 'Contacto',
      link: '/landing',
      type: 'internal',
      access: ['anonymous', 'donor']
    }
  ]

  adminItems: Item[] = [
    {
      name: 'Noticias',
      link: '/admin/news',
      type: 'internal',
      access: ['admin']
    },
    {
      name: 'Proyectos',
      link: '/admin/projects',
      type: 'internal',
      access: ['admin']
    },
    {
      name: 'Donaciones',
      link: '/admin/donations',
      type: 'internal',
      access: ['admin']
    },
    {
      name: 'Donantes',
      link: '/admin/donors',
      type: 'internal',
      access: ['admin']
    }
  ]

  constructor(public auth: AuthService, public layout: LayoutService) {}
}
