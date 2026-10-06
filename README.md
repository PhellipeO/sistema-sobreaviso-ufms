# sistema-sobreaviso-ufms
Projeto Integrador II - Sistema Web de Gestão de Sobreaviso para a HU Brasil

# Projeto Integrador: Sistema Web para Gestão de Sobreaviso

**Curso:** Superior de Tecnologia da Informação – UFMS Digital  
**Disciplina:** Projeto Integrador de Tecnologia da Informação II (T01-2026-2)  
**Desenvolvedores:** Phellipe Oliveira de Almeida e Nyágara Veras de Freitas  

## Sobre o Projeto
Este repositório contém o código-fonte do sistema web desenvolvido como Ação de Extensão para o Setor de Pagamento (UAP/DivGP) do Hospital Universitário de Brasília (HUB-UnB / Rede HU Brasil). 

O objetivo do software é automatizar o fracionamento das horas de plantões de sobreaviso, substituindo a transcrição manual de planilhas por um motor lógico de cálculo. A solução resolve o gargalo operacional de apuração de horas noturnas, domingos e feriados, mitigando falhas humanas na folha de pagamento.

## Funcionalidades Implementadas
* **Cadastro de Colaboradores:** Módulo conectado ao banco de dados para registro dos servidores (Nome e Matrícula) aptos à escala de sobreaviso.
* **Processamento de Frequência (Parser):** Ferramenta que recebe o texto bruto dos relatórios de ponto e extrai os horários de entrada e saída automaticamente usando Expressões Regulares (Regex).
* **Cálculo Automático de Rubricas:** Motor matemático escrito em TypeScript que aplica as regras estatutárias (CLT/EBSERH) para dividir a jornada nas colunas financeiras pertinentes.
* **Calendário Parametrizável (Supabase):** Sistema integrado que consome feriados diretamente de uma API do Supabase para incidência automática de horas a 100%.
* **Exportação e Backup Local:** Geração de relatórios CSV com apenas um clique para backup seguro local na máquina do analista.

## Tecnologias Utilizadas
A aplicação evoluiu de um monolito HTML para uma arquitetura moderna baseada no padrão MVC (Model-View-Controller) rodando no Client-Side e Server-Side:

* **Next.js e React:** Escolhidos para estruturar componentes reutilizáveis e agilizar a criação de telas ricas (A View do MVC).
* **Tailwind CSS:** Framework de estilização responsiva para garantir aderência visual aos monitores do hospital.
* **TypeScript:** Adiciona tipagem forte ao JavaScript, garantindo a ausência de quebras no motor matemático do Controller.
* **Supabase:** Utilizado como *Backend as a Service* (O Model do MVC) para gerenciar o banco de dados PostgreSQL sem a necessidade de hospedar servidores complexos.

## Como Executar o Projeto
O sistema requer que o Node.js esteja instalado na máquina.

1. Faça o clone deste repositório para o seu computador:
   ```bash
   git clone https://github.com/SEU-USUARIO/sistema-sobreaviso.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd sistema-sobreaviso
   ```
3. Instale as dependências do projeto (isso criará a pasta node_modules localmente):
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra o navegador e acesse: [http://localhost:3000](http://localhost:3000)
