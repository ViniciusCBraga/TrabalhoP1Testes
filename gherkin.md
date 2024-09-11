## Adicionar Ingresso ao Carrinho

**Funcionalidade:** Adicionar ingresso ao carrinho de compras

**Cenário:**

Usuário adiciona ingresso válido ao carrinho

Dado que o usuário está na página de detalhes do ingresso

Quando o usuário clica no botão "Adicionar ao Carrinho"

Então o ingresso é adicionado ao carrinho com sucesso


**Cenário:**

Usuário tenta adicionar ingresso indisponível ao carrinho

Dado que o usuário está na página de detalhes do ingresso

E o ingresso está esgotado

Quando o usuário clica no botão "Adicionar ao Carrinho"

Então o ingresso não é adicionado ao carrinho


## Remover Ingresso do Carrinho

**Funcionalidade:** Remover ingresso do carrinho de compras

**Cenário:**

Usuário remove ingresso do carrinho

Dado que o usuário está no carrinho de compras

E o carrinho contém um ingresso

Quando o usuário seleciona a opção de remover o ingresso

Então o ingresso é removido do carrinho com sucesso


## Concluir Compra

**Funcionalidade:** Concluir compra de ingressos

**Cenário:**

Usuário conclui a compra com sucesso

Dado que o usuário está no carrinho de compras

E o carrinho contém pelo menos um ingresso disponível

Quando o usuário seleciona a opção de concluir a compra

Então a compra é concluída com sucesso

**Cenário:**

Usuário tenta concluir a compra sem ingressos no carrinho

Dado que o usuário está no carrinho de compras vazio

Quando o usuário seleciona a opção de concluir a compra

Então a compra não é concluída

## Gerenciar Evento

**Funcionalidade:** Adicionar evento

**Cenário**

Dado que o administrador está autenticado no sistema

Quando o administrador acessa a página de gerenciamento de eventos

E seleciona a opção de criar um novo evento

Então o sistema exibe o formulário de criação de evento

E o administrador preenche os detalhes do novo evento.

E o administrador confirma a criação do evento

Então o sistema registra o novo evento com sucesso

**Funcionalidade:** Atualizar evento

**Cenário**

Dado que o administrador está autenticado no sistema

Quando o administrador acessa a página de gerenciamento de eventos

E seleciona um evento existente para edição

Então o sistema exibe o formulário de edição de evento

E o administrador modifica os detalhes do evento

E o administrador confirma a edição do evento

Então o sistema atualiza as informações do evento com sucesso

**Funcionalidade:** Remover evento

**Cenário**

Dado que o administrador está autenticado no sistema

Quando o administrador acessa a página de gerenciamento de eventos

E seleciona um evento existente para remoção

Então o sistema exibe uma confirmação de remoção do evento

E o administrador confirma a remoção do evento

Então o sistema exclui o evento com sucesso
