import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'bar-chart',
    link: '/pages/dashboard',
  },
  {
    title: 'Settings',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Localisation',
        icon: 'fa-solid fa-location-dot',
        link: '/pages/settings/localisation',
      },
      {
        title: 'Recipes',
        icon: 'fa-solid fa-utensils',
        children: [
          {
            title: 'Localisation',
            icon: 'fa-solid fa-location-dot'
          }
        ]
      },
      {
        title: 'Program Management',
        icon: 'fa-solid fa-list-check'
      }
    ],
  },

];
