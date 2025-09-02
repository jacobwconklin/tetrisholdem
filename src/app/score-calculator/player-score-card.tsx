"use client";

import { useState } from "react";

interface PlayerScoreCardProps {
  playerName: string;
  totalScore: number;
  onScoreUpdate: (scoreType: 'Flush' | 'Straight' | 'Full House', cardCount: number) => void;
}

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (scoreType: 'Flush' | 'Straight' | 'Full House', cardCount: number) => void;
}

const ScoreModal = ({ isOpen, onClose, onSubmit }: ScoreModalProps) => {
  const [scoreType, setScoreType] = useState<'Flush' | 'Straight' | 'Full House'>('Flush');
  const [cardCount, setCardCount] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(scoreType, cardCount);
    onClose();
    // Reset form
    setScoreType('Flush');
    setCardCount(5);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'var(--background-solid, #1a1a2e)',
        color: 'var(--foreground, white)',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 245, 255, 0.2), 0 0 50px rgba(255, 20, 147, 0.1)',
        border: '2px solid var(--tetris-cyan, #00f5ff)',
        minWidth: '320px',
        maxWidth: '400px',
        width: '90%',
      }}>
        <h3 style={{
          margin: '0 0 1.5rem 0',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'var(--casino-gold, #ffd700)',
          textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
          fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
        }}>
          🎲 Add Score 🎲
        </h3>

        <form onSubmit={handleSubmit} >
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              fontWeight: '500',
              fontSize: '1rem',
              color: 'var(--tetris-cyan, #00f5ff)',
              textAlign: 'center',
            }}>
              Score Type:
            </label>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}>
              {(['Flush', 'Straight', 'Full House'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setScoreType(type)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: '2px solid var(--tetris-blue, #0099ff)',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
                    backgroundColor: scoreType === type 
                      ? 'var(--tetris-blue, #0099ff)' 
                      : 'rgba(0, 153, 255, 0.1)',
                    color: scoreType === type 
                      ? '#000000' 
                      : 'var(--tetris-blue, #0099ff)',
                    boxShadow: scoreType === type 
                      ? '0 0 20px rgba(0, 153, 255, 0.6), 0 0 40px rgba(0, 153, 255, 0.3)' 
                      : 'none',
                    textShadow: scoreType === type 
                      ? '0 0 5px rgba(0, 153, 255, 0.8)' 
                      : 'none',
                    transform: scoreType === type ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              fontSize: '1rem',
              color: 'var(--tetris-cyan, #00f5ff)',
            }}>
              Number of Cards (5-19):
            </label>
            <input
              type="number"
              min="5"
              max="19"
              value={cardCount}
              onChange={(e) => setCardCount(parseInt(e.target.value) || 5)}
              style={{
                width: '50%',
                padding: '0.75rem',
                border: '2px solid var(--tetris-orange, #ff9500)',
                borderRadius: '6px',
                fontSize: '1rem',
                backgroundColor: 'rgba(255, 149, 0, 0.1)',
                color: 'var(--foreground, white)',
                fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                border: '2px solid var(--tetris-red, #ff3030)',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 48, 48, 0.1)',
                color: 'var(--tetris-red, #ff3030)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
                transition: 'all 0.2s ease',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: 'var(--tetris-green, #00ff00)',
                color: '#000000',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
                textShadow: '0 0 5px rgba(0, 255, 0, 0.5)',
                boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              Add Score
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PlayerScoreCard = ({ playerName, totalScore, onScoreUpdate }: PlayerScoreCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddScore = () => {
    setIsModalOpen(true);
  };

  const handleScoreSubmit = (scoreType: 'Flush' | 'Straight' | 'Full House', cardCount: number) => {
    onScoreUpdate(scoreType, cardCount);
  };

  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 50%, rgba(15, 52, 96, 0.9) 100%)',
        color: 'var(--foreground, white)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 8px 32px rgba(0, 245, 255, 0.2), 0 0 50px rgba(255, 20, 147, 0.1)',
        border: '2px solid var(--tetris-cyan, #00f5ff)',
        minWidth: '280px',
        maxWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'translateY(-4px) scale(1.02)';
        target.style.boxShadow = '0 12px 40px rgba(0, 245, 255, 0.3), 0 0 80px rgba(255, 20, 147, 0.2)';
        target.style.borderColor = 'var(--neon-pink, #ff1493)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'translateY(0) scale(1)';
        target.style.boxShadow = '0 8px 32px rgba(0, 245, 255, 0.2), 0 0 50px rgba(255, 20, 147, 0.1)';
        target.style.borderColor = 'var(--tetris-cyan, #00f5ff)';
      }}
      >
        <div style={{
          textAlign: 'center',
          borderBottom: '2px solid var(--tetris-purple, #bf00ff)',
          paddingBottom: '1rem',
          position: 'relative',
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: 'var(--casino-gold, #ffd700)',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
          }}>
                {playerName}
          </h3>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '1rem 0',
          position: 'relative',
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--tetris-cyan, #00f5ff)',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: '500',
            textShadow: '0 0 5px rgba(0, 245, 255, 0.5)',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
          }}>
            💰 Total Score 💰
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--neon-green, #39ff14)',
            lineHeight: 1,
            textShadow: '0 0 20px rgba(57, 255, 20, 0.6), 0 0 40px rgba(57, 255, 20, 0.3)',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
          }}>
            {totalScore.toLocaleString()}
          </div>
        </div>

        <button
          onClick={handleAddScore}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            background: 'linear-gradient(45deg, var(--tetris-orange, #ff9500), var(--tetris-yellow, #ffff00))',
            color: '#000000',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            width: '100%',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
            textShadow: '0 0 5px rgba(255, 149, 0, 0.7)',
            boxShadow: '0 4px 15px rgba(255, 149, 0, 0.3), 0 0 25px rgba(255, 255, 0, 0.2)',
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.background = 'linear-gradient(45deg, var(--tetris-red, #ff3030), var(--neon-pink, #ff1493))';
            target.style.color = '#ffffff';
            target.style.transform = 'scale(1.05)';
            target.style.boxShadow = '0 6px 20px rgba(255, 48, 48, 0.4), 0 0 35px rgba(255, 20, 147, 0.3)';
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.background = 'linear-gradient(45deg, var(--tetris-orange, #ff9500), var(--tetris-yellow, #ffff00))';
            target.style.color = '#000000';
            target.style.transform = 'scale(1)';
            target.style.boxShadow = '0 4px 15px rgba(255, 149, 0, 0.3), 0 0 25px rgba(255, 255, 0, 0.2)';
          }}
        >
          🎯 Add Score 🎯
        </button>
      </div>

      <ScoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleScoreSubmit}
      />
    </>
  );
};

export default PlayerScoreCard;
