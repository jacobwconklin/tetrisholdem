"use client";

import { useState } from "react";
import styles from "../page.module.css";
import PlayerScoreCard from "./player-score-card";

interface Player {
    name: string;
    totalScore: number;
}

interface AddPlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (playerName: string) => void;
}

const AddPlayerModal = ({ isOpen, onClose, onSubmit }: AddPlayerModalProps) => {
    const [playerName, setPlayerName] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (playerName.trim()) {
            onSubmit(playerName.trim());
            setPlayerName("");
            onClose();
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            onClick={handleBackdropClick}
            style={{
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
            }}
        >
            <div style={{
                backgroundColor: 'var(--background-solid, white)',
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
                    Add New Player
                </h3>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            fontSize: '1rem',
                        }}>
                            Player Name:
                        </label>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Enter player name"
                            autoFocus
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
                            disabled={!playerName.trim()}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '6px',
                                backgroundColor: playerName.trim() ? 'var(--foreground, black)' : '#ccc',
                                color: '#060960ff',
                                cursor: playerName.trim() ? 'pointer' : 'not-allowed',
                                fontSize: '1rem',
                                fontWeight: '500',
                                opacity: playerName.trim() ? 1 : 0.6,
                            }}
                        >
                            Add Player
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function ScoreCalculatorPage() {

  const [players, setPlayers] = useState<Player[]>([]);
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const handleAddPlayer = (playerName: string) => {
    const newPlayer = {
      name: playerName,
      totalScore: 0,
    };
    setPlayers([...players, newPlayer]);
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
          ♠️ Tetris Hold&apos;em Scorer ♣️
        </h1>
        
        <p style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          fontSize: '1.1rem',
          color: 'var(--foreground)'
        }}>
          Enter your game results below as you go or at the end of the game to calculate your final score
        </p>

        <div className="PlayerScoreCardHolder" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
        {
            players.map((player, index) => (
                <PlayerScoreCard
                    key={index}
                    playerName={player.name}
                    totalScore={player.totalScore}
                    onScoreUpdate={(scoreType, cardCount) => {
                        // Update player score based on scoreType and cardCount
                        setPlayers(players.map((p, i) => {
                            if (i === index) {
                                let newScore = 0
                                if (scoreType == "Flush") {
                                    newScore = (cardCount - 4) * 10
                                } else {
                                    newScore = (cardCount - 3) * 15
                                }
                                return { ...p, totalScore: p.totalScore + newScore };
                            }
                            return p;
                        }));
                    }}
                />
            ))
        }
        </div>
        
        <button
            onClick={() => setIsAddPlayerModalOpen(true)}
            style={{
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '12px',
                backgroundColor: 'var(--background-solid, black)',
                color: 'var(--background, white)',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                minWidth: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                margin: '2rem auto 0',
            }}
            onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = 'var(--button-primary-hover, #383838)';
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = 'var(--background-solid, black)';
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
        >
            <span style={{ fontSize: '1.2rem' }}>👤</span>
            Add Player    
        </button>

        <AddPlayerModal
            isOpen={isAddPlayerModalOpen}
            onClose={() => setIsAddPlayerModalOpen(false)}
            onSubmit={handleAddPlayer}
        /> 

      </main>
      
      <footer className={styles.footer}>
        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--foreground)' }}>
          🎲 Tetris Hold&apos;em Score Calculator
        </div>
      </footer>
    </div>
  );
}
