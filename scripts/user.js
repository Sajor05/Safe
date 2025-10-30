import User from "./models/userModel.js";

export const users = [];

export async function loadUsers() {
  const response = await fetch("/scripts/models/data.json");
  const data = await response.json();
  data.forEach((d) => {
    const usuario = new User(
      d.id,
      d.nombre,
      d.saturacion,
      d.temperatura,
      d.frecuenciaCardiaca,
      d.hora,
      d.minutos,
      d.segundos,
      d.presionAtmosferica,
      d.latitud,
      d.longitud
    );
    users.push(usuario);
  });
}
