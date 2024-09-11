# Casos de Uso

## Adicionar Ingresso ao Carrinho

**Atores principais:** Usuário

**Fluxo básico:**

1. O usuário visualiza os detalhes do ingresso desejado.
2. O usuário seleciona a opção de adicionar o ingresso ao carrinho.
3. O ingresso é adicionado com sucesso ao carrinho.
4. O sistema exibe uma mensagem de confirmação.

**Fluxo alternativo:**

- No passo 2, se o ingresso estiver esgotado, o sistema exibe uma mensagem informando a indisponibilidade do ingresso.

## Remover Ingresso do Carrinho

**Atores principais:** Usuário

**Fluxo básico:**

1. O usuário acessa o carrinho de compras.
2. O usuário seleciona a opção de remover o ingresso desejado.
3. O ingresso é removido com sucesso do carrinho.
4. O sistema exibe uma mensagem de confirmação.

## Concluir Compra

**Atores principais:** Usuário

**Fluxo básico:**

1. O usuário acessa o carrinho de compras.
2. O usuário seleciona a opção de concluir a compra.
3. O sistema verifica a disponibilidade dos ingressos no carrinho.
4. O sistema calcula o valor total da compra.
6. O sistema registra a compra.
7. O sistema exibe uma mensagem de confirmação da compra.

**Fluxo alternativo:**

- No passo 3, se algum ingresso no carrinho estiver indisponível, o sistema notifica o usuário e impede a conclusão da compra.

## Gerenciar Eventos

**Fluxo básico:**

1. O administrador acessa a página de gerenciamento de eventos.
2. O administrador pode criar um novo evento, fornecendo os detalhes necessários.
3. O administrador pode editar os detalhes de um evento existente.
4. O administrador pode remover um evento existente.

**Fluxo alternativo:**

- Se nao houver eventos o sistema deve mostrar uma mensagem de aviso.



