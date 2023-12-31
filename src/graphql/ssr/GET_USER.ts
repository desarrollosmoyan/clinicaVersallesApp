export const GET_USER = `

query UsersPermissionsUser($usersPermissionsUserId: ID) {
  usersPermissionsUser(id: $usersPermissionsUserId) {
    data {
      attributes {
        username
        enlinea
        email
        cargo {
          data {
            attributes {
              nombre
            }
          }
        }
        nombreCompleto
        ubicacionActual
        Area
        pedidos {
          data {
            attributes {
              nombrePedido
              descripcion
              cliente
              fecha
              hora
              estacionInicio
              estacionFin
              fehcaInicio
              fechaFin
              cuantoTardoInicioFin
              estado
            }
          }
        }
        turnos {
          data {
            attributes {
              fin
              inicio
              nombre
            }
          }
        }
      }
    }
  }
}
`;
