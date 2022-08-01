<h1 align="center">API FINANCES</h1>

<img src="diagramaAPIFinances.png">

# User (Usuário)

**RN**
- Verificar se já usuário existe, caso sim lançar erro.

<br/>

## Rotas
- **POST** -> Criar usuário.
- **POST** -> Autenticar usuário.

<hr/>

<br/>
<br/>

# Wallet (Carteira)

**RN**
- Verificar se usuário existe.
- Verificar se carteira já existe, caso exista lançar erro.

<br/>

## Rotas
- **POST** -> Criar carteira.
- **GET** -> Buscar carteira pelo usuário e suas transações.
- **DELETE**

<hr/>

<br/>
<br/>

# Wallet transactions (Transações da Carteira)

**RN**
- Verificar se carteira existe.


<br/>

## Rotas
- **POST** -> Criar transação.
- **GET** -> Buscar todas transações pela carteira.
- **DELETE**

<br/>
<br/>

# Investments (Investimentos)

**RN**
- Verificar se meta existe.


<br/>

## Rotas
- **POST** -> Criar investimento.
- **GET** -> Buscar todos investimentos pela meta.
- **DELETE**

<hr/>

<br/>
<br/>

# Investments transactions (Transações de Investimentos)

**RN**
- Verificar se investimento existe.

<br/>

## Rotas
- **POST** -> Criar transação de investimento.
- **GET** -> Buscar todas transações de investimento pelo investimento.
- **DELETE**

<hr/>

<br/>
<br/>

# Goals (Metas)
 
**RN**
- Verificar se usuário existe.
- Verificar se já existe uma meta com o mesmo nome, caso exista lançar erro.

## Rotas
- **POST** -> Criar meta.
- **GET** -> Buscar todas as metas pelo usuario.
- **GET** -> Buscar meta pelo id da meta passada.
- **DELETE**
 
<hr/>

<br/>
<br/>

# Videos

Os vídeos serão adicionados pelo back-end

<hr/>

<br/>
<br/>
<br/>

# Commentarys (Comentários) ✅

**RN**
- Verificar se usuário existe
- Verificar se id do video passado existe

## Rotas
- **POST** -> Criar comentário. ✅
- **GET** -> Buscar todos os comentários vídeo. ✅
- **DELETE** ✅

<hr/>

<br/>
<br/>
<br/>

# Favorite_Videos (Videos Favoritos) ✅

**RN**
- Verificar se usuário existe
- Verificar se id do video passado existe
- Verificar se o vídeo já foi adicionado aos favoritos, caso sim lançar erro.

## Rotas
- **POST** -> adicionar vídeo favorito. ✅
- **GET** -> Buscar todos os vídeos favoritos usuário. ✅
- **DELETE** ✅

<hr/>
 


