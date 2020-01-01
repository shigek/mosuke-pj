import { RiotComponentExport } from 'riot'

export type MenuItem = {
  disabled?: boolean;
  label: string;
  icon?: string;
  badge?: string;
  href: string;
}
export type MenuTitle = string;

export type DropDownItem = {
  disabled?: boolean;
  label: string;
  icon?: string;
  badge?: string;
  item: [MenuItem];
}

export type DropDownMenu = {
  disabled?: boolean;
  type: 'dropdown';
  title: MenuTitle;
  menu: [DropDownItem];
}

export type LinkMenu = {
  disabled?: boolean;
  type: 'link';
  title: MenuTitle;
  item: MenuItem[];
}

export type MenuConfig = {
  id: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  details?: { [key: string]: any };
  /* eslint-enable */
}
export type Menus = {
  menu: DropDownMenu | LinkMenu;
}[];

export interface SidebarMenuComponentProps {
  menuConfig: MenuConfig;
}

export interface SidebarMenuComponentState {
  menu: DropDownMenu | LinkMenu;
}

export interface SidebarComponent extends RiotComponentExport<SidebarMenuComponentProps, SidebarMenuComponentState> {
  state: SidebarMenuComponentState;
  onMounted(currentProps: SidebarMenuComponentProps, currentState: SidebarMenuComponentState): void;
  menus(id: string): DropDownMenu;
  hamburger(event: MouseEvent): void;
}
