## FireRed Gym Rush by William Hernández

Simulador de batalla tipo Boss  Rush basado en Pokémon Rojo Fuego, usando React, Vite, Axios, React Router DOM y Supabase.

------------------------------
## Plan de Desarrollo Detallado

* Frontend: React (v18+) + Vite.
* Enrutamiento: React Router DOM (/ Inicio, /battle Combate, /leaderboard Clasificación).
* Datos Dinámicos: Axios para el consumo asíncrono de la PokéAPI.
* Base de Datos: Supabase para el almacenamiento del Top 10 de puntajes globales.
* Estado Centralizado: Uso de un Custom Hook (useBattle.js) para aislar la lógica del juego (turnos, HP/PP, inventario, cola de animaciones e IA enemiga) de la capa visual.
* Precarga de Datos (Prefetching): Al cargar el monólogo del líder, se ejecutan peticiones en paralelo con Promise.all() para descargar la información de los Pokémon de ambos bandos antes de que inicie la acción.

## 🎮 Reglas, Progresión y Mecánicas de Batalla

* Equipo Fijo: Pikachu, Bulbasaur, Squirtle y Charmander. Al inicio del juego el usuario introduce su nombre y elige su género, renderizando el sprite de espalda correspondiente (Red para masculino o Leaf para femenino).
* Evolución por Hitos: Al pasar al 3er líder (Lt. Surge), los iniciales cambian a su 2.ª etapa (Ivysaur, Wartortle, Charmeleon). Al llegar al 6.º líder (Sabrina), cambian a su 3.ª etapa (Venusaur, Blastoise, Charizard). Pikachu nunca evoluciona.
* Consumibles: 6 pociones por batalla (restauran una cantidad fija de HP y consumen el turno del jugador).
* Limpieza de Estados: Al iniciar o finalizar cualquier encuentro, todo el equipo recupera el 100% de HP y PP, incluyendo los Pokémon debilitados. No existe ganancia de experiencia.

## 🎬 Sistema Visual, Sonoro y Tabla de Clasificación

* Estética Visual: Pixel art clásico extraído de PokéAPI (sprites.versions['generation-iii']['firered-leafgreen']). Los líderes cuentan con un sprite HD local en /public/assets/leaders/ para la pantalla de monólogo previo al combate.
* Efectos y Cola Secuencial: Animaciones CSS por tiempos (setTimeout / promesas con delay) para sacudidas de ataques y parpadeo de daño. Sonidos de impacto retro locales mapeados por tipo de ataque.
* Mensajes de Efectividad: Matriz de tipos local en el cliente para calcular debilidades/resistencias e imprimir en el Battle Log texto secuencial (ej. "¡Pikachu usó Impactrueno!" -> delay -> "¡Es súper efectivo!").
* Sistema de Puntuación: Base de +1000 por victoria, -50 por turno, -100 por poción y -200 por baja sufrida.