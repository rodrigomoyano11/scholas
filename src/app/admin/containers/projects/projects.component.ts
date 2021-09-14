/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component } from '@angular/core'
import { ButtonData } from '../../components/list-header/list-header.component'
import { CardData } from '../../components/project-card/project-card.component'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  buttonsData: ButtonData[] = [
    {
      label: 'Filtrar proyectos',
      icon: 'filter_alt',
      action: {
        type: 'button',
        callback: () => console.log('Works'),
      },
    },
    {
      label: 'Agregar nuevo proyecto',
      icon: 'add',
      action: {
        type: 'link',
        callback: () => '/admin/new-project',
      },
    },
  ]

  cardData: CardData[] = [
    {
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Escuela de Mar y Playa',
      subtitle: 'Mar del Plata',
      description:
        'Experiencia educativa que a partir del Surf, reúne a jóvenes de diferentes credos, ámbitos y realidades de la Ciudad de Mar del Plata, con foco en aquellos que hayan abandonado o se encuentren en peligro de abandono escolar.',
    },
    {
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Escuela de Mar y Playa',
      subtitle: 'Mar del Plata',
      description:
        'Experiencia educativa que a partir del Surf, reúne a jóvenes de diferentes credos, ámbitos y realidades de la Ciudad de Mar del Plata, con foco en aquellos que hayan abandonado o se encuentren en peligro de abandono escolar.',
    },
  ]
}
