export function Cores(cor){
  let cores = cor.toLowerCase()
  switch(cores){
    case 'verde': return '#7CC95A';
    break;
    case 'vermelho': return '#C95A5A';
    break;
    case 'amarelo': return '#C9C55A';
    break;
    case 'azul': return '#5A89C9';
    break;
    case 'laranja': return '#D6733F';
    break;
    case 'lilás': return '#8F6AD6';
    break;
  }
}