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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'var(--background, white)',
        color: 'var(--foreground, black)',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        minWidth: '320px',
        maxWidth: '400px',
        width: '90%',
      }}>
        <h3 style={{
          margin: '0 0 1.5rem 0',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          Add Score
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              fontSize: '1rem',
            }}>
              Score Type:
            </label>
            <select
              value={scoreType}
              onChange={(e) => setScoreType(e.target.value as 'Flush' | 'Straight' | 'Full House')}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-alpha-200, #ccc)',
                borderRadius: '6px',
                fontSize: '1rem',
                backgroundColor: 'var(--background, white)',
                color: 'var(--foreground, black)',
              }}
            >
              <option value="Flush">Flush</option>
              <option value="Straight">Straight</option>
              <option value="Full House">Full House</option>
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              fontSize: '1rem',
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
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-alpha-200, #ccc)',
                borderRadius: '6px',
                fontSize: '1rem',
                backgroundColor: 'var(--background, white)',
                color: 'var(--foreground, black)',
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid var(--gray-alpha-200, #ccc)',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                color: 'var(--foreground, black)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
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
                backgroundColor: 'var(--foreground, black)',
                color: 'var(--background, white)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
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
        backgroundColor: 'var(--background, white)',
        color: 'var(--foreground, black)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid var(--gray-alpha-200, #e5e5e5)',
        minWidth: '280px',
        maxWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'translateY(-2px)';
        target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'translateY(0)';
        target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      >
        <div style={{
          textAlign: 'center',
          borderBottom: '1px solid var(--gray-alpha-200, #e5e5e5)',
          paddingBottom: '1rem',
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: 'var(--foreground, black)',
          }}>
            {playerName}
          </h3>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '1rem 0',
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--gray-rgb, #666)',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: '500',
          }}>
            Total Score
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--foreground, black)',
            lineHeight: 1,
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
            backgroundColor: 'var(--foreground, black)',
            color: 'var(--background, white)',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'background-color 0.2s ease',
            width: '100%',
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.backgroundColor = 'var(--button-primary-hover, #383838)';
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.backgroundColor = 'var(--foreground, black)';
          }}
        >
          + Add Score
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
