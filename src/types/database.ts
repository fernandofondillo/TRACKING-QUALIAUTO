export type Profile = {
  id: string;
  role: 'gerente' | 'vendedor';
  nombre: string | null;
  email: string;
};

export type LeadCanal = 'Visitante exposición' | 'Llamada telefónica' | 'WhatsApp' | 'Coches.net' | 'Milanuncios' | 'Otros';

export type LeadFase = 'Lead recibido' | 'Contactado' | 'Interés confirmado' | 'Oferta presentada' | 'Seguimiento activo' | 'Prueba' | 'Reserva' | 'Negociación';

export type ResultadoType = 'Abierto' | 'Venta cerrada' | 'Venta perdida';

export type TipoVenta = 'Contado' | 'Financiado';

export type MotivoPerdida = 'Precio' | 'Financiación' | 'No responde' | 'Compra otro' | 'Inadecuado' | 'Desconfianza' | 'Otros';

export type Lead = {
  id_lead: string;
  created_at: string;
  assigned_to: string | null;
  canal: LeadCanal;
  nombre_cliente: string;
  telefono_cliente: string | null;
  email_cliente: string | null;
  vehiculo_interes: string | null;
  fase_actual: LeadFase;
  resultado: ResultadoType;
  tipo_venta: TipoVenta | null;
  motivo_perdida: MotivoPerdida | null;
  notas: string | null;
};

export type LeadHistory = {
  id: string;
  lead_id: string;
  changed_by: string;
  old_phase: LeadFase | null;
  new_phase: LeadFase | null;
  timestamp: string;
};
