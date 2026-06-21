import React, { useState } from 'react';
import GameArena from './components/GameArena';
import './styles/main.scss';
import ninjaImg from './assets/flexbox-ninja.png';
import golemImg from './assets/grid-golem.png';
import alchemistImg from './assets/variable-alchemist.png';
import illusionistImg from './assets/nesting-illusionist.png';

const CHARACTERS = [
    { id: 'ninja', name: 'Flexbox Ninja', img: ninjaImg, abilityName: 'Zamanı Dondur (5sn)' },
    { id: 'golem', name: 'Grid Golem', img: golemImg, abilityName: 'Zamanı Dondur (5sn)' },
    { id: 'alchemist', name: 'Variables Alchemist', img: alchemistImg, abilityName: 'Zamanı Dondur (5sn)' },
    { id: 'illusionist', name: 'Nesting Illusionist', img: illusionistImg, abilityName: 'Zamanı Dondur (5sn)' }
];

function App() {
    const [gameState, setGameState] = useState('select');
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);

    const selectCharacter = (char) => {
        if (!player1) {
            setPlayer1(char);
        } else if (!player2 && char.id !== player1.id) {
            setPlayer2(char);
            setTimeout(() => setGameState('playing'), 1000);
        }
    };

    if (gameState === 'select') {
        return (
            <div className="char-select-screen">
                <h1 className="select-title">
                    {!player1 ? "1. OYUNCU KARAKTERİNİ SEÇ" : "2. OYUNCU KARAKTERİNİ SEÇ"}
                </h1>

                <div className="char-grid">
                    {CHARACTERS.map((char) => {
                        const isSelected = player1?.id === char.id || player2?.id === char.id;
                        return (
                            <div
                                key={char.id}
                                className={`char-card ${isSelected ? 'disabled' : ''}`}
                                onClick={() => selectCharacter(char)}
                            >
                                <img src={char.img} alt={char.name} />
                                <h3>{char.name}</h3>
                                <p style={{ fontSize: '0.8rem', color: '#aaa' }}>{char.abilityName}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="selected-preview">
                    {player1 && <div className="preview-box">P1: {player1.name}</div>}
                    {player2 && <div className="preview-box">P2: {player2.name}</div>}
                </div>
            </div>
        );
    }

    return <GameArena player1={player1} player2={player2} />;
}

export default App;