import { RiotComponentExport } from 'riot'

export type Menu = {
  navbar: any;
  sidebar: any;
}

export interface MarciaComponentProps {

}
export interface MarciaComponentState {

}

export interface MarciaComponent extends RiotComponentExport<MarciaComponentProps, MarciaComponentState> {
  findmenu(id: string): Menu;
  hamburger(event: MouseEvent): void;
}
