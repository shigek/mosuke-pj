import { RiotComponentExport } from 'riot'

export type Menu = {
  navbar: any;
  sidebar: any;
}

export interface MarciaComponentProps {
  menuConfig: Menu;
}

export interface MarciaComponentState {
  menuConfig: Menu;
}

export interface MarciaComponent extends RiotComponentExport<MarciaComponentProps, MarciaComponentState> {
  findMenu(id: string): Menu;
  showLogin(event: MouseEvent): void;
  showSidebar(event: MouseEvent): void;
}
