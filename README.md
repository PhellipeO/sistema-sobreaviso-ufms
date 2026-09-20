# sistema-sobreaviso-ufms
Projeto Integrador II - Sistema Web de Gestão de Sobreaviso para o HU Brasil

# Projeto Integrador: Sistema Web para Gestão de Sobreaviso

**Curso:** Superior de Tecnologia da Informação – UFMS Digital  
**Disciplina:** Projeto Integrador de Tecnologia da Informação II (T01-2026-2)  
**Desenvolvedores:** Phellipe Oliveira de Almeida e Nyágara Veras de Freitas  

## Sobre o Projeto
Este repositório contém o código-fonte do sistema web desenvolvido como Ação de Extensão para o Setor de Pagamento (UAP/DivGP) do Hospital Universitário de Brasília (HU Brasil / Rede EBSERH). 

O objetivo do software é automatizar o fracionamento das horas de plantões de sobreaviso, substituindo a transcrição manual de planilhas por um motor lógico de cálculo. A solução resolve o gargalo operacional de apuração de horas noturnas, domingos e feriados, mitigando falhas humanas na folha de pagamento.

## Funcionalidades Implementadas
* **Cadastro de Colaboradores:** Módulo para registro local dos servidores (Nome e Matrícula) aptos à escala de sobreaviso.
* **Processamento de Frequência (Parser):** Ferramenta que recebe o texto bruto dos relatórios de ponto e extrai os horários de entrada e saída automaticamente.
* **Cálculo Automático de Rubricas:** Motor matemático que aplica as regras estatutárias (CLT/EBSERH) para dividir a jornada nas colunas financeiras pertinentes (Rubricas 81, 878, 361, 363 e Fator de Sobreaviso 300).
* **Calendário Parametrizável:** Sistema integrado que reconhece feriados móveis (Páscoa/Carnaval) e permite o cadastro de feriados locais para incidência automática de horas a 100%.
* **Exportação e Backup:** Geração de relatórios de conferência (A4 Paisagem) com a mesclagem dos arquivos PDF das frequências digitalizadas.

## Tecnologias Utilizadas
A aplicação foi construída visando a máxima compatibilidade com os computadores do ambiente hospitalar, rodando integralmente no lado do cliente (*Client-Side*):

* **HTML5 e CSS3:** Estruturação semântica e estilização de interface.
* **JavaScript (Vanilla):** Responsável por toda a lógica de manipulação do DOM, cálculos matemáticos, expressões regulares (*Regex*) para o *parser* e controle de estados.
* **LocalStorage:** Utilizado para a persistência local dos dados (cadastros e feriados), dispensando a instalação de bancos de dados em nuvem.
* **PDF.js:** Biblioteca externa utilizada para renderizar e anexar as folhas de frequência digitalizadas nos relatórios finais.

## Como Executar o Projeto
O sistema não exige a instalação de dependências ou servidores locais (*Node.js*, *Apache*, etc.). 

1. Faça o clone deste repositório para o seu computador:
   ```bash
   git clone [https://github.com/SEU-USUARIO/sistema-sobreaviso.git](https://github.com/SEU-USUARIO/sistema-sobreaviso.git)
