// Datos de seguimiento de reparaciones — MODO DEMO.
// Se guardan en el navegador (localStorage), así que el panel del taller y la
// página del cliente solo comparten datos si se abren en el mismo navegador.
// En la versión real esto iría a una base de datos en la nube.

const ESTADO_KEY = 'stop-seguimiento-v1';

const ETAPAS = [
  { id: 'recibido',     nombre: 'Recibido en taller',    desc: 'Tu coche ya está con nosotros.' },
  { id: 'diagnostico',  nombre: 'Diagnóstico',           desc: 'Estamos revisando el vehículo.' },
  { id: 'presupuesto',  nombre: 'Presupuesto / peritación', desc: 'Pendiente de aprobación o del perito.' },
  { id: 'reparacion',   nombre: 'En reparación',         desc: 'Nuestro equipo está trabajando en tu coche.' },
  { id: 'pintura',      nombre: 'Pintura',               desc: 'Preparación, color y pintado.' },
  { id: 'control',      nombre: 'Control de calidad',    desc: 'Revisión final y prueba.' },
  { id: 'listo',        nombre: 'Listo para recoger',    desc: '¡Ya puedes pasar a por él!' },
];

function hoyMas(dias, hora) {
  const d = new Date(); d.setDate(d.getDate() + dias);
  if (hora) { const [h, m] = hora.split(':'); d.setHours(+h, +m, 0, 0); }
  return d.toISOString();
}

function datosDemo() {
  return [
    {
      matricula: '1234 KLM', codigo: '4821', cliente: 'Carlos', coche: 'Seat León 1.5 TSI',
      trabajo: 'Golpe en puerta delantera derecha (seguro Mapfre)', etapa: 'pintura', entrega: hoyMas(2),
      historial: [
        { fecha: hoyMas(-3, '09:10'), etapa: 'recibido', nota: 'Recibido. Coche de sustitución entregado.' },
        { fecha: hoyMas(-3, '12:40'), etapa: 'diagnostico', nota: 'Puerta y aleta con deformación. Sin daños estructurales.' },
        { fecha: hoyMas(-2, '10:05'), etapa: 'presupuesto', nota: 'Peritación aprobada por Mapfre.' },
        { fecha: hoyMas(-1, '08:30'), etapa: 'reparacion', nota: 'Desmontaje y reparación de chapa.' },
        { fecha: hoyMas(0, '09:15'), etapa: 'pintura', nota: 'Pieza fondeada. Hoy igualamos color y pintamos.' },
      ],
    },
    {
      matricula: '5678 HJT', codigo: '1093', cliente: 'Laura', coche: 'Renault Clio',
      trabajo: 'Revisión + pre-ITV', etapa: 'diagnostico', entrega: hoyMas(1),
      historial: [
        { fecha: hoyMas(0, '08:20'), etapa: 'recibido', nota: 'Recibido para revisión.' },
        { fecha: hoyMas(0, '10:00'), etapa: 'diagnostico', nota: 'Revisando frenos y luces.' },
      ],
    },
    {
      matricula: '9012 MNB', codigo: '7755', cliente: 'Javier', coche: 'Toyota C-HR',
      trabajo: '4 neumáticos + paralelo', etapa: 'listo', entrega: hoyMas(0),
      historial: [
        { fecha: hoyMas(-1, '16:00'), etapa: 'recibido', nota: 'Recibido.' },
        { fecha: hoyMas(0, '09:00'), etapa: 'reparacion', nota: 'Montaje de 4 Michelin y equilibrado.' },
        { fecha: hoyMas(0, '11:30'), etapa: 'listo', nota: 'Paralelo hecho. Listo para recoger.' },
      ],
    },
  ];
}

function cargarCoches() {
  try {
    const raw = localStorage.getItem(ESTADO_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  const demo = datosDemo();
  guardarCoches(demo);
  return demo;
}

function guardarCoches(lista) {
  try { localStorage.setItem(ESTADO_KEY, JSON.stringify(lista)); } catch (e) {}
}

function reiniciarDemo() { guardarCoches(datosDemo()); }

const normMatricula = m => (m || '').toUpperCase().replace(/[\s-]/g, '');
const etapaIndex = id => ETAPAS.findIndex(e => e.id === id);
const etapaNombre = id => (ETAPAS.find(e => e.id === id) || {}).nombre || id;

function fmtFecha(iso, conHora = true) {
  const d = new Date(iso);
  const opts = conHora ? { weekday:'short', day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' } : { weekday:'long', day:'numeric', month:'long' };
  return d.toLocaleString('es-ES', opts);
}
