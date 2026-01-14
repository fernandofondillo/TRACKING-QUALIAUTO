export type Profile = {
  id: string;
  role: 'gerente' | 'vendedor';
  nombre: string | null;
  email: string | null;
  created_at: string;
};

export type LeadCanal = 'Web' | 'Facebook' | 'Instagram' | 'WhatsApp' | 'Referido';

export type LeadFase = 'Nuevo' | 'Contactado' | 'Cita Programada' | 'Negociación' | 'Venta Cerrada' | 'Venta Perdida';

export type ResultadoType = 'Venta Ganada' | 'Venta Perdida' | 'En Proceso';

export type TipoVenta = 'Contado' | 'Financiado';

export type MotivoPerdida = 'Precio' | 'Financiación Denegada' | 'Compró en otro lugar' | 'Ya no está interesado' | 'Falta de stock';

export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  vendedor_asignado: string | null;
  canal: LeadCanal | null;
  nombre_cliente: string;
  telefono: string | null;
  email: string | null;
  vehiculo_interes: string | null;
  fase: LeadFase | null;
  resultado: ResultadoType | null;
  tipo_venta: TipoVenta | null;
  motivo_perdida: MotivoPerdida | null;
  notas: string | null;
};

export type LeadHistory = {
  id: string;
  lead_id: string;
  cambiado_por: string | null;
  fase_anterior: LeadFase | null;
  fase_nueva: LeadFase | null;
  notas: string | null;
  created_at: string;
};
