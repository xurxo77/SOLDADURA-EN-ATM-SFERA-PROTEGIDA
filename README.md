# Aula-taller de soldadura

*De Xurxo para el mundo.*

Apuntes visuales y pruebas escritas para el CFGM de Soldadura y Calderería y la FP Básica de Fabricación de Elementos Metálicos, ordenados por módulos y pensados para el móvil.

| Archivo | Contenido |
|---|---|
| `index.html` | Entrada: modo estudiante o modo profesor |
| `estudiar.html` | Modo estudiante: ciclo → módulo → temas y bloques, con los RA que trabaja cada bloque |
| `preparar.html` | Modo profesor: pruebas de respuesta múltiple y/o desarrollo, por dificultad, vinculadas a RA y CE |
| `profesor.html` | Espacio docente: mis clases (1.º y 2.º), catálogo de unidades, planificación por clase y módulo (ordenar, publicar, ocultar) |
| `clase.html` | Alumnado: `clase.html?c=1SC` o `?c=2SC`; solo ve las unidades publicadas, en el orden del profesor |
| `aula-datos.js` | Ciclo, cursos y módulos de cada curso (se edita a mano) |
| `planificacion.js` | Qué UT tiene cada clase y módulo y si están publicadas (se descarga desde `profesor.html` y se sube) |
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
