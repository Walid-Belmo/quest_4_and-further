/**
 * Level Configurations
 * Each level contains multiple exercises for repetition and mastery
 */

const LEVELS = {
    niveau1: {
        levelNumber: 1,
        title: "Déclaration de Variables (int)",
        subtitle: "Apprends à déclarer des variables avec leur type",
        popup: {
            show: true,
            title: "🎓 Nouvelle Règle !",
            content: `
                <p>Maintenant, tu dois déclarer le <strong>TYPE</strong> de tes variables :</p>
                <ul style="margin-left: 20px; margin-top: 10px;">
                    <li><code>int</code> pour les nombres entiers (0, 1, 5, 100)</li>
                    <li><code>float</code> pour les nombres décimaux (1.5, 3.14)</li>
                    <li><code>String</code> pour le texte ("hello", "bonjour")</li>
                </ul>
                <p style="margin-top: 15px;"><strong>Exemple :</strong> <code>int compteur = 0;</code></p>
            `
        },
        exercises: [
            {
                // Exercise 1/3 - Easiest
                number: 1,
                exampleCode: `void setup()
{
    pin1;
    int compteur = 0;
    pin1_allumé;
}

void loop()
{
    // Rien ici
}`,
                challenge: {
                    title: "À Toi de Jouer",
                    instructions: [
                        "Déclare <strong>pin1</strong>",
                        "Crée une variable <strong>int vitesse = 5;</strong>",
                        "Allume <strong>pin1</strong>"
                    ]
                },
                expectedState: {
                    pins: {
                        pin1: { declared: true, on: true }
                    },
                    variables: {
                        vitesse: { value: '5', type: 'int' }
                    }
                }
            },
            {
                // Exercise 2/3 - Medium
                number: 2,
                exampleCode: `void setup()
{
    pin9;
    int temperature = 20;
    pin9_allumé;
}

void loop()
{
    // Rien ici
}`,
                challenge: {
                    title: "À Toi de Jouer",
                    instructions: [
                        "Déclare <strong>pin9</strong>",
                        "Crée une variable <strong>int puissance = 10;</strong>",
                        "Allume <strong>pin9</strong>"
                    ]
                },
                expectedState: {
                    pins: {
                        pin9: { declared: true, on: true }
                    },
                    variables: {
                        puissance: { value: '10', type: 'int' }
                    }
                }
            },
            {
                // Exercise 3/3 - Harder
                number: 3,
                exampleCode: `void setup()
{
    pin1;
    pin9;
    int mode = 1;
    pin1_allumé;
    pin9_allumé;
}

void loop()
{
    // Rien ici
}`,
                challenge: {
                    title: "À Toi de Jouer",
                    instructions: [
                        "Déclare <strong>pin1</strong> et <strong>pin9</strong>",
                        "Crée une variable <strong>int niveau = 3;</strong>",
                        "Allume <strong>pin1</strong> ET <strong>pin9</strong>"
                    ]
                },
                expectedState: {
                    pins: {
                        pin1: { declared: true, on: true },
                        pin9: { declared: true, on: true }
                    },
                    variables: {
                        niveau: { value: '3', type: 'int' }
                    }
                }
            }
        ]
    },
    
    niveau2: {
        levelNumber: 2,
        title: "Variables Multiples",
        subtitle: "Apprends à travailler avec plusieurs variables en même temps",
        popup: {
            show: false,
            title: "",
            content: ``
        },
        exercises: [
            {
                // Exercise 1/3 - Two variables, two pins
                number: 1,
                exampleCode: `void setup()
{
    pin1;
    pin9;
    int vitesse = 5;
    int puissance = 10;
    pin1_allumé;
    pin9_allumé;
}

void loop()
{
    // Rien ici
}`,
                challenge: {
                    title: "À Toi de Jouer",
                    instructions: [
                        "Déclare <strong>pin1</strong> et <strong>pin2</strong>",
                        "Crée <strong>int temperature = 20;</strong>",
                        "Crée <strong>int humidite = 60;</strong>",
                        "Allume <strong>pin1</strong> et <strong>pin2</strong>"
                    ]
                },
                expectedState: {
                    pins: {
                        pin1: { declared: true, on: true },
                        pin2: { declared: true, on: true }
                    },
                    variables: {
                        temperature: { value: '20', type: 'int' },
                        humidite: { value: '60', type: 'int' }
                    }
                }
            },
            {
                // Exercise 2/3 - Different pins/values
                number: 2,
                exampleCode: `void setup()
{
    pin9;
    pin10;
    int mode = 1;
    int niveau = 3;
    pin9_allumé;
    pin10_allumé;
}

void loop()
{
    // Rien ici
}`,
                challenge: {
                    title: "À Toi de Jouer",
                    instructions: [
                        "Déclare <strong>pin9</strong> et <strong>pin10</strong>",
                        "Crée <strong>int capteur1 = 15;</strong>",
                        "Crée <strong>int capteur2 = 25;</strong>",
                        "Allume <strong>pin9</strong> et <strong>pin10</strong>"
                    ]
                },
                expectedState: {
                    pins: {
                        pin9: { declared: true, on: true },
                        pin10: { declared: true, on: true }
                    },
                    variables: {
                        capteur1: { value: '15', type: 'int' },
                        capteur2: { value: '25', type: 'int' }
                    }
                }
            },
            {
                // Exercise 3/3 - Three variables, selective pin activation
                number: 3,
                exampleCode: `void setup()
{
    pin1;
    pin2;
    pin9;
    int x = 1;
    int y = 2;
    int z = 3;
    pin1_allumé;
    pin9_allumé;
}

void loop()
{
    // Rien ici
}`,
                challenge: {
                    title: "À Toi de Jouer",
                    instructions: [
                        "Déclare <strong>pin1</strong>, <strong>pin2</strong>, et <strong>pin10</strong>",
                        "Crée <strong>int rouge = 100;</strong>",
                        "Crée <strong>int vert = 200;</strong>",
                        "Crée <strong>int bleu = 50;</strong>",
                        "Allume seulement <strong>pin2</strong> et <strong>pin10</strong>"
                    ]
                },
                expectedState: {
                    pins: {
                        pin1: { declared: true, on: false },
                        pin2: { declared: true, on: true },
                        pin10: { declared: true, on: true }
                    },
                    variables: {
                        rouge: { value: '100', type: 'int' },
                        vert: { value: '200', type: 'int' },
                        bleu: { value: '50', type: 'int' }
                    }
                }
            }
        ]
    },
    
    niveau3: {
        levelNumber: 3,
        title: "Conditions Simples (si...alors)",
        subtitle: "Apprends à faire des choix dans ton code",
        popup: {
            show: true,
            title: "🎓 Nouvelle Règle : Les Conditions !",
            content: `
                <p>Maintenant tu peux faire des <strong>choix</strong> dans ton code !</p>
                <ul style="margin-left: 20px; margin-top: 10px;">
                    <li><code>si (condition) alors { action; }</code></li>
                    <li>Si la condition est vraie, l'action est exécutée</li>
                    <li>Si la condition est fausse, rien ne se passe</li>
                </ul>
                <p style="margin-top: 15px;"><strong>Exemple :</strong></p>
                <pre style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; margin-top: 10px;"><code>int temperature = 25;
si (temperature == 25) alors {
    pin1_allumé;
}</code></pre>
            `
        },
        exercises: [
            {
                // Exercise 1/3 - Simple condition (true)
                number: 1,
                exampleCode: `void setup()
{
    pin1;
    int capteur = 0;
    
    si (capteur == 0) alors {
        pin1_allumé;
    }
}

void loop()
{
    // Rien ici
}`,
                challenge: {
                    title: "À Toi de Jouer",
                    instructions: [
                        "Déclare <strong>pin9</strong>",
                        "Crée <strong>int temperature = 20;</strong>",
                        "Si temperature == 20, allume <strong>pin9</strong>"
                    ]
                },
                expectedState: {
                    pins: {
                        pin9: { declared: true, on: true }
                    },
                    variables: {
                        temperature: { value: '20', type: 'int' }
                    }
                }
            },
            {
                // Exercise 2/3 - Condition is false
                number: 2,
                exampleCode: `void setup()
{
    pin1;
    int mode = 5;
    
    si (mode == 1) alors {
        pin1_allumé;
    }
}

void loop()
{
    // Rien ici
}`,
                challenge: {
                    title: "À Toi de Jouer",
                    instructions: [
                        "Déclare <strong>pin2</strong>",
                        "Crée <strong>int niveau = 10;</strong>",
                        "Si niveau == 5, allume <strong>pin2</strong>"
                    ]
                },
                expectedState: {
                    pins: {
                        pin2: { declared: true, on: false }
                    },
                    variables: {
                        niveau: { value: '10', type: 'int' }
                    }
                }
            },
            {
                // Exercise 3/3 - Multiple pins, one conditional
                number: 3,
                exampleCode: `void setup()
{
    pin1;
    pin9;
    int etat = 1;
    
    pin1_allumé;
    
    si (etat == 1) alors {
        pin9_allumé;
    }
}

void loop()
{
    // Rien ici
}`,
                challenge: {
                    title: "À Toi de Jouer",
                    instructions: [
                        "Déclare <strong>pin1</strong> et <strong>pin10</strong>",
                        "Crée <strong>int systeme = 1;</strong>",
                        "Allume <strong>pin1</strong> (toujours)",
                        "Si systeme == 1, allume aussi <strong>pin10</strong>"
                    ]
                },
                expectedState: {
                    pins: {
                        pin1: { declared: true, on: true },
                        pin10: { declared: true, on: true }
                    },
                    variables: {
                        systeme: { value: '1', type: 'int' }
                    }
                }
            }
        ]
    }
};

// Current level and exercise tracking
let currentLevel = 'niveau1';
let currentExercise = 0; // 0-indexed

/**
 * Get current exercise configuration
 */
function getCurrentExercise() {
    const level = LEVELS[currentLevel];
    return level.exercises[currentExercise];
}

/**
 * Get current level configuration
 */
function getCurrentLevel() {
    return LEVELS[currentLevel];
}

/**
 * Move to next exercise or level
 */
function advanceExercise() {
    const level = LEVELS[currentLevel];
    
    if (currentExercise < level.exercises.length - 1) {
        // Next exercise in same level
        currentExercise++;
        loadCurrentExercise();
        return { type: 'exercise', level: currentLevel, exercise: currentExercise };
    } else {
        // Level complete, move to next level
        const nextLevelNum = level.levelNumber + 1;
        const nextLevelKey = `niveau${nextLevelNum}`;
        
        if (LEVELS[nextLevelKey]) {
            currentLevel = nextLevelKey;
            currentExercise = 0;
            loadCurrentExercise();
            return { type: 'level', level: currentLevel, exercise: 0 };
        } else {
            return { type: 'complete' }; // All levels done
        }
    }
}

/**
 * Get progress info for current level
 */
function getProgress() {
    const level = LEVELS[currentLevel];
    return {
        current: currentExercise + 1,
        total: level.exercises.length,
        percentage: ((currentExercise + 1) / level.exercises.length) * 100
    };
}

/**
 * Load current exercise into the UI
 */
function loadCurrentExercise() {
    const level = getCurrentLevel();
    const exercise = getCurrentExercise();
    
    // Update header
    document.querySelector('.header h1').textContent = `Quest 4 - ${level.title}`;
    document.querySelector('.level-info').textContent = `${level.subtitle} - Exercice ${exercise.number}/${level.exercises.length}`;
    
    // Update progress bar
    updateProgressBar();
    
    // Update example code
    const exampleCodeContainer = document.getElementById('exampleCode');
    exampleCodeContainer.innerHTML = formatCodeForDisplay(exercise.exampleCode);
    
    // Update challenge instructions
    const challengeBox = document.querySelector('.challenge-box');
    challengeBox.querySelector('h4').textContent = exercise.challenge.title;
    
    const instructionsHTML = exercise.challenge.instructions
        .map(instruction => `<p>• ${instruction}</p>`)
        .join('');
    
    // Remove old instructions and add new ones
    const existingInstructions = challengeBox.querySelectorAll('p');
    existingInstructions.forEach(p => p.remove());
    challengeBox.insertAdjacentHTML('beforeend', instructionsHTML);
    
    // Reset student side
    resetStudent();
    
    // Clear the code editor for new exercise
    const codeEditor = document.getElementById('codeEditor');
    if (codeEditor) {
        codeEditor.value = '';
    }
    
    // Show popup if this is first exercise of a level with popup
    if (exercise.number === 1 && level.popup.show) {
        showLevelPopup(level.popup);
    }
}

/**
 * Format code for display with syntax highlighting
 */
function formatCodeForDisplay(code) {
    const lines = code.split('\n');
    let html = '';
    
    lines.forEach((line) => {
        // Escape HTML characters
        let displayLine = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        // Highlight keywords (void setup, void loop, int, float, String, si, alors, sinon)
        displayLine = displayLine.replace(/\b(void setup|void loop|int|float|String|si|alors|sinon)\b/g, '<span class="keyword">$1</span>');
        // Highlight comments
        displayLine = displayLine.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
        
        html += `<div class="code-line">${displayLine || '&nbsp;'}</div>`;
    });
    
    return html;
}

/**
 * Update progress bar
 */
function updateProgressBar() {
    const progress = getProgress();
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = `${progress.percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `Exercice ${progress.current}/${progress.total}`;
    }
}

/**
 * Show level popup with new rule
 */
function showLevelPopup(popupConfig) {
    const popup = document.getElementById('rulePopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupContent = document.getElementById('popupContent');
    
    popupTitle.textContent = popupConfig.title;
    popupContent.innerHTML = popupConfig.content;
    
    popup.classList.add('visible');
}

/**
 * Close popup
 */
function closePopup() {
    const popup = document.getElementById('rulePopup');
    popup.classList.remove('visible');
}

