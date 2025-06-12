export interface PropiedadesType {
  icono?: string;
  descripcion?: string;
  orden: number;
}

export type SubModuloType = {
  id: string;
  label: string;
  url: string;
  nombre: string;
  propiedades: PropiedadesType;
  estado: string;
};

export type ModuloType = {
  id: string;
  label: string;
  url: string;
  nombre: string;
  propiedades: PropiedadesType;
  estado: string;
  subModulo: SubModuloType[];
};

export interface RoleType {
  idRol: string;
  rol: string;
  nivelId: string;
  nivel: string;
  objetoId: string;
  objeto: string;
  nombre: string;
  modulos: ModuloType[];
}

export interface PersonaType {
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  tipoDocumento: string;
  nroDocumento: string;
  fechaNacimiento: string;
}

export interface LoginType {
  usuario: string;
  contrasena: string;
}

export interface UsuarioType {
  access_token: string;
  id: string;
  usuario: string;
  ciudadania_digital: boolean;
  cambio_password: boolean;
  estado: string;
  roles: RoleType[];
  persona: PersonaType;
  idRol: string;
}
