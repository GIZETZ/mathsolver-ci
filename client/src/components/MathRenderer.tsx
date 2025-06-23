import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { detectMathExpressions, toLatex } from '@/utils/mathRenderer';

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Composant pour rendre du texte avec des expressions mathématiques
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const parts = detectMathExpressions(text);
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === 'math' && part.latex) {
          return (
            <InlineMath 
              key={index} 
              math={part.latex}
              errorColor="#ef4444"
              renderError={(error) => (
                <span className="text-red-500 bg-red-50 px-1 rounded text-xs">
                  {part.content}
                </span>
              )}
            />
          );
        }
        return <span key={index}>{part.content}</span>;
      })}
    </span>
  );
};

interface MathBlockProps {
  expression: string;
  className?: string;
}

/**
 * Composant pour rendre une expression mathématique en bloc
 */
export const MathBlock: React.FC<MathBlockProps> = ({ expression, className = '' }) => {
  const latex = toLatex(expression);
  
  return (
    <div className={`my-2 text-center ${className}`}>
      <BlockMath 
        math={latex}
        errorColor="#ef4444"
        renderError={(error) => (
          <div className="text-red-500 bg-red-50 p-2 rounded border border-red-200 text-sm">
            <div className="font-medium">Erreur de rendu LaTeX:</div>
            <div className="font-mono mt-1">{expression}</div>
          </div>
        )}
      />
    </div>
  );
};

interface CalculationStepProps {
  step: string;
  calculation: string;
  result: string;
  className?: string;
}

/**
 * Composant pour afficher une étape de calcul avec rendu mathématique
 */
export const CalculationStep: React.FC<CalculationStepProps> = ({ 
  step, 
  calculation, 
  result, 
  className = '' 
}) => {
  const latexCalculation = toLatex(calculation);
  const latexResult = toLatex(result);
  
  return (
    <div className={`border-l-4 border-blue-500 pl-4 py-2 ${className}`}>
      <h4 className="font-medium text-gray-900 mb-2">{step}</h4>
      <div className="bg-gray-50 rounded-lg p-3 mb-2">
        <div className="text-sm text-gray-600 mb-1">Calcul :</div>
        <div className="font-mono">
          <BlockMath 
            math={latexCalculation}
            errorColor="#ef4444"
            renderError={() => (
              <code className="text-gray-800 bg-white px-2 py-1 rounded">
                {calculation}
              </code>
            )}
          />
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-3">
        <div className="text-sm text-blue-600 mb-1">Résultat :</div>
        <div className="font-semibold text-blue-700">
          <InlineMath 
            math={latexResult}
            errorColor="#ef4444"
            renderError={() => (
              <span className="text-blue-700">{result}</span>
            )}
          />
        </div>
      </div>
    </div>
  );
};

interface MathSolutionProps {
  introduction: string;
  development: string;
  conclusion: string;
  calculations?: Array<{
    step: string;
    calculation: string;
    result: string;
  }>;
  steps?: string[];
  className?: string;
}

/**
 * Composant principal pour afficher une solution mathématique complète
 */
export const MathSolution: React.FC<MathSolutionProps> = ({
  introduction,
  development,
  conclusion,
  calculations = [],
  steps = [],
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Introduction */}
      {introduction && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Introduction</h3>
          <div className="text-blue-700">
            <MathText text={introduction} />
          </div>
        </div>
      )}

      {/* Développement */}
      {development && (
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h3 className="font-medium text-green-900 mb-2">Développement</h3>
          <div className="text-green-700 leading-relaxed">
            <MathText text={development} />
          </div>
        </div>
      )}

      {/* Calculs détaillés */}
      {calculations.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Calculs détaillés</h3>
          <div className="space-y-4">
            {calculations.map((calc, index) => (
              <CalculationStep
                key={index}
                step={calc.step}
                calculation={calc.calculation}
                result={calc.result}
              />
            ))}
          </div>
        </div>
      )}

      {/* Étapes */}
      {steps.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Étapes de résolution</h3>
          <ol className="space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">
                  {index + 1}
                </span>
                <div className="text-sm text-gray-700 flex-1">
                  <MathText text={step} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Conclusion */}
      {conclusion && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h3 className="font-medium text-purple-900 mb-2">Conclusion</h3>
          <div className="text-purple-700">
            <MathText text={conclusion} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MathSolution;