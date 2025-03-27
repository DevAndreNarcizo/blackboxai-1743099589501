Análise Estruturada - Sistema de Automação de Catracas UNIP
1. Introdução
Este documento apresenta a análise estruturada do sistema de automação das catracas da UNIP, detalhando os requisitos, fluxos de dados e modelos do sistema.

2. Requisitos
2.1 Requisitos Funcionais
RF001 - Autenticação de Usuário

O sistema deve validar as credenciais do usuário
Deve verificar permissões de acesso
Deve registrar tentativas de acesso
RF002 - Controle da Catraca

Deve liberar a catraca após autenticação bem-sucedida
Deve bloquear a catraca após passagem
Deve registrar eventos de passagem
RF003 - Registro de Logs

Deve registrar todas as tentativas de acesso
Deve registrar erros e exceções
Deve manter histórico de eventos
RF004 - Gestão de Erros

Deve identificar falhas de autenticação
Deve notificar problemas técnicos
Deve fornecer feedback ao usuário
2.2 Requisitos Não-Funcionais
RNF001 - Desempenho

Tempo de resposta < 1 segundo
Processamento de autenticação < 2 segundos
RNF002 - Segurança

Dados de autenticação criptografados
Registro de tentativas de acesso não autorizado
Timeout de sessão após 5 minutos
RNF003 - Usabilidade

Interface intuitiva
Feedback visual claro
Suporte a múltiplos idiomas
RNF004 - Disponibilidade

Sistema operacional 24/7
Tempo de inatividade planejado < 0.1%
3. Diagramas
3.1 Diagrama de Contexto
[Usuário] -----(Apresenta Credenciais)-----> [Sistema de Catraca] -----(Libera Acesso)-----> [Área Restrita]
                                                     |
                                                     |
                                              [Base de Dados]
3.2 DFD (Diagrama de Fluxo de Dados) - Nível 0
+----------------+     +-----------------+     +------------------+
|                |     |                 |     |                  |
|    Usuário     |---->|  Autenticação   |---->|  Controle       |
|                |     |                 |     |  de Acesso      |
+----------------+     +-----------------+     +------------------+
                              |
                              v
                      +-----------------+
                      |                 |
                      |    Logs         |
                      |                 |
                      +-----------------+
3.3 Diagrama de Estados da Catraca
[Bloqueada] -----(Autenticação Válida)-----> [Liberada]
     ^                                            |
     |                                           |
     +-----------(Passagem Completa)-------------+
4. Dicionário de Dados
4.1 Entidades
Usuário: Pessoa que utiliza o sistema
Catraca: Dispositivo físico de controle de acesso
Log: Registro de eventos do sistema
4.2 Processos
Autenticação: Validação de credenciais
Liberação: Processo de desbloqueio da catraca
Registro: Armazenamento de eventos
4.3 Fluxos
Credenciais: Dados de identificação do usuário
Autorização: Resultado do processo de autenticação
Evento: Registro de ação no sistema
5. Considerações de Implementação
5.1 Segurança
Implementação de criptografia para dados sensíveis
Registro detalhado de tentativas de acesso
Proteção contra ataques de força bruta
5.2 Performance
Cache de dados frequentes
Otimização de consultas
Monitoramento de tempo de resposta
5.3 Manutenibilidade
Código modular e documentado
Logs detalhados para debugging
Estrutura escalável para futuras expansões
