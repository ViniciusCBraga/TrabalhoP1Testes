# Sistema de Compra de Ingressos

O sistema de Compra de Ingressos é uma aplicação para gerenciar a venda e compra de ingressos para eventos.

## Entidades

### Ingresso

Atributos:

- `preco` (number): O preço do ingresso.
- `evento` (Evento): O evento ao qual o ingresso está associado.

### Usuario

Atributos:

- `nome` (string): O nome do usuário.
- `email` (string): O email do usuário.
- `senha` (string): A senha do usuário.

### Evento


Atributos:

- `nome` (string): O nome do evento.
- `dataHora` (Date): A data e hora do evento.
- `localizacao` (string): A localização do evento.
- `capacidade` (number): A capacidade máxima de público para o evento.

### Carrinho


Atributos:

- `ingressos` (array de Ingresso): Os ingressos adicionados ao carrinho.
- `usuario` (Usuario): O usuário 

### Compra

Atributos:

- `usuario` (Usuario): O usuário que efetuou a compra.
- `ingressos` (array de Ingresso): Os ingressos adquiridos.
- `valorTotal` (number): O valor total da compra.
- `dataHora` (Date): A data e hora da compra.