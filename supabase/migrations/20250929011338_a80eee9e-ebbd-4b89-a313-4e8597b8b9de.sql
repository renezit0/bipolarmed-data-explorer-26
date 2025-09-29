-- Desabilitar RLS para a tabela medicbipo, pois são dados públicos de saúde
-- Estes dados são provenientes do TabWin/SUS e não contêm informações pessoais sensíveis
ALTER TABLE public.medicbipo DISABLE ROW LEVEL SECURITY;