# 🚀 Checklist de Melhorias - FinTrack

Este documento contém uma lista de melhorias sugeridas para o projeto **FinTrack**, divididas por categorias para facilitar a implementação e o acompanhamento.

---

## 🔐 Autenticação e Segurança

- [x] **Login Social**: Adicionar suporte para Google, GitHub ou Apple via Better Auth.
- [ ] **Multi-Factor Authentication (MFA)**: Implementar verificação em duas etapas.
- [ ] **Gerenciamento de Perfil**: Permitir que o usuário altere nome, foto e senha.
- [x] **Recuperação de Senha**: Fluxo completo de "Esqueci minha senha" com envio de e-mail via Resend.
- [ ] **Sessões Ativas**: Lista de dispositivos logados com opção de revogar acesso.

## 💰 Transações e Finanças

- [ ] **Filtros Avançados**: Filtrar transações por período personalizado, categoria, conta ou valor.
- [ ] **Anexos**: Opção de anexar comprovantes (PDF/Imagem) às transações.
- [ ] **Transações Recorrentes**: Agendamento de receitas/despesas fixas mensais.
- [x] **Categorias Customizadas**: Permitir que o usuário crie, edite e mude ícones/cores das categorias.
- [ ] **Importação de Dados**: Importar transações via arquivo CSV ou OFX (extrato bancário).
- [ ] **Exportação de Relatórios**: Gerar relatórios em PDF ou Excel/CSV.

## 📊 Dashboard e Visualização

- [ ] **Gráficos Comparativos**: Evolução mensal de gastos vs. receitas (Gráfico de Linhas/Área).
- [ ] **Distribuição por Categoria**: Gráfico de pizza/rosca para visualizar onde o dinheiro está indo.
- [ ] **Metas Financeiras**: Criar metas (ex: "Viagem", "Reserva de Emergência") e acompanhar progresso.
- [ ] **Previsão de Saldo**: Projeção do saldo para os próximos meses com base em transações fixas.
- [ ] **Widget de Cotações**: Exibir cotação atual de moedas (Dólar, Euro, BTC).

## 🎨 UI/UX e Frontend

- [ ] **Dark/Light Mode**: Melhorar a persistência e o switch de temas (já possui `next-themes`).
- [ ] **Skeleton Screens**: Adicionar estados de carregamento mais fluidos em todas as páginas.
- [ ] **Animações**: Implementar transições suaves entre páginas e feedbacks visuais (Framer Motion ou CSS Transitions).
- [ ] **Responsividade**: Refinar a experiência mobile (menus, tabelas e modais).
- [ ] **Internacionalização (i18n)**: Suporte para múltiplos idiomas (Português, Inglês, Espanhol).
- [x] **Feedback do Usuário**: Melhorar as mensagens de sucesso/erro com o `sonner`.
- [] **Mensagens de feedback**: Adicionar mensagens de feedback onde as mudanças serão afetadas na edição/criação de transações.

## ⚙️ Técnico e Infraestrutura

- [ ] **Testes Unitários**: Implementar testes com Vitest/Jest para lógica de cálculos.
- [ ] **Testes E2E**: Implementar fluxos críticos (login, criar transação) com Playwright ou Cypress.
- [ ] **Documentação de API**: Documentar as Server Actions e possíveis rotas de API.
- [ ] **CI/CD**: Configurar GitHub Actions para rodar linter e testes em cada Pull Request.
- [ ] **Otimização de Banco de Dados**: Adicionar índices nas colunas mais consultadas (ex: `userId`, `date`).
- [ ] **Logs e Monitoramento**: Integrar com ferramentas como Sentry ou Axiom para erros em produção.

---

## ✅ Concluídos

_(Mover itens para cá conforme forem finalizados)_

- [x] Configuração inicial do projeto com Next.js e Tailwind.
- [x] Integração com Prisma e Banco de Dados.
- [x] Sistema de autenticação base (Better Auth).
- [x] Listagem de transações com filtros básicos.
