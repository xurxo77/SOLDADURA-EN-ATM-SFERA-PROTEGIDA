// Estructura académica del aula-taller: ciclo → curso (un grupo por curso) → módulos.
// Se edita a mano. Las unidades de trabajo (UT) salen del catálogo de banco.js (BANCO.temas).
// Reparto por cursos del CFGM: Orden de 7 de julio de 2009 (BOJA 150, 4-8-2009), anexo II.
// Cada curso lleva su número (n): da el color y el sello «1.º» / «2.º» en todas las pantallas.
// Cada módulo: [código, nombre, color]. El color identifica el módulo en todas las pantallas.
// FOL (0096) y EIE (0097) no se incluyen: no los imparte el profesorado técnico.
// Cada ciclo lleva su color (tarjeta de elegir ciclo).
// Un ciclo sin cursos sale como «Próximamente».
window.AULA = {
  ciclos: [
    {
      id: "cfgm-sc",
      grado: "Grado medio",
      corto: "CFGM",
      color: "#2450E6",
      nombre: "Soldadura y Calderería",
      cursos: [
        {
          id: "1SC", n: 1, nombre: "1.º curso", grupo: "1.º Soldadura y Calderería",
          modulos: [
            ["0007", "Interpretación gráfica", "#3949AB"],
            ["0091", "Trazado, corte y conformado", "#B26A00"],
            ["0092", "Mecanizado", "#546E7A"],
            ["0093", "Soldadura en atmósfera natural", "#C62828"]
          ]
        },
        {
          id: "2SC", n: 2, nombre: "2.º curso", grupo: "2.º Soldadura y Calderería",
          modulos: [
            ["0006", "Metrología y ensayos", "#7B1FA2"],
            ["0094", "Soldadura en atmósfera protegida", "#1565C0"],
            ["0095", "Montaje", "#2E7D32"]
          ]
        }
      ]
    },
    {
      id: "cfgs-cm",
      grado: "Grado superior",
      corto: "CFGS",
      color: "#5B3FB8",
      nombre: "Construcciones Metálicas",
      cursos: []
    },
    {
      id: "fpb-fem",
      grado: "FP Básica",
      corto: "FPB",
      color: "#0B857B",
      nombre: "Fabricación de Elementos Metálicos",
      cursos: []
    }
  ]
};
