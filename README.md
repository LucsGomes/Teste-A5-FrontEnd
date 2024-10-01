# Desafio A5 Solutions

A5 deseja um aplicativo simples que controle uma lista de contatos com Nome, CPF, E-mail e
Telefone. O aplicativo deve iniciar numa tela de listagem de contatos e caso não haja nenhum
deve aparecer uma mensagem amigável de que não há contatos cadastrados. Deve ser possível
cadastrar, alterar e excluir contatos.
As telas devem ser desenvolvidas de forma componentizada para que seja possível reutilizar em
outros pontos do projeto ou futuramente em outras telas.
A API de backend deve ser desenvolvida em arquitetura REST.

Condições atendidas:
1. Ao iniciar na tela de listagem o aplicativo apresenta uma mensagem amigável caso não tenha contatos
2. Pode cadastrar novo contato, foi adicionado feedback quando adicionado.
3. Pode excluir o contato com feedback de sucesso.
4. Pode editar o contato com o feedback de sucesso.
5. As telas foram criadas de forma componentizada.
6. Foi criado uma estrutura de back-end para atender o front-end.

## Apresentação
<div>
  <img
    width="400"
    src="https://github.com/user-attachments/assets/ec55bfca-8852-4bc6-b970-4dd2b81c033b" 
    alt="Tela inicial" />
  <img
    width="475"
    src="https://github.com/user-attachments/assets/aba3a1cf-2d51-46a5-b526-13f5c6c8e930" 
    alt="Tela inicial" />
</div>

## Oque foi usado

- React
- Typescript
- Next.js
- Shadcn/UI
- axios

## Pré-requisitos para iniciar o projeto
- Node.js e npm
  <div>
    O React depende do Node.js e do npm para executar scripts de build e gerenciar dependências. O Create React App precisa de pelo menos a versão 10 do Node e o npm precisa de pelo menos a versão 5.2.
  </div>
## Rodando a aplicação

Clone esse repositorio

```bash
  git clone https://github.com/LucsGomes/teste-a5-solutions.git
```

Va para a pasta do projeto

```bash
  cd teste-a5-solutions
```

Instale as dependencias

```bash
  npm | npm install
```

Inicie a Aplicação

```bash
 npm run dev
```

## Desafios encontrados

- Detectei um problema em que o CORS estava me impedindo de fazer requisições através do navegador por conta do Preflight ou algo do tipo.
- Também foi um desafio fazer o delete do contato, pois na documentação constava um exemplo de uso que não se aplicava. Então, por meio de uma análise do cURL, pude ver os parâmetros que precisavam ser usados na query do delete.
- A implementação do BFF (Back-end for Front-end) também foi um desafio para mim. Como não conseguia fazer as requisições pelo localhost, tive que estudar sobre o CORS para contornar a questão e entregar o projeto.
- Tive problemas com cache do fetch do Next.js, e isso foi uma surpresa, pois estava prestes a entregar o projeto e, quando fui fazer um último teste, nada carregava. O token que estava no cache estava expirado. Fiz o armazenamento do token nos cookies do navegador, mas limpá-los não funcionava por conta do cache. Então, a solução que encontrei foi desligar através do headers o cache do Next.js.
