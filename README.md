# Aula-taller de soldadura

*De Xurxo para el mundo.*

Apuntes visuales y pruebas escritas para el CFGM de Soldadura y Calderería y la FP Básica de Fabricación de Elementos Metálicos, ordenados por módulos y pensados para el móvil.

| Archivo | Contenido |
|---|---|
| `index.html` | Entrada: lleva directo al espacio docente (`profesor.html`) |
| `estudiar.html` | Modo estudiante: ciclo → módulo → temas y bloques, con los RA que trabaja cada bloque |
| `preparar.html` | Modo profesor: pruebas de respuesta múltiple y/o desarrollo, por dificultad, vinculadas a RA y CE |
| `profesor.html` | Espacio docente: ciclo → curso → módulo → unidades, cada una con «Compartir en Classroom» (la planificación se hace en Classroom); catálogo de unidades |
| `clase.html` | Apuntes de una clase para el alumnado, sin puerta en la portada: se llega con el enlace que el profesor fija en Classroom (`clase.html?c=1SC`) |
| `aula-datos.js` | Ciclo, cursos y módulos de cada curso (se edita a mano) |
| `classroom.js` | Conexión con la API de Google Classroom («Montar en Classroom»: crea el tema del módulo y un material por unidad, en borrador) |
| `classroom-config.js` | ID de cliente de Google (se rellena una vez; guía en `GUIA_API_CLASSROOM.md` del proyecto) |
| `acceso.js` | Clave de acceso del espacio docente y de preparar pruebas (solo la huella cifrada; se cambia con `node tools/clave.js`). Es una cortina, no una cerradura: los archivos siguen siendo públicos |
| `manifest.json`, `sw.js` | App instalable (PWA) «Aula-taller»: manifiesto y service worker (red primero, copia para sin conexión) |
| `icon-*.png`, `apple-touch-icon.png`, `favicon.png` | Icono de la app: el soldador de Nexus en azul con «AULA-TALLER» (lo hace `tools/icono_app.js`) |
| `aula.css` | Estilo común de `profesor.html` y `clase.html` |
| `banco.js` | Banco de preguntas y vínculos con módulos, RA y CE (lo genera `tools/banco.js`, no se edita a mano) |
| `electrodo.html` | Soldadura con electrodo revestido (4 bloques) |
| `migmag.html` | Soldadura MIG-MAG (4 bloques) |
| `tig.html` | Soldadura TIG (4 bloques) |
| `corte.html` | Corte y resanado: oxicorte, plasma y arco-aire (5 bloques) |
| `trazado.html` | Trazado de desarrollos: tolva de cuadrado a redondo por triangulación, con animación paso a paso (muestra, 1 bloque) |
| `montaje.html` | Montaje de construcciones metálicas (4 bloques) |
| `tuberia.html` | Tubería industrial (5 bloques) |
| `img/` | Fotos pequeñas de las tarjetas de los temas |

Cada tema es un HTML autónomo: lleva dentro las imágenes y los estilos. Se puede enlazar a un bloque concreto con `tema.html#PAGINA`, por ejemplo `tuberia.html#TUB_5_Taller`.

`preparar.html` acepta enlaces directos: `preparar.html?modulo=0094` o `preparar.html?tema=tig&bloque=2`.

Autor: Xurxo
