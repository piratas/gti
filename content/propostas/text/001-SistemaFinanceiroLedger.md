- Data Inicial: 22/07/2016

# Resumo da Proposta

Criar um sistema de transparência financeira que seja útil, aberto e fácil de usar e auditar, baseado processos,  arquivo texto, sistema de controle de versão (git), integração contínua (Travis CI) e sistema open-source Ledger.

# Motivação

Uma das cláusulas pétreas do PIRATAS é a defesa da transparência pública.  Por isso, temos que dar exemplo.

Com o aumento do número de colaboradores e regionais aumenta a complexidade organizacional do partido. É, portanto, preciso ir para um outro patamar de maturidade organizacional em que a gestão financeira é feita com auxílio de sistemas e seus dados sejam abertos e facilmente auditáveis. Tal sistema seria capaz de fazer a contabilidade gerencial do partido, registrando o fluxo de dinheiro e tornando mais claro suas prioridades e obrigações.

Esta proposta especifica um sistema baseado em:
- pessoas e processos,
- arquivo texto,
- sistema de controle de versão (git) e integração contínua
- sistema open-source Ledger
- sistemas de web para inserção e visualização de dados

Dados contáveis são valiosos; queremos mantê-los acessíveis para sempre, mesmo sem usar software.  Queremos saber quando mudam e saber o que mudou, em tecniquês, controlar versões. Queremos manipulá-los eficientemente, movê-los de um sistema para outro sem dificuldades. Então, a melhor maneira é guardá-los em arquivos texto legíveis por humanos.

Basear o sistema em arquivo texto não significa que os usuários terão que editar arquivos na mão, mas significa que eles poderão fazê-lo se quiserem ou precisarem.

Há várias vantagens de um [sistema de contabilidade baseado em texto](http://plaintextaccounting.org/):

- **Durabilidade**:  É importantes que registros contábeis feitos hoje sejam legíveis daqui anos ou décadas. Sistemas que geram binários (mesmo de software livre) geram dores de cabeça com arquivos que precisam ser migrados para versões mais novas. Para ilustrar, hoje é difícil abrir um arquivo Word de 1990, mas é fácil abrir um arquivo texto de 1960.

- **Trasparência**: Qualquer pessoa pode abrir os registros e entender. Não é preciso instalar nenhum software especial para ler, auditar ou editar. É bom ressaltar que além de serem em textos, são formatos legíveis para pessoas que entendam o sistema de contabilidade por partidas dobradas.

- **Interoperabilidade**: Como os registros são simples textos, é fácil criar ou usar sistemas existentes que:
  - funcionem como interface gráfica de entrada/saída de dados (interfaces web, mobile, etc. Ex. https://asciinema.org/a/29665 ou http://demo.hledger.org/journal);
  - importem dados de internet banking ou outras fontes;
  - manipulem o texto (controle de versão, diffs, etc);
  -
   integrem os registros de transações com outros sistemas (uso de ferramentas como o Zapier ou IFTT, etc);

- **Decentralização**: Não há problemas de se separar o registro em diferentes arquivos.  Os registros podem ser feitos por diretório, grupo de trabalho ou até mesmo individualmente.


# Projeto detalhado

A ideia básica é:

1. Pessoas registram transações em arquivos texto no formato Ledger. Essas transações podem ser individuais ou representar uma despesa de um grupo de trabalho ou diretório.

2. Elas adicionam essa informação no registro oficial mantido no Github em uma _edição proposta_ e solicitam que o texto seja incluído no repositório contábil. Em tecniquês: **fork** do repositório, **edit**, **pull request**. Não é preciso que o usuário saiba usar interface por linha de comando por 2 motivos:
  1. O Github dá a posibilidade de se editar e pedir aprovação (pull request) via interface web.
  2. Vamos ter uma ferramenta para gerar as entradas e dar pull request no Github automaticamente. (Item 4)

3. Para que a edição seja aprovada, precisa passar pelo sistema de integração contínua, que usará o ledger para validar que a transação registrada está consistente com o resto dos dados contábeis. O próprio sistema de integração contínua gerará relatórios como balancetes e balanços em formato texto.  alguns desses relatórios serão geradas especificamente para serem lidos por outros sistemas.

4. Será feito uma interface gráfica HTML5 que funcione web e mobile para inserção de dados, geração dos registros em textos e interoperabilidade automática com Github.

5. Serão criados sistemas de visualização de relatórios contábeis e exportação para planilha e pdf.

### Ledger, o sistema de verificação de partidas dobradas
O [Ledger](http://ledger-cli.org) é um formato de dados em texto puro e uma ferramenta por linha de comando para contabilidade pelo sistema de partidas dobradas (double-entry-style).

Exemplo de registro no Ledge:

```
; Registra esta estrutura de contas:
; Ativos
;   Banco
;     Conta Corrente
;     Poupança
;   Caixa pequeno
; Despesas
;   Limpeza
;   Suprimentos
; Receitas
;   Doações
;   Repasse
; Passivo
;   Contas a Pagar

2008/01/01 Depósito                         ;nome da transação
    Ativos:Banco:Conta Corrente   R$100     ;conta destino
    Receitas:Repasse              R$-100    ;conta origem

2008/06/01 Doação via Internet
    Ativos:Banco:Conta Corrente   R$100
    Receitas:Doações                        ;se não preencher valor, ledger infere

2008/06/02 Investimento em Poupança
    ativos:banco:poupança         R$100
    ativos:banco:conta corrente

2008/06/03 * Armazém do Zé
    despesas:limpeza              R$50      ;pode usar área de comentários
    despesas:suprimentos          R$25      ;para linkar imagens de recibos
    ativos:caixa pequeno          R$-75

```
Ledger usa o paradigma funcional: lê dados sem alterá-los, e gera relatórios de saídas. Tal modelo simples o torna fácil de entender e também é confiável.

Há diversas variantes do Ledger e a proposta é usar o Hledger, feito em Haskell, uma linguagem funcional.


# Desvantagens

- O uso de um sistema baseado em texto pode assustar usuários não técnicos.
- O investimento inicial é maior do que o uso de uma ferramenta já pronta, paga e fechada.
- Não é uma solução imediata, leva tempo desenvolver.
- Não temos conhecimento de outras organizações que utilizem esse método.

# Alternativas

- Conta Azul, Nibo, etc;
- [Odoo](http://odoo.com), open source, mas mantém dados em bancos de dados que precisam ser mantidos;
- [FieldBook](http://fieldbookapp.com), não é livre nem aberto, mas é bem simples de adaptar para o uso e é flexível.

# Como posso ajudar?
1. Sugira alterações e melhorias nesta proposta.
2. Da Tesouraria? Definir contas e levantar transações mais comuns.
3. DevOp? Nos ajude a instalar um servidor de integração contínua que rode o Ledger para verificar a integridade do arquivo a ser mergeado.
4. Desenvolvedor? Capaz de fazer um sistema web ou mobile que gere arquivos txt no padrão Ledger e dê pull request no github?
5. Designer?  Nos ajude a pensar em uma UI intuitiva para sistemas mobile/web.
6. Outra ideia de como pode ajudar? Insira mais um tópico nesta lista.

# Status
O projeto está em desenvolvimento.  Mais informações em https://github.com/piratas/tesouro-pirata
