# Vacunación COVID-19
![Download latest COVID-19 Status vaccination](https://github.com/midudev/covid-vacuna/workflows/Download%20latest%20COVID-19%20Status%20vaccination/badge.svg)

Aplicación web que muestra el estado y progreso de la vacunación en España 🇪🇸 contra el COVID-19.

**Unos enlaces para entender mejor la app:**
* [Anuncio en Twitter con toda la información.](https://twitter.com/midudev/status/1352231403136708611)
* [Sígueme en Twitch para no perderte cuando sigamos desarrollando este y otras apps](https://www.twitch.tv/midudev)

## ¿Cómo lo ejecuto en local?

Necesitarás tener instalado `Node.js` a partir de la versión 14 y tener acceso a una terminal para seguir los siguientes pasos:

```
npm install # instalar las dependencias
npm run dev # levantar el entorno de desarrollo
```

## Forks para otros países

- 🇬🇧 UK: https://covid-vaccine.app
- 🇨🇺 Cuba: https://covid-resume-cuba.kenriortega.vercel.app
- 🇦🇷 Argentina: https://covid-vacuna-ar.vercel.app
- 🇵🇪 Perú: https://covidvacunaperu.app/

## ¿Aceptas Pull Request?

¡Claro que sí! Lo cierto es que no puedo dedicarle mucho tiempo a la app así que cualquier ayuda es bienvenida.

Sólo te pido:
- **No hagas PRs para pasar a TypeScript**. Me gustan las ventajas que ofrece en muchos proyectos pero en este en concreto no le encuentro el mismo valor.
- **No hagas PRs para refactorizar toda la estructura de carpetas y/o refactorizar muchas cosas.** Seguramente se quedarán sin mergear.
- **No hagas PRs cambiando configuraciones de linter.** Me gusta `standard`.

En definitiva:
- **No hagas Pull Requests grandes.** Cuanto más atómicas, más posibilidades que haga merge. 🚀
- **Sigue el estilo** y pásale el linter antes de hacer la PR.
- No reinventes la rueda. No hace falta que añadas un nuevo framework, dependencia o cosa trending. **La idea es que la app sea funcional y tenga lo mínimo necesario.**

## Próximas características

- [x] 🔹 Seleccionar días para ver el progreso
- [x] 🔹 Modo oscuro
- [x] 🔹 Gráfica con el progreso
- [x] 🔹 PWA
- [x] 🔹 Traducción a las lenguas oficiales del Estado
- [x] 🔹 Mapa con info encima
