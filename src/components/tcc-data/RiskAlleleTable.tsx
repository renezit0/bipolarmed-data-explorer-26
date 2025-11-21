import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dna } from "lucide-react";

export const RiskAlleleTable = () => {
  const data = [
    { genotype: "AA", riskAllele: "A", numRiskAlleles: 2, chanceDes: "+++" },
    { genotype: "AG", riskAllele: "A", numRiskAlleles: 1, chanceDes: "++" },
    { genotype: "GG", riskAllele: "A", numRiskAlleles: 0, chanceDes: "+" },
  ];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Dna className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Tabela 1 – Ilustração de Alelo de risco</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="bg-primary/10 px-4 py-3 border-b">
            <p className="text-sm font-semibold flex items-center gap-2">
              <Dna className="h-4 w-4" />
              Tabela ilustrativa – PRS (Alelo de risco = A)
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-center">Genótipo do indivíduo</TableHead>
                <TableHead className="font-semibold text-center">Alelo de risco</TableHead>
                <TableHead className="font-semibold text-center">Nº de alelos de risco</TableHead>
                <TableHead className="font-semibold text-center">Chance desenvolvimento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{row.genotype}</TableCell>
                  <TableCell className="text-center">{row.riskAllele}</TableCell>
                  <TableCell className="font-semibold text-center">{row.numRiskAlleles}</TableCell>
                  <TableCell className="text-center">{row.chanceDes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-muted/30 rounded-lg p-6 border">
          <p className="text-sm font-semibold mb-4 text-muted-foreground">Fórmula do PRS:</p>
          <div className="flex justify-center">
            <div className="bg-card px-8 py-6 rounded-lg border shadow-sm">
              <p className="text-2xl font-serif text-center">
                <span className="italic">PRS</span>
                <sub className="text-base">i</sub>
                <span className="mx-2">=</span>
                <span className="inline-flex flex-col items-center relative">
                  <span className="text-3xl font-light">Σ</span>
                  <span className="absolute -bottom-4 text-xs">
                    <span className="italic">j</span>=1
                  </span>
                  <span className="absolute -top-4 text-xs italic">M</span>
                </span>
                <span className="ml-2">(</span>
                <span className="italic">θ</span>
                <sub className="text-base italic">j</sub>
                <span className="mx-1">×</span>
                <span className="italic">G</span>
                <sub className="text-base italic">ij</sub>
                <span>)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="bg-primary/10 px-4 py-3 border-b">
            <p className="text-sm font-semibold flex items-center gap-2">
              <Dna className="h-4 w-4" />
              Tabela — Valores para o cálculo do Risco Poligênico (PRS)
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-center">Variantes</TableHead>
                <TableHead className="font-semibold text-center">β (log OR)</TableHead>
                <TableHead className="font-semibold text-center">Genótipo (A) — nº de alelos de risco</TableHead>
                <TableHead className="font-semibold text-center">Contribuição (β × A)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">Variante 1</TableCell>
                <TableCell className="text-center">0,10</TableCell>
                <TableCell className="font-semibold text-center">2</TableCell>
                <TableCell className="text-center">0,20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center">Variante 2</TableCell>
                <TableCell className="text-center">0,15</TableCell>
                <TableCell className="font-semibold text-center">1</TableCell>
                <TableCell className="text-center">0,15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center">Variante 3</TableCell>
                <TableCell className="text-center">0,20</TableCell>
                <TableCell className="font-semibold text-center">0</TableCell>
                <TableCell className="text-center">0,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center">Variante 4</TableCell>
                <TableCell className="text-center">0,08</TableCell>
                <TableCell className="font-semibold text-center">2</TableCell>
                <TableCell className="text-center">0,16</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center">Variante 5</TableCell>
                <TableCell className="text-center">0,12</TableCell>
                <TableCell className="font-semibold text-center">1</TableCell>
                <TableCell className="text-center">0,12</TableCell>
              </TableRow>
              <TableRow className="font-semibold bg-muted/30">
                <TableCell className="text-center">Total</TableCell>
                <TableCell className="text-center">—</TableCell>
                <TableCell className="text-center">—</TableCell>
                <TableCell className="text-center">0,63</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
