import { SideNavItem } from '@/types/sideNavItem';
import { Icon } from '@iconify/react';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon='lucide:home' width='22' height='22' />,
  },
  {
    title: 'User',
    path: '/user',
    icon: <Icon icon='lucide:user' width='22' height='22' />,
  },
  {
    title: 'Post',
    path: '/post',
    icon: <Icon icon='mdi:post-it-note-add-outline' width='22' height='22' />,
  },
  {
    title: 'Password',
    path: '/change-password',
    icon: <Icon icon='mdi:password-outline' width='22' height='22' />,
  },
];
