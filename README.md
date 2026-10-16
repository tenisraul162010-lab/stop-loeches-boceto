# Reparaciones Automovilísticas Stop · Boceto web

Propuesta de nueva web para el taller Reparaciones Automovilísticas Stop (Loeches, Madrid),
con la información de su web actual (servicios, aseguradoras, dirección, teléfono y horario).

- `index.html`: página principal (Tailwind)
- `configurador.html` + `modelo.glb`: configurador 3D (Three.js)

Modelo 3D: "Porsche 911 GT3" por Outlaw Games, licencia CC BY-NC 4.0 (Sketchfab). Fotos: Unsplash.

## Seguimiento de reparaciones (demo)
- `seguimiento.html`: el cliente consulta el estado con matrícula + código.
- `taller.html`: panel del taller (PIN demo `1234`) para dar de alta coches, cambiar la etapa y añadir notas.
- `estado.js`: datos compartidos. En la demo se guardan en el navegador (localStorage);
  la versión real necesita una base de datos en la nube para que taller y cliente vean lo mismo desde dispositivos distintos.
