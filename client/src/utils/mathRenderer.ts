/**
 * Utilitaire pour convertir les expressions mathématiques en LaTeX
 * et améliorer le rendu des formules dans l'interface
 */

export interface MathExpression {
  type: 'inline' | 'block';
  expression: string;
  latex: string;
}

/**
 * Convertit une expression mathématique brute en syntaxe LaTeX
 */
export function toLatex(expr: string): string {
  if (!expr || typeof expr !== 'string') return '';
  
  let latex = expr;
  
  // Remplacer les décimales françaises par des décimales anglaises
  latex = latex.replace(/(\d+),(\d+)/g, '$1.$2');
  
  // Conversions de base
  latex = latex
    // Exposants
    .replace(/\^(-?\d+)/g, '^{$1}')
    .replace(/\^(-?\([^)]+\))/g, '^{$1}')
    .replace(/\^(-?[a-zA-Z]+)/g, '^{$1}')
    
    // Indices
    .replace(/_(-?\d+)/g, '_{$1}')
    .replace(/_(-?\([^)]+\))/g, '_{$1}')
    .replace(/_(-?[a-zA-Z]+)/g, '_{$1}')
    
    // Fonctions exponentielles
    .replace(/e\^/g, 'e^')
    .replace(/exp\(([^)]+)\)/g, 'e^{$1}')
    
    // Fonctions logarithmes
    .replace(/ln\(([^)]+)\)/g, '\\ln($1)')
    .replace(/log\(([^)]+)\)/g, '\\log($1)')
    
    // Fonctions trigonométriques
    .replace(/sin\(([^)]+)\)/g, '\\sin($1)')
    .replace(/cos\(([^)]+)\)/g, '\\cos($1)')
    .replace(/tan\(([^)]+)\)/g, '\\tan($1)')
    
    // Racines
    .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
    .replace(/√\(([^)]+)\)/g, '\\sqrt{$1}')
    .replace(/√(\d+)/g, '\\sqrt{$1}')
    
    // Fractions simples
    .replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')
    .replace(/\(([^)]+)\)\/\(([^)]+)\)/g, '\\frac{$1}{$2}')
    
    // Opérateurs
    .replace(/\*/g, ' \\cdot ')
    .replace(/×/g, ' \\times ')
    .replace(/÷/g, ' \\div ')
    .replace(/->/g, ' \\to ')
    .replace(/=>/g, ' \\Rightarrow ')
    .replace(/<=>/g, ' \\Leftrightarrow ')
    .replace(/lim/g, '\\lim')
    .replace(/∞/g, '\\infty')
    .replace(/±/g, '\\pm')
    .replace(/≤/g, '\\leq')
    .replace(/≥/g, '\\geq')
    .replace(/≠/g, '\\neq')
    .replace(/∈/g, '\\in')
    .replace(/∉/g, '\\notin')
    .replace(/⊂/g, '\\subset')
    .replace(/⊃/g, '\\supset')
    .replace(/∪/g, '\\cup')
    .replace(/∩/g, '\\cap')
    .replace(/∀/g, '\\forall')
    .replace(/∃/g, '\\exists')
    .replace(/∇/g, '\\nabla')
    .replace(/∂/g, '\\partial')
    .replace(/∫/g, '\\int')
    .replace(/∑/g, '\\sum')
    .replace(/∏/g, '\\prod')
    
    // Lettres grecques
    .replace(/alpha/g, '\\alpha')
    .replace(/beta/g, '\\beta')
    .replace(/gamma/g, '\\gamma')
    .replace(/delta/g, '\\delta')
    .replace(/epsilon/g, '\\epsilon')
    .replace(/zeta/g, '\\zeta')
    .replace(/eta/g, '\\eta')
    .replace(/theta/g, '\\theta')
    .replace(/lambda/g, '\\lambda')
    .replace(/mu/g, '\\mu')
    .replace(/pi/g, '\\pi')
    .replace(/rho/g, '\\rho')
    .replace(/sigma/g, '\\sigma')
    .replace(/tau/g, '\\tau')
    .replace(/phi/g, '\\phi')
    .replace(/chi/g, '\\chi')
    .replace(/psi/g, '\\psi')
    .replace(/omega/g, '\\omega')
    
    // Nettoyer les espaces multiples
    .replace(/\s+/g, ' ')
    .trim();
  
  return latex;
}

/**
 * Detecte et convertit les expressions mathématiques dans un texte
 */
export function detectMathExpressions(text: string): Array<{
  type: 'text' | 'math';
  content: string;
  latex?: string;
}> {
  if (!text) return [];
  
  const parts: Array<{ type: 'text' | 'math'; content: string; latex?: string }> = [];
  
  // Patterns pour détecter les expressions mathématiques
  const mathPatterns = [
    // Équations avec égalité
    /([a-zA-Z]\([^)]*\)\s*=\s*[^.\n]+)/g,
    // Expressions avec exposants
    /([a-zA-Z0-9]+\s*\^\s*[^.\s]+)/g,
    // Fractions
    /([^.\s]+\s*\/\s*[^.\s]+)/g,
    // Fonctions
    /((?:sin|cos|tan|ln|log|exp|sqrt)\([^)]+\))/g,
    // Limites
    /(lim\([^)]*\)[^.\n]*)/g,
    // Expressions avec symboles mathématiques
    /([^.\n]*[×÷±≤≥≠∞π∑∫][^.\n]*)/g,
  ];
  
  let lastIndex = 0;
  const matches: Array<{ match: string; index: number; end: number }> = [];
  
  // Collecter toutes les correspondances
  mathPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      matches.push({
        match: match[0],
        index: match.index,
        end: match.index + match[0].length
      });
    }
  });
  
  // Trier par index
  matches.sort((a, b) => a.index - b.index);
  
  // Construire les parties
  matches.forEach(({ match, index, end }) => {
    // Ajouter le texte avant la correspondance
    if (index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, index)
      });
    }
    
    // Ajouter l'expression mathématique
    parts.push({
      type: 'math',
      content: match,
      latex: toLatex(match)
    });
    
    lastIndex = end;
  });
  
  // Ajouter le texte restant
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex)
    });
  }
  
  // Si aucune expression mathématique n'a été trouvée, retourner le texte complet
  if (parts.length === 0) {
    parts.push({
      type: 'text',
      content: text
    });
  }
  
  return parts;
}

/**
 * Convertit les calculs d'une solution en LaTeX
 */
export function formatCalculationsToLatex(calculations: Array<{
  step: string;
  calculation: string;
  result: string;
}>): Array<{
  step: string;
  calculation: string;
  result: string;
  latexCalculation: string;
  latexResult: string;
}> {
  return calculations.map(calc => ({
    ...calc,
    latexCalculation: toLatex(calc.calculation),
    latexResult: toLatex(calc.result)
  }));
}

/**
 * Formate les étapes avec expressions mathématiques
 */
export function formatStepsWithMath(steps: string[]): Array<{
  original: string;
  parts: Array<{ type: 'text' | 'math'; content: string; latex?: string }>;
}> {
  return steps.map(step => ({
    original: step,
    parts: detectMathExpressions(step)
  }));
}