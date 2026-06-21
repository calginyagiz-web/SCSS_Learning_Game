import React, { useState, useEffect } from 'react';
import scssQuestions from '../data/mancanikDB.questions.json';
import '../styles/main.scss';
import platformTrack from '../assets/platform-track.png';
import hammerItem from '../assets/compiler-hammer.png';

function GameArena({ player1, player2 }) {
    const [questions, setQuestions] = useState(scssQuestions || []);
    const [loading, setLoading] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [hammerX, setHammerX] = useState(0);
    const [turn, setTurn] = useState('p1');
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    const [readingTime, setReadingTime] = useState(5);
    const [isReading, setIsReading] = useState(true);
    const [timeFrozen, setTimeFrozen] = useState(false);

    const [p1AbilityUsed, setP1AbilityUsed] = useState(false);
    const [p2AbilityUsed, setP2AbilityUsed] = useState(false);

    useEffect(() => {
        if (gameOver || loading || questions.length === 0 || timeFrozen) return;

        let interval;

        if (isReading) {
            interval = setInterval(() => {
                setReadingTime(prev => {
                    if (prev <= 1) {
                        setIsReading(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            interval = setInterval(() => {
                setHammerX(prev => {
                    const shift = turn === 'p1' ? -0.5 : 0.5;
                    const nextVal = prev + shift;

                    if (nextVal <= -15) {
                        setGameOver(true);
                        setWinner('2. Oyuncu');
                        return -15;
                    } else if (nextVal >= 15) {
                        setGameOver(true);
                        setWinner('1. Oyuncu');
                        return 15;
                    }
                    return nextVal;
                });
            }, 500);
        }

        return () => clearInterval(interval);
    }, [isReading, turn, gameOver, loading, timeFrozen, questions]);

    const handleAnswer = (selectedOption) => {
        if (gameOver || timeFrozen) return;

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.answer;

        if (isCorrect) {
            setHammerX(prev => turn === 'p1' ? prev + 5 : prev - 5);
            setTurn(turn === 'p1' ? 'p2' : 'p1');

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setIsReading(true);
                setReadingTime(5);
            } else {
                setGameOver(true);
                setHammerX(current => {
                    if (current < 0) setWinner('2. Oyuncu');
                    else if (current > 0) setWinner('1. Oyuncu');
                    else setWinner('Berabere!');
                    return current;
                });
            }
        } else {
            setHammerX(prev => {
                const nextVal = turn === 'p1' ? prev - 3 : prev + 3;
                if (nextVal <= -15) {
                    setGameOver(true);
                    setWinner('2. Oyuncu');
                    return -15;
                } else if (nextVal >= 15) {
                    setGameOver(true);
                    setWinner('1. Oyuncu');
                    return 15;
                }
                return nextVal;
            });
        }
    };

    const useAbility = (player) => {
        if (gameOver || timeFrozen) return;

        if (player === 'p1' && turn === 'p1' && !p1AbilityUsed) {
            setP1AbilityUsed(true);
            activateTimeFreeze();
        } else if (player === 'p2' && turn === 'p2' && !p2AbilityUsed) {
            setP2AbilityUsed(true);
            activateTimeFreeze();
        }
    };

    const activateTimeFreeze = () => {
        setTimeFrozen(true);
        setTimeout(() => {
            setTimeFrozen(false);
        }, 5000);
    };

    const restartGame = () => {
        setCurrentQuestionIndex(0);
        setHammerX(0);
        setTurn('p1');
        setGameOver(false);
        setWinner(null);
        setIsReading(true);
        setReadingTime(5);
        setTimeFrozen(false);
        setP1AbilityUsed(false);
        setP2AbilityUsed(false);
    };

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Arena Kuruluyor...</div>;
    if (questions.length === 0) return <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Veritabanında soru yok. Lütfen soru ekleyin.</div>;

    const currentQuestion = questions[currentQuestionIndex];
    const hammerRotation = gameOver ? (hammerX > 0 ? 'rotate(45deg)' : 'rotate(-45deg)') : 'rotate(0deg)';

    return (
        <div className="game-arena">
            {timeFrozen && <div className="freeze-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,150,255,0.2)', zIndex: 1, pointerEvents: 'none' }}></div>}

            <div className="turn-indicator">
                <div className={`player-badge p1 ${turn === 'p1' ? 'active' : ''}`}>
                    <button
                        onClick={() => useAbility('p1')}
                        disabled={p1AbilityUsed || turn !== 'p1'}
                        style={{ padding: '5px', cursor: p1AbilityUsed ? 'not-allowed' : 'pointer' }}
                    >
                        {p1AbilityUsed ? 'Kullanıldı' : player1.abilityName}
                    </button>
                </div>

                <div className="timer-display" style={{ fontSize: '2rem', color: timeFrozen ? '#00d2ff' : 'white', fontWeight: 'bold', zIndex: 6 }}>
                    {timeFrozen ? "ZAMAN DURDU!" : (isReading ? `Okuma Süresi: ${readingTime}` : "ÇEKİÇ KAYIYOR!")}
                </div>

                <div className={`player-badge p2 ${turn === 'p2' ? 'active' : ''}`}>
                    <button
                        onClick={() => useAbility('p2')}
                        disabled={p2AbilityUsed || turn !== 'p2'}
                        style={{ padding: '5px', cursor: p2AbilityUsed ? 'not-allowed' : 'pointer' }}
                    >
                        {p2AbilityUsed ? 'Kullanıldı' : player2.abilityName}
                    </button>
                </div>
            </div>

            <div className="arena-interaction-zone" style={{ bottom: '-22%' }}>
                <img src={platformTrack} className="platform-track" alt="Platform" />

                <img
                    src={hammerItem}
                    className="compiler-hammer"
                    alt="Çekiç"
                    style={{
                        transform: `translateX(calc(-50% + ${hammerX}vw)) ${hammerRotation}`,
                        transformOrigin: 'bottom center',
                        transition: 'transform 0.4s ease-out'
                    }}
                />
                <img
                    src={player1.img}
                    className="character left-fighter"
                    alt="Player 1"
                    style={{ width: '570px', left: '-25%' }}
                />
                <img
                    src={player2.img}
                    className="character right-fighter"
                    alt="Player 2"
                    style={{ width: '570px', right: '-25%' }}
                />
            </div>

            {!gameOver ? (
                <div className="question-overlay">
                    <div className="question-box">
                        <p className="question-text">{currentQuestion.question}</p>
                    </div>
                    <div className="options-grid">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                className="option-button"
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="game-over-screen">
                    <div className="game-over-box">
                        <h2>OYUN BİTTİ</h2>
                        <p>Kazanan: <strong>{winner}</strong></p>
                        <button className="restart-button" onClick={restartGame}>YENİDEN BAŞLA</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GameArena;