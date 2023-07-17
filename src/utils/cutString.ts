export function cutString(numero: number = 0, texto: string = ''): string {
  if (texto.length <= numero) {
    return texto
  } else {
    return texto.substr(0, numero) + '...'
  }
}
