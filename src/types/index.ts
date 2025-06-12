export interface LayoutProps {
  children: React.ReactNode;
}

export interface CasbinTypes {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface OpcionType {
  key: string;
  value: string;
  label: string;
}

export interface PoliticaType {
  sujeto: string;
  objeto: string;
  accion: string;
}
