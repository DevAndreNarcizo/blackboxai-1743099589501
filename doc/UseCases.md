# Casos de Uso - Sistema de Automação de Catracas UNIP

## UC1: Autenticação de Usuário

### Descrição
Processo de validação das credenciais do usuário para acesso ao sistema.

### Atores
- Usuário (aluno, professor ou funcionário)
- Sistema de Autenticação

### Pré-condições
- Sistema em funcionamento
- Usuário cadastrado no sistema

### Fluxo Principal
1. Usuário apresenta credenciais (cartão/senha)
2. Sistema valida as credenciais
3. Sistema verifica permissões de acesso
4. Sistema autoriza a passagem
5. Sistema registra o acesso bem-sucedido

### Fluxos Alternativos
**A1. Credenciais Inválidas**
1. Sistema identifica credenciais inválidas
2. Sistema exibe mensagem de erro
3. Sistema registra tentativa de acesso inválida
4. Sistema mantém catraca bloqueada

**A2. Permissão Expirada**
1. Sistema identifica permissão expirada
2. Sistema exibe mensagem específica
3. Sistema registra tentativa de acesso
4. Sistema mantém catraca bloqueada

## UC2: Acionamento da Catraca

### Descrição
Controle do mecanismo físico da catraca após autenticação.

### Atores
- Sistema de Controle
- Usuário

### Pré-condições
- Autenticação bem-sucedida
- Catraca em funcionamento normal

### Fluxo Principal
1. Sistema recebe autorização
2. Sistema libera o mecanismo da catraca
3. Usuário realiza a passagem
4. Sistema detecta passagem completa
5. Sistema bloqueia a catraca
6. Sistema registra evento

### Fluxos Alternativos
**A1. Timeout de Passagem**
1. Usuário não realiza passagem no tempo limite
2. Sistema bloqueia automaticamente
3. Sistema registra ocorrência
4. Sistema exibe mensagem informativa

**A2. Falha Mecânica**
1. Sistema detecta falha no mecanismo
2. Sistema registra erro técnico
3. Sistema notifica manutenção
4. Sistema exibe mensagem de erro

## UC3: Registro de Logs

### Descrição
Sistema de registro e armazenamento de eventos e ocorrências.

### Atores
- Sistema de Logs
- Administrador

### Pré-condições
- Sistema em funcionamento
- Armazenamento disponível

### Fluxo Principal
1. Sistema captura evento
2. Sistema formata dados do evento
3. Sistema adiciona timestamp
4. Sistema armazena registro
5. Sistema confirma registro

### Fluxos Alternativos
**A1. Erro de Armazenamento**
1. Sistema detecta falha no armazenamento
2. Sistema tenta armazenamento alternativo
3. Sistema notifica administrador
4. Sistema mantém log em memória

## UC4: Gestão de Erros

### Descrição
Tratamento e notificação de erros do sistema.

### Atores
- Sistema
- Administrador
- Usuário

### Pré-condições
- Sistema em monitoramento

### Fluxo Principal
1. Sistema detecta erro
2. Sistema classifica severidade
3. Sistema registra ocorrência
4. Sistema notifica responsáveis
5. Sistema executa procedimento de recuperação

### Fluxos Alternativos
**A1. Erro Crítico**
1. Sistema identifica erro crítico
2. Sistema inicia modo de segurança
3. Sistema notifica emergência
4. Sistema bloqueia operações

## Considerações Técnicas

### Segurança
- Implementação de timeout em todas as operações
- Registro detalhado de erros e exceções
- Validação de dados em todas as entradas

### Performance
- Otimização de consultas e operações
- Cache de dados frequentes
- Monitoramento de tempos de resposta

### Manutenibilidade
- Logs detalhados para debugging
- Documentação de erros conhecidos
- Procedimentos de recuperação documentados