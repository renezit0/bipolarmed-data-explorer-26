import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProcessedMedicData } from '@/hooks/useMedicData';

interface MedicationDistributionTableProps {
  data: ProcessedMedicData[];
}

// Mapeamento de medicamentos para classes e indicações
const MEDICATION_INFO: Record<string, { class: string; indication: string }> = {
  'quetiapina': {
    class: 'Antipsicótico',
    indication: 'Mania, depressão bipolar'
  },
  'lamotrigina': {
    class: 'Anticonvulsivante',
    indication: 'Depressão, manutenção'
  },
  'olanzapina': {
    class: 'Antipsicótico',
    indication: 'Mania aguda'
  },
  'risperidona': {
    class: 'Antipsicótico',
    indication: 'Mania aguda'
  },
  'ácido valproico': {
    class: 'Anticonvulsivante',
    indication: 'Mania, estados mistos'
  },
  'valproato': {
    class: 'Anticonvulsivante',
    indication: 'Mania, estados mistos'
  },
  'carbonato de lítio': {
    class: 'Estabilizador do humor',
    indication: 'Mania, manutenção'
  },
  'lítio': {
    class: 'Estabilizador do humor',
    indication: 'Mania, manutenção'
  },
  'carbamazepina': {
    class: 'Anticonvulsivante',
    indication: 'Mania, estados mistos'
  },
  'clozapina': {
    class: 'Antipsicótico',
    indication: 'Casos refratários'
  },
  'ziprasidona': {
    class: 'Antipsicótico',
    indication: 'Mania aguda'
  },
  'haloperidol': {
    class: 'Antipsicótico',
    indication: 'Mania aguda'
  }
};

export const MedicationDistributionTable = ({ data }: MedicationDistributionTableProps) => {
  const medicationData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const totalConsumption = data.reduce((sum, medic) => sum + medic.totalConsumption, 0);

    // Agrupar por substância ativa
    const grouped = new Map<string, { 
      name: string; 
      total: number; 
      class: string; 
      indication: string;
    }>();

    data.forEach(medic => {
      // Extrair substância ativa do nome
      const nameLower = medic.simplifiedName.toLowerCase();
      
      let substanceName = '';
      let info = { class: 'Outros', indication: 'Variadas' };

      // Buscar correspondência no mapeamento
      for (const [key, value] of Object.entries(MEDICATION_INFO)) {
        if (nameLower.includes(key)) {
          substanceName = key.charAt(0).toUpperCase() + key.slice(1);
          info = value;
          break;
        }
      }

      // Se não encontrou correspondência, usar o nome simplificado
      if (!substanceName) {
        substanceName = medic.simplifiedName.split(' ').slice(0, 2).join(' ');
      }

      if (grouped.has(substanceName)) {
        const existing = grouped.get(substanceName)!;
        existing.total += medic.totalConsumption;
      } else {
        grouped.set(substanceName, {
          name: substanceName,
          total: medic.totalConsumption,
          class: info.class,
          indication: info.indication
        });
      }
    });

    // Converter para array e calcular porcentagens
    const result = Array.from(grouped.values())
      .map(item => ({
        ...item,
        percentage: (item.total / totalConsumption) * 100
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10); // Top 10

    return result;
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tabela 2 – Distribuição do Consumo por Medicamento</CardTitle>
          <CardDescription>Principais medicamentos utilizados no tratamento do TAB</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Nenhum dado disponível para análise</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!medicationData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tabela 2 – Distribuição do Consumo por Medicamento</CardTitle>
          <CardDescription>Principais medicamentos utilizados no tratamento do TAB</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Dados insuficientes para análise</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(Math.round(num));
  };

  const getClassColor = (className: string) => {
    switch (className) {
      case 'Antipsicótico': return 'default';
      case 'Anticonvulsivante': return 'secondary';
      case 'Estabilizador do humor': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabela 2 – Distribuição do Consumo por Medicamento</CardTitle>
        <CardDescription>
          Top 10 medicamentos mais consumidos no tratamento do Transtorno Bipolar. Fonte: SIA/SUS (BRASIL, 2025), processado em tcc.seellbr.com.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Medicamento</TableHead>
                <TableHead className="font-bold">Classe</TableHead>
                <TableHead className="text-right font-bold">Consumo</TableHead>
                <TableHead className="text-right font-bold">% Total</TableHead>
                <TableHead className="font-bold">Indicação Principal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicationData.map((med, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{med.name}</TableCell>
                  <TableCell>
                    <Badge variant={getClassColor(med.class)}>{med.class}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatNumber(med.total)}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {med.percentage.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{med.indication}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-4 bg-accent/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Nota:</strong> Os dados representam o consumo total de medicamentos para Transtorno Bipolar 
            no período de junho/2018 a junho/2025, conforme registros do Sistema de Informações Ambulatoriais do SUS (SIA/SUS).
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
