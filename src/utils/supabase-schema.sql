-- Arquivo de migração e documentação do banco de dados
-- Correção apontada no Módulo 1 (Inspeção de Artefatos)

-- Aplicando Integridade Referencial e Restrição ON DELETE CASCADE

ALTER TABLE plantoes
DROP CONSTRAINT IF EXISTS fk_plantao_servidor;

ALTER TABLE plantoes
ADD CONSTRAINT fk_plantao_servidor
FOREIGN KEY (servidor_id) 
REFERENCES servidores (id)
ON DELETE CASCADE;

-- Com esse ajuste, ao excluir um servidor por engano, os plantões atrelados
-- a ele serão apagados automaticamente, evitando registros órfãos que inflariam o banco.
