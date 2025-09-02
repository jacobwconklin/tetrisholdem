"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface GameResults {
  completedLines: number;
  tetrisBonus: number;
  columnBonus: number;
  squareBonus: number;
  lShapeBonus: number;
  tShapeBonus: number;
  penalties: number;
}

export default function TetrisHoldemScorer() {
  const [results, setResults] = useState<GameResults>({
    completedLines: 0,
    tetrisBonus: 0,
    columnBonus: 0,
    squareBonus: 0,
    lShapeBonus: 0,
    tShapeBonus: 0,
    penalties: 0,
  });

  const [finalScore, setFinalScore] = useState<number | null>(null);

  const handleInputChange = (field: keyof GameResults, value: string) => {
    const numValue = parseInt(value) || 0;
    setResults(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const calculateScore = () => {
    const baseScore = results.completedLines * 100;
    const bonusScore = 
      results.tetrisBonus * 300 +
      results.columnBonus * 200 +
      results.squareBonus * 150 +
      results.lShapeBonus * 100 +
      results.tShapeBonus * 100;
    const penaltyScore = results.penalties * 50;
    
    const total = baseScore + bonusScore - penaltyScore;
    setFinalScore(total);
  };

  const resetForm = () => {
    setResults({
      completedLines: 0,
      tetrisBonus: 0,
      columnBonus: 0,
      squareBonus: 0,
      lShapeBonus: 0,
      tShapeBonus: 0,
      penalties: 0,
    });
    setFinalScore(null);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          textAlign: 'center',
          color: 'var(--foreground)'
        }}>
          🎮 Tetris Hold&apos;em Scorer
        </h1>
        
        <p style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          fontSize: '1.1rem',
          color: 'var(--foreground)'
        }}>
          Enter your game results below as you go or at the end of the game to calculate your final score
        </p>

        <div style={{
          background: 'var(--gray-alpha-100)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid var(--gray-alpha-200)',
          maxWidth: '500px',
          width: '100%'
        }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--foreground)' }}>
            Player: 1
            <span style={{ margin: '0 0.5rem' }} />
            Score:
            <b>{finalScore !== null ? finalScore : 0}</b>
          </h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Completed Lines (100 points each):
            </label>
            <input
              type="number"
              min="0"
              value={results.completedLines}
              onChange={(e) => handleInputChange('completedLines', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-alpha-200)',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Tetris Bonus (300 points each):
            </label>
            <input
              type="number"
              min="0"
              value={results.tetrisBonus}
              onChange={(e) => handleInputChange('tetrisBonus', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-alpha-200)',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Column Bonus (200 points each):
            </label>
            <input
              type="number"
              min="0"
              value={results.columnBonus}
              onChange={(e) => handleInputChange('columnBonus', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-alpha-200)',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Square Bonus (150 points each):
            </label>
            <input
              type="number"
              min="0"
              value={results.squareBonus}
              onChange={(e) => handleInputChange('squareBonus', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-alpha-200)',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              L-Shape Bonus (100 points each):
            </label>
            <input
              type="number"
              min="0"
              value={results.lShapeBonus}
              onChange={(e) => handleInputChange('lShapeBonus', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-alpha-200)',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              T-Shape Bonus (100 points each):
            </label>
            <input
              type="number"
              min="0"
              value={results.tShapeBonus}
              onChange={(e) => handleInputChange('tShapeBonus', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-alpha-200)',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Penalties (-50 points each):
            </label>
            <input
              type="number"
              min="0"
              value={results.penalties}
              onChange={(e) => handleInputChange('penalties', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-alpha-200)',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div className={styles.ctas}>
            <button
              onClick={calculateScore}
              className={styles.primary}
              style={{
                background: 'var(--foreground)',
                color: 'var(--background)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Calculate Score
            </button>
            <button
              onClick={resetForm}
              className={styles.secondary}
              style={{
                background: 'transparent',
                color: 'var(--foreground)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Reset
            </button>
          </div>

          {finalScore !== null && (
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'var(--foreground)',
              color: 'var(--background)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
                Final Score
              </h2>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {finalScore} points
              </div>
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                <div>Base: {results.completedLines * 100} pts</div>
                <div>Bonuses: {results.tetrisBonus * 300 + results.columnBonus * 200 + results.squareBonus * 150 + results.lShapeBonus * 100 + results.tShapeBonus * 100} pts</div>
                <div>Penalties: -{results.penalties * 50} pts</div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--foreground)' }}>
          🎲 Tetris Hold&apos;em Score Calculator
        </div>
      </footer>
    </div>
  );
}
