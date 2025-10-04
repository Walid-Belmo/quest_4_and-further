# 🎮 MASTER GUIDE - Microcontroller Learning Game
## Complete Reference for Building & Debugging Levels

---

## 📚 TABLE OF CONTENTS

1. [System Architecture](#system-architecture)
2. [Pedagogical Philosophy](#pedagogical-philosophy)
3. [Difficulty Progression Theory](#difficulty-progression-theory)
4. [Level Structure Specification](#level-structure-specification)
5. [Complete Code Examples](#complete-code-examples)
6. [Building New Levels](#building-new-levels)
7. [Debugging Guide](#debugging-guide)
8. [Level Progression Map](#level-progression-map)

---

## 1. SYSTEM ARCHITECTURE

### 1.1 File Structure
```
testing_cursor/
├── niveau{X}.html          # Each level has its own HTML file
├── css/
│   └── styles.css          # Shared styles for all levels
├── js/
│   ├── level-configs.js    # ALL level/exercise configurations
│   ├── ui-manager.js       # UI updates, LED control, variables display
│   ├── code-executor.js    # Code execution with highlighting
│   ├── validator.js        # Code validation & progression logic
│   ├── main.js             # Event handlers & initialization
│   └── config.js           # (Legacy - not used in new system)
```

### 1.2 Module Responsibilities

#### **level-configs.js** - The Brain
Contains ALL level data:
- Level metadata (title, subtitle)
- Exercise configurations (3 per level)
- Example code for each exercise
- Challenge instructions
- Expected validation outcomes
- Popup content for new concepts

#### **ui-manager.js** - The Interface
Handles all visual updates:
- LED on/off control
- Variable display updates
- Button state management
- Feedback messages
- Progress bar updates
- Popup display

#### **code-executor.js** - The Engine
Executes code with visual feedback:
- Line-by-line highlighting
- Variable parsing (typed & untyped)
- Pin declarations & actions
- Example code execution
- Student code execution
- Error handling & display

#### **validator.js** - The Judge
Validates student code:
- Silent code execution (no visuals)
- State comparison (pins, variables)
- Type checking (int, float, String)
- Error message generation
- Success detection
- Auto-advance logic

#### **main.js** - The Controller
Entry point & event routing:
- DOM initialization
- Global function bindings
- Keyboard shortcuts
- Event handlers

---

## 2. PEDAGOGICAL PHILOSOPHY

### 2.1 The Stanford Flow State Framework

Based on Stanford's game design course on creating addictive games:

**Core Principle**: Balance challenge and skill to maintain flow state

```
Anxiety Zone (Too Hard)
        ↑
    [FLOW CHANNEL] ← Keep players here
        ↓
Boredom Zone (Too Easy)
```

### 2.2 Difficulty Progression Pattern

```
Level 1: ⭐ (Easy)
Level 2: ⭐⭐ (Medium)
Level 3: ⭐⭐⭐ (Hard)
Level 4: ⭐⭐⭐⭐ (Very Hard)
Level 5: ⭐⭐⭐⭐⭐ (PEAK - Nested Logic)
Level 6: ⭐⭐ (DROP - New Concept: PWM)
Level 7: ⭐⭐⭐ (Ramp up PWM)
... continue pattern
```

**Key Insights:**
1. **Gradual increase** prevents frustration
2. **Peak difficulty** creates achievement satisfaction
3. **Difficulty DROP** after peak refreshes engagement
4. **New context** makes easier challenges feel novel, not boring

### 2.3 Three-Exercise Pattern (Repetition for Mastery)

Each level has **exactly 3 exercises**:

```
Exercise 1/3: EASY
- Introduce concept with minimal complexity
- Student gains confidence
- "I can do this!"

Exercise 2/3: MEDIUM
- Same concept, different context
- Adds one layer of complexity
- Reinforces learning through variation

Exercise 3/3: HARDER
- Same concept, maximum complexity for this level
- Combines multiple elements
- Tests true understanding
- Prepares for next level
```

**Why 3?**
- 1 = Not enough repetition (concept doesn't stick)
- 2 = Improvement felt but not solidified
- 3 = Pattern recognition achieved, mastery begins
- 4+ = Diminishing returns, boredom sets in

### 2.4 Micro-Progression Within Levels

Each exercise gradually increases:
- **Variables**: 1 → 1 → 2
- **Pins**: 1 → 1 → 2
- **Actions**: 1 → 1 → 2
- **Complexity**: Simple → Different → Combined

Example:
```
Exercise 1: int var = 5; + pin1
Exercise 2: int var = 10; + pin9  (different pin/value)
Exercise 3: int var = 3; + pin1 + pin9  (multiple elements)
```

---

## 3. DIFFICULTY PROGRESSION THEORY

### 3.1 Cognitive Load Management

**Working Memory Limits:**
- Humans can hold ~7 items in working memory
- Beginners: ~3-4 items before overload
- Code concepts count as items

**Progression Strategy:**
```
Level 1: 2 concepts (pin + typed variable)
Level 2: 3 concepts (multiple variables)
Level 3: 4 concepts (variables + simple if)
Level 4: 5 concepts (if-else)
... gradually increase
Peak: 7-8 concepts (nested logic + multiple variables)
Reset: 3 concepts (PWM - new but simpler)
```

### 3.2 The "Drop After Peak" Psychology

**Why Drop Difficulty After Peak?**

1. **Relief Response**: Completing hard challenge → dopamine
2. **Confidence Boost**: "I can handle easy stuff now!"
3. **New Context Novelty**: PWM feels fresh, not repetitive
4. **Sustained Engagement**: Prevents burnout
5. **Learning Consolidation**: Easier tasks allow previous learning to solidify

**Stanford Research Shows:**
- Players quit when difficulty stays at peak too long
- Difficulty variance creates engagement rhythm
- New mechanics should be introduced at lower difficulty

### 3.3 Difficulty Curve Graph

```
Difficulty
   ↑
⭐⭐⭐⭐⭐  |           ╱╲
⭐⭐⭐⭐    |         ╱    ╲
⭐⭐⭐      |       ╱        ╲╱╲
⭐⭐        |     ╱              ╲
⭐          |___╱                  ╲___
           Level 1→2→3→4→5→6(PWM)→7→8
```

---

## 4. LEVEL STRUCTURE SPECIFICATION

### 4.1 Level Configuration Template

Every level in `js/level-configs.js` follows this exact structure:

```javascript
niveauX: {
    levelNumber: X,                    // Integer
    title: "Concept Name",             // Short French title
    subtitle: "Learning Goal",         // What they'll master
    popup: {
        show: true/false,              // Show popup on first exercise?
        title: "🎓 Nouvelle Règle !",  // Popup title
        content: `
            <p>Explanation...</p>
            <ul>
                <li><code>syntax</code> explanation</li>
            </ul>
            <p><strong>Exemple:</strong> <code>code example</code></p>
        `
    },
    exercises: [
        {
            number: 1,                 // 1, 2, or 3
            exampleCode: `             // Complete working code
void setup()
{
    // Code here
}

void loop()
{
    // Code here
}`,
            challenge: {
                title: "À Toi de Jouer",
                instructions: [
                    "Instruction 1 with <strong>highlighting</strong>",
                    "Instruction 2...",
                    "Instruction 3..."
                ]
            },
            expectedState: {           // Validation rules
                pins: {
                    pin1: { declared: true/false, on: true/false },
                    pin2: { declared: true/false, on: true/false },
                    pin9: { declared: true/false, on: true/false },
                    pin10: { declared: true/false, on: true/false }
                },
                variables: {
                    varName: { value: '5', type: 'int' }
                }
            }
        },
        // Exercise 2 & 3 follow same structure
    ]
}
```

### 4.2 Validation Rules

**Pin Validation:**
```javascript
pins: {
    pin1: { declared: true, on: false }  // Pin must be declared but OFF
    pin9: { declared: true, on: true }   // Pin must be declared AND ON
    // Omit pins that should NOT be declared
}
```

**Variable Validation:**
```javascript
variables: {
    compteur: { value: '5', type: 'int' }     // Must be int with value 5
    vitesse: { value: '10', type: 'int' }     // Must be int with value 10
    // Omit variables that should NOT exist
}
```

**Type Options:**
- `'int'` - Integer numbers
- `'float'` - Decimal numbers
- `'string'` - Text (lowercase in regex!)
- `'untyped'` - Old style without type declaration

---

## 5. COMPLETE CODE EXAMPLES

### 5.1 Level 1 - Variable Type Declaration (Current Implementation)

**Concept**: Teach `int variable = value;` syntax

**Exercise 1/3:**
```javascript
{
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
}
```

**Student Solution:**
```cpp
void setup()
{
    pin1;
    int vitesse = 5;
    pin1_allumé;
}

void loop()
{
    // Rien ici
}
```

---

### 5.2 Level 2 - Multiple Variables (To Build)

**Concept**: Work with 2-3 variables simultaneously

**Difficulty**: ⭐⭐ (Medium)

**Exercise 1/3:**
```javascript
{
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
}
```

**Exercise 2/3:** (Same concept, different values/pins)
```javascript
{
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
}
```

**Exercise 3/3:** (Harder - three variables, selective pin activation)
```javascript
{
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
            pin1: { declared: true, on: false },   // Declared but NOT on
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
```

---

### 5.3 Level 3 - Simple IF Statement (To Build)

**Concept**: Conditional logic with `si (condition) alors { action }`

**Difficulty**: ⭐⭐⭐ (Hard - New concept!)

**Popup Required**: YES
```javascript
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
        <pre><code>int temperature = 25;
si (temperature == 25) alors {
    pin1_allumé;
}</code></pre>
    `
}
```

**CRITICAL**: Need to update `code-executor.js` and `validator.js` to support `si...alors` syntax!

**Exercise 1/3:**
```javascript
{
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
            pin9: { declared: true, on: true }  // Should be ON because condition is true
        },
        variables: {
            temperature: { value: '20', type: 'int' }
        }
    }
}
```

**Exercise 2/3:** (Same concept, condition is FALSE)
```javascript
{
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
            pin2: { declared: true, on: false }  // Should be OFF because condition is false (10 != 5)
        },
        variables: {
            niveau: { value: '10', type: 'int' }
        }
    }
}
```

**Exercise 3/3:** (Harder - Multiple pins, one in condition)
```javascript
{
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
            pin1: { declared: true, on: true },   // Always on
            pin10: { declared: true, on: true }   // On because condition true
        },
        variables: {
            systeme: { value: '1', type: 'int' }
        }
    }
}
```

---

### 5.4 Level 4 - IF-ELSE Statement (To Build)

**Concept**: Two-path conditional `si...alors...sinon`

**Difficulty**: ⭐⭐⭐ (Hard)

**Popup**: Optional (can reference previous popup)

**Exercise 1/3:**
```javascript
{
    number: 1,
    exampleCode: `void setup()
{
    pin1;
    pin9;
    int mode = 1;
    
    si (mode == 1) alors {
        pin1_allumé;
    } sinon {
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
            "Déclare <strong>pin1</strong> et <strong>pin9</strong>",
            "Crée <strong>int alarme = 0;</strong>",
            "Si alarme == 0, allume <strong>pin1</strong>",
            "Sinon, allume <strong>pin9</strong>"
        ]
    },
    expectedState: {
        pins: {
            pin1: { declared: true, on: true },   // ON because alarme == 0
            pin9: { declared: true, on: false }   // OFF because else not executed
        },
        variables: {
            alarme: { value: '0', type: 'int' }
        }
    }
}
```

**Exercise 2/3:** (Else path executed)
```javascript
{
    number: 2,
    exampleCode: `void setup()
{
    pin2;
    pin10;
    int test = 5;
    
    si (test == 1) alors {
        pin2_allumé;
    } sinon {
        pin10_allumé;
    }
}

void loop()
{
    // Rien ici
}`,
    challenge: {
        title: "À Toi de Jouer",
        instructions: [
            "Déclare <strong>pin2</strong> et <strong>pin10</strong>",
            "Crée <strong>int etat = 5;</strong>",
            "Si etat == 1, allume <strong>pin2</strong>",
            "Sinon, allume <strong>pin10</strong>"
        ]
    },
    expectedState: {
        pins: {
            pin2: { declared: true, on: false },  // OFF because condition false
            pin10: { declared: true, on: true }   // ON because else executed
        },
        variables: {
            etat: { value: '5', type: 'int' }
        }
    }
}
```

**Exercise 3/3:** (Multiple actions in each branch)
```javascript
{
    number: 3,
    exampleCode: `void setup()
{
    pin1;
    pin2;
    pin9;
    pin10;
    int jour = 1;
    
    si (jour == 1) alors {
        pin1_allumé;
        pin2_allumé;
    } sinon {
        pin9_allumé;
        pin10_allumé;
    }
}

void loop()
{
    // Rien ici
}`,
    challenge: {
        title: "À Toi de Jouer",
        instructions: [
            "Déclare tous les pins (1, 2, 9, 10)",
            "Crée <strong>int mode_rapide = 1;</strong>",
            "Si mode_rapide == 1, allume <strong>pin1</strong> et <strong>pin9</strong>",
            "Sinon, allume <strong>pin2</strong> et <strong>pin10</strong>"
        ]
    },
    expectedState: {
        pins: {
            pin1: { declared: true, on: true },   // ON (if branch)
            pin2: { declared: true, on: false },  // OFF
            pin9: { declared: true, on: true },   // ON (if branch)
            pin10: { declared: true, on: false }  // OFF
        },
        variables: {
            mode_rapide: { value: '1', type: 'int' }
        }
    }
}
```

---

### 5.5 Level 5 - Multiple Independent IF Statements (To Build)

**Concept**: Several `si` blocks that all get evaluated

**Difficulty**: ⭐⭐⭐⭐ (Very Hard)

**Exercise 1/3:**
```javascript
{
    number: 1,
    exampleCode: `void setup()
{
    pin1;
    pin9;
    int moteur = 1;
    int lumiere = 1;
    
    si (moteur == 1) alors {
        pin1_allumé;
    }
    
    si (lumiere == 1) alors {
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
            "Déclare <strong>pin1</strong> et <strong>pin2</strong>",
            "Crée <strong>int chauffage = 1;</strong>",
            "Crée <strong>int ventilateur = 1;</strong>",
            "Si chauffage == 1, allume <strong>pin1</strong>",
            "Si ventilateur == 1, allume <strong>pin2</strong>"
        ]
    },
    expectedState: {
        pins: {
            pin1: { declared: true, on: true },
            pin2: { declared: true, on: true }
        },
        variables: {
            chauffage: { value: '1', type: 'int' },
            ventilateur: { value: '1', type: 'int' }
        }
    }
}
```

**Exercise 2/3:** (One true, one false)
**Exercise 3/3:** (Three conditions, mix of true/false)

---

### 5.6 Level 6 - Compound Conditions (AND/OR) (To Build)

**Concept**: `&&` (et) and `||` (ou) operators

**Difficulty**: ⭐⭐⭐⭐⭐ (PEAK)

**Popup Required**: YES
```javascript
popup: {
    show: true,
    title: "🎓 Nouvelle Règle : Conditions Complexes !",
    content: `
        <p>Tu peux combiner plusieurs conditions :</p>
        <ul style="margin-left: 20px; margin-top: 10px;">
            <li><code>&&</code> (ET) : Les DEUX conditions doivent être vraies</li>
            <li><code>||</code> (OU) : Au moins UNE condition doit être vraie</li>
        </ul>
        <p style="margin-top: 15px;"><strong>Exemples :</strong></p>
        <pre><code>si (temperature == 25 && humidite == 60) alors {
    // Exécuté si les DEUX sont vraies
}

si (alarme == 1 || urgence == 1) alors {
    // Exécuté si au moins UNE est vraie
}</code></pre>
    `
}
```

---

### 5.7 Level 7 - Nested IF Statements (To Build)

**Concept**: `si` inside `si` (nested logic)

**Difficulty**: ⭐⭐⭐⭐⭐ (PEAK)

This is the HARDEST concept before difficulty drop.

---

### 5.8 Level 8 - PWM Introduction (To Build)

**Concept**: Analog output with `analogWrite(pin, 0-255)`

**Difficulty**: ⭐⭐ (DIFFICULTY DROP!)

**Why drop?** New concept (PWM) but simpler logic than nested conditionals.

**NEW FEATURE REQUIRED**: LED visualization must support PWM
- LEDs should visibly dim/brighten based on value
- Add pulsing animation for PWM values
- Need CSS animation updates

**Popup Required**: YES
```javascript
popup: {
    show: true,
    title: "🎓 Nouvelle Technique : PWM !",
    content: `
        <p>Tu peux maintenant contrôler la <strong>puissance</strong> des pins !</p>
        <ul style="margin-left: 20px; margin-top: 10px;">
            <li><code>analogWrite(pin, valeur);</code></li>
            <li>Valeur de <strong>0</strong> (éteint) à <strong>255</strong> (maximum)</li>
            <li>Permet de varier la luminosité, vitesse, etc.</li>
        </ul>
        <p style="margin-top: 15px;"><strong>Exemples :</strong></p>
        <pre><code>analogWrite(pin1, 0);     // Éteint
analogWrite(pin1, 128);   // Demi-puissance
analogWrite(pin1, 255);   // Puissance maximale</code></pre>
    `
}
```

---

## 6. BUILDING NEW LEVELS

### 6.1 Step-by-Step Process

**Step 1: Define Learning Goal**
- What ONE concept does this level teach?
- Where does it fit in difficulty progression?
- What prerequisite knowledge is needed?

**Step 2: Design Exercise Progression**
```
Exercise 1: Simplest possible version
Exercise 2: Same concept, different context
Exercise 3: Combine with previous concepts
```

**Step 3: Write Level Config**
1. Open `js/level-configs.js`
2. Add new level object: `niveauX: { ... }`
3. Set metadata (title, subtitle, number)
4. Write popup content if introducing new syntax
5. Create 3 exercise objects

**Step 4: Write Example Code**
- Must be complete, valid code
- Uses the exact syntax students need to learn
- Should execute without errors
- Keep it SHORT (students will reference it)

**Step 5: Write Challenge Instructions**
- Be SPECIFIC: "Crée int vitesse = 5;" not "Crée une variable"
- Use `<strong>` tags for important terms
- List step-by-step what they must do
- 3-5 instructions max

**Step 6: Define Expected State**
- List EVERY pin that matters (declared/on status)
- List EVERY variable that must exist (value/type)
- Omit pins/variables that should NOT exist

**Step 7: Create HTML File**
```bash
# Copy previous level HTML
cp niveau{X-1}.html niveau{X}.html

# Update the script at bottom:
<script>
    let currentLevel = 'niveauX';  // Change this
    let currentExercise = 0;
    document.addEventListener('DOMContentLoaded', function() {
        loadCurrentExercise();
    });
</script>
```

**Step 8: Test Thoroughly**
- Run example code (left side)
- Write student code (right side)
- Test correct solution
- Test wrong solutions (validation errors)
- Test all 3 exercises
- Verify auto-advance works
- Check progress bar updates

### 6.2 Code Template Generator

Use this template for new levels:

```javascript
niveauX: {
    levelNumber: X,
    title: "CONCEPT_NAME",
    subtitle: "LEARNING_GOAL",
    popup: {
        show: true,  // true if new syntax
        title: "🎓 Nouvelle Règle !",
        content: `
            <p>EXPLANATION</p>
            <ul style="margin-left: 20px; margin-top: 10px;">
                <li><code>SYNTAX_1</code> explanation</li>
                <li><code>SYNTAX_2</code> explanation</li>
            </ul>
            <p style="margin-top: 15px;"><strong>Exemple :</strong> <code>CODE_EXAMPLE</code></p>
        `
    },
    exercises: [
        // EXERCISE 1 (EASY)
        {
            number: 1,
            exampleCode: `void setup()
{
    // SIMPLE EXAMPLE
}

void loop()
{
    // Rien ici
}`,
            challenge: {
                title: "À Toi de Jouer",
                instructions: [
                    "INSTRUCTION_1",
                    "INSTRUCTION_2",
                    "INSTRUCTION_3"
                ]
            },
            expectedState: {
                pins: {
                    // PIN_EXPECTATIONS
                },
                variables: {
                    // VARIABLE_EXPECTATIONS
                }
            }
        },
        // EXERCISE 2 (MEDIUM) - Copy and modify
        {
            number: 2,
            // ... same structure, different values
        },
        // EXERCISE 3 (HARD) - Copy and modify
        {
            number: 3,
            // ... same structure, more complexity
        }
    ]
}
```

### 6.3 Validation Testing Checklist

For each exercise, test:

✅ **Correct Code**
- [ ] Passes validation
- [ ] Shows success animation
- [ ] Auto-advances (exercises 1-2)
- [ ] Shows completion message (exercise 3)
- [ ] Progress bar updates correctly

✅ **Wrong Code - Missing Semicolon**
- [ ] Error: "Il manque un point-virgule"
- [ ] Line highlighted in red
- [ ] Does NOT advance

✅ **Wrong Code - Wrong Variable Type**
- [ ] Error: "devrait être de type int"
- [ ] Does NOT advance

✅ **Wrong Code - Wrong Variable Value**
- [ ] Error: "devrait valoir X"
- [ ] Does NOT advance

✅ **Wrong Code - Missing Variable**
- [ ] Error: "La variable X est manquante"
- [ ] Does NOT advance

✅ **Wrong Code - Wrong Pin State**
- [ ] Error: "pin1 devrait être allumé"
- [ ] Does NOT advance

✅ **Wrong Code - Undeclared Pin Used**
- [ ] Error: "pin1 n'a pas été déclaré"
- [ ] Does NOT advance

---

## 7. DEBUGGING GUIDE

### 7.1 Common Issues & Fixes

#### **Issue: Code doesn't execute**
**Symptoms**: Click "Exécuter Mon Code", nothing happens

**Debug Steps:**
1. Open browser console (F12)
2. Look for JavaScript errors
3. Common causes:
   - `getCurrentExercise()` not defined → level-configs.js not loaded
   - `uiManager` undefined → ui-manager.js not loaded
   - Script loading order wrong in HTML

**Fix:**
```html
<!-- Correct order in HTML -->
<script src="js/config.js"></script>
<script src="js/level-configs.js"></script>  <!-- Must be before others -->
<script src="js/ui-manager.js"></script>
<script src="js/code-executor.js"></script>
<script src="js/validator.js"></script>
<script src="js/main.js"></script>
```

#### **Issue: Code executes but no highlighting**
**Symptoms**: LEDs work, variables update, but no purple line highlighting

**Debug Steps:**
1. Console log in `executeCodeVisual`:
   ```javascript
   console.log('studentLines:', studentLines.length);
   ```
2. If 0, the HTML wasn't created
3. Check `studentCodeDisplay` is visible

**Fix:**
Ensure `showCodeDisplay()` is called BEFORE execution starts.

#### **Issue: Validation always fails**
**Symptoms**: Code is correct but validation says it's wrong

**Debug Steps:**
1. Add logging to validator:
   ```javascript
   console.log('Actual state:', actualState);
   console.log('Expected state:', exercise.expectedState);
   ```
2. Compare structures
3. Common issues:
   - Type mismatch: `'int'` vs `'Int'` (case sensitive!)
   - Value type: `5` vs `'5'` (must be string!)
   - Missing pin in expectedState

**Fix:**
Values must be strings: `value: '5'` not `value: 5`
Types lowercase: `type: 'int'` not `type: 'Int'`

#### **Issue: Auto-advance doesn't work**
**Symptoms**: Validation succeeds but stays on same exercise

**Debug Steps:**
1. Check console for "Advancing to exercise..."
2. Verify `advanceExercise()` is called
3. Check exercise count

**Fix:**
Ensure `setTimeout(() => advanceExercise(), 2000)` is in validator.js after success.

#### **Issue: Popup doesn't appear**
**Symptoms**: No popup on level start

**Debug Steps:**
1. Check `popup.show: true` in config
2. Verify `showLevelPopup()` is called
3. Check CSS class `visible` is added

**Fix:**
Ensure `loadCurrentExercise()` calls `showLevelPopup()` for first exercise.

#### **Issue: Progress bar wrong**
**Symptoms**: Shows wrong exercise number or percentage

**Debug Steps:**
1. Console log: `console.log(getProgress())`
2. Check currentExercise value
3. Verify exercise.number matches

**Fix:**
`currentExercise` is 0-indexed, display should show `currentExercise + 1`.

### 7.2 Debugging Console Commands

Paste these in browser console for debugging:

```javascript
// Check current state
console.log('Level:', currentLevel);
console.log('Exercise:', currentExercise);
console.log('Progress:', getProgress());

// Get current config
console.log('Exercise config:', getCurrentExercise());
console.log('Level config:', getCurrentLevel());

// Test validator
const result = await codeValidator.executeCodeForValidation();
console.log('Validation result:', result);

// Check UI state
console.log('Student vars:', uiManager.studentVariables);
console.log('Example vars:', uiManager.exampleVariables);

// Force advance (for testing)
advanceExercise();

// Reset to exercise 1
currentExercise = 0;
loadCurrentExercise();
```

---

## 8. LEVEL PROGRESSION MAP

### 8.1 Complete Curriculum (Planned)

```
PHASE 1: FOUNDATION (⭐ - ⭐⭐)
├── Niveau 1: Variable Types (int) ✅ COMPLETE
│   ├── Exercise 1: Simple int + 1 pin
│   ├── Exercise 2: Different values
│   └── Exercise 3: Multiple pins
│
├── Niveau 2: Multiple Variables (⭐⭐) 🔨 TO BUILD
│   ├── Exercise 1: Two int variables
│   ├── Exercise 2: Different pins
│   └── Exercise 3: Three variables
│
└── Niveau 3: Variable Types (float, String) (⭐⭐) 🔨 TO BUILD
    ├── Exercise 1: float variables
    ├── Exercise 2: String variables
    └── Exercise 3: Mix of types

PHASE 2: LOGIC INTRODUCTION (⭐⭐⭐)
├── Niveau 4: Simple SI Statement (⭐⭐⭐) 🔨 TO BUILD
│   ├── Exercise 1: Condition true
│   ├── Exercise 2: Condition false
│   └── Exercise 3: Multiple pins
│
├── Niveau 5: SI-SINON (if-else) (⭐⭐⭐) 🔨 TO BUILD
│   ├── Exercise 1: If branch executes
│   ├── Exercise 2: Else branch executes
│   └── Exercise 3: Multiple actions each branch
│
└── Niveau 6: Multiple SI Statements (⭐⭐⭐⭐) 🔨 TO BUILD
    ├── Exercise 1: Two independent conditions (both true)
    ├── Exercise 2: One true, one false
    └── Exercise 3: Three conditions mixed

PHASE 3: COMPLEXITY PEAK (⭐⭐⭐⭐⭐)
├── Niveau 7: Compound Conditions (&&, ||) (⭐⭐⭐⭐) 🔨 TO BUILD
│   ├── Exercise 1: && (both true)
│   ├── Exercise 2: || (one true)
│   └── Exercise 3: Mix of && and ||
│
└── Niveau 8: Nested SI (⭐⭐⭐⭐⭐) PEAK 🔨 TO BUILD
    ├── Exercise 1: Simple nesting (2 levels)
    ├── Exercise 2: Deeper nesting (3 levels)
    └── Exercise 3: Complex decision tree

PHASE 4: DIFFICULTY DROP + NEW CONCEPT (⭐⭐)
├── Niveau 9: PWM Introduction (⭐⭐) 🔨 TO BUILD + UI UPDATES
│   ├── Exercise 1: Basic analogWrite
│   ├── Exercise 2: Different PWM values
│   └── Exercise 3: Multiple pins with PWM
│
└── Niveau 10: PWM + Conditions (⭐⭐⭐) 🔨 TO BUILD
    ├── Exercise 1: SI with PWM in branches
    ├── Exercise 2: Variable PWM values
    └── Exercise 3: Multiple PWM + conditions

FUTURE PHASES (Optional):
- Niveau 11-15: More PWM complexity
- Niveau 16-20: Introduction to delays (timing)
- Niveau 21-25: Final projects (combining everything)
```

### 8.2 Difficulty Curve Visualization

```
Complexity
    ↑
  5 |                       ╱╲
  4 |                   ╱╲╱  ╲
  3 |               ╱╲╱        ╲
  2 |           ╱╲╱              ╲╱╲
  1 |_____╱╲╱╲╱                      ╲___
    |_____|_____|_____|_____|_____|_____|→
      1-3  4-6  7-8   9-10  11-12  ...  Levels

  Phase: FOUND LOGIC PEAK  DROP  RAMP  ...
```

### 8.3 Concept Introduction Order

```
1. Variables (int)           ← Start here
2. Multiple variables        ← Repetition
3. Variable types (float)    ← Expand concept
4. Simple conditionals (si)  ← Logic begins
5. If-else (si-sinon)        ← Two paths
6. Multiple ifs              ← Independent logic
7. Compound conditions       ← Complex logic
8. Nested ifs                ← PEAK COMPLEXITY
9. PWM (analogWrite)         ← NEW + EASIER ← Drop point
10. PWM + conditionals       ← Combine
... continue ramping
```

---

## 9. SYNTAX REFERENCE

### 9.1 Currently Supported Syntax

**Pin Declaration:**
```cpp
pin1;
pin2;
pin9;
pin10;
```

**Pin Control:**
```cpp
pin1_allumé;    // Turn on
pin1_allume;    // Alternative spelling (no accent)
pin1_éteint;    // Turn off
pin1_eteint;    // Alternative spelling
```

**Variable Declaration (Typed):**
```cpp
int varName = 5;
float varName = 3.14;
String varName = "text";
```

**Variable Declaration (Untyped - Legacy):**
```cpp
varName = 5;  // Still works but not recommended
```

**Program Structure:**
```cpp
void setup()
{
    // Runs once at start
}

void loop()
{
    // Runs repeatedly (if implemented)
}
```

**Comments:**
```cpp
// Single line comment
```

### 9.2 Syntax To Implement (Future)

**Conditionals:**
```cpp
si (condition) alors {
    // action if true
}

si (condition) alors {
    // action if true
} sinon {
    // action if false
}
```

**Comparison Operators:**
```cpp
variable == value   // Equal
variable != value   // Not equal
variable > value    // Greater than
variable < value    // Less than
variable >= value   // Greater or equal
variable <= value   // Less or equal
```

**Logical Operators:**
```cpp
condition1 && condition2  // AND
condition1 || condition2  // OR
!condition                // NOT
```

**PWM:**
```cpp
analogWrite(pin1, 128);  // 0-255
```

**Delays (Future):**
```cpp
delay(1000);  // Wait 1 second
```

### 9.3 Keyword Highlighting

Currently highlighted in purple:
```javascript
['void setup', 'void loop', 'int', 'float', 'String', 'si', 'sinon', 'alors']
```

To add more keywords, update in:
```javascript
// js/code-executor.js - codeToHTML()
displayLine.replace(/\b(KEYWORD1|KEYWORD2)\b/g, '<span class="keyword">$1</span>');
```

---

## 10. TECHNICAL IMPLEMENTATION NOTES

### 10.1 Code Execution Flow

```
User clicks "Exécuter Mon Code"
    ↓
main.js: runStudentCode()
    ↓
code-executor.js: runStudentCode()
    ↓
- Sets isExecuting = true
- Shows stop button
- Resets state
- Gets code from editor
    ↓
code-executor.js: executeCodeVisual(code)
    ↓
- Converts code to HTML with highlighting
- Displays in studentCodeDisplay
- Hides codeEditor
- Queries all .code-line elements
    ↓
- Loops through each line:
  - Adds 'executing' class (purple highlight)
  - Waits 100ms
  - Parses line command
  - Executes action (LED on/off, variable create)
  - Removes 'executing' class
  - Waits 600ms
    ↓
- Execution complete
- Sets isExecuting = false
- Shows execute button
```

### 10.2 Validation Flow

```
User clicks "Vérifier Mon Code"
    ↓
main.js: checkCode()
    ↓
validator.js: checkCode()
    ↓
- Gets current exercise config
- Gets code from editor
    ↓
validator.js: executeCodeForValidation()
    ↓
- Creates test pin/variable state
- Silently parses each line (no visuals)
- Builds actual state object
    ↓
validator.js: validateState()
    ↓
- Compares actual vs expected:
  - Check each pin (declared? on?)
  - Check each variable (exists? correct value? correct type?)
- Collects errors
    ↓
- If NO errors:
  - Shows success animation
  - Auto-advances after 2 seconds (if not last exercise)
  - Shows completion message (if last exercise)
- If errors:
  - Shows feedback with error list
```

### 10.3 Auto-Advance Logic

```javascript
// In validator.js after successful validation:

if (progress.current === progress.total) {
    // Last exercise - show completion
    uiManager.showFeedback(
        '🎉 Niveau Terminé !',
        'Message...'
    );
} else {
    // Not last - auto-advance
    setTimeout(() => {
        advanceExercise();  // Updates currentExercise
    }, 2000);
}
```

```javascript
// In level-configs.js:

function advanceExercise() {
    const level = LEVELS[currentLevel];
    
    if (currentExercise < level.exercises.length - 1) {
        // Next exercise in same level
        currentExercise++;
        loadCurrentExercise();  // Updates UI
        return { type: 'exercise' };
    } else {
        // Level complete - move to next level
        const nextLevel = `niveau${level.levelNumber + 1}`;
        if (LEVELS[nextLevel]) {
            currentLevel = nextLevel;
            currentExercise = 0;
            loadCurrentExercise();
            return { type: 'level' };
        }
        return { type: 'complete' };
    }
}
```

### 10.4 Variable Type Detection

```javascript
// In validator.js and code-executor.js:

const typedMatch = trimmedLine.match(/(int|float|string)\s+(\w+)\s*=\s*(.+);/);
if (typedMatch) {
    const varType = typedMatch[1];      // 'int', 'float', or 'string'
    const varName = typedMatch[2];      // 'vitesse', 'temperature', etc.
    const varValue = typedMatch[3].trim(); // '5', '3.14', '"hello"'
    
    // Store with type
    variables[varName] = {
        value: varValue,
        type: varType
    };
}
```

**IMPORTANT**: Regex is case-insensitive due to `.toLowerCase()`, so `String` becomes `string` in regex.

---

## 11. QUICK REFERENCE COMMANDS

### For Building Levels:
```bash
# 1. Add level to js/level-configs.js
# 2. Copy HTML template:
cp niveau1.html niveau{X}.html

# 3. Update HTML script:
#    Change: let currentLevel = 'niveauX';

# 4. Test in browser
```

### For Debugging:
```javascript
// In browser console (F12):

// Check state
currentLevel
currentExercise
getProgress()

// Force advance
advanceExercise()

// Reset
currentExercise = 0
loadCurrentExercise()

// Test validation
await codeValidator.executeCodeForValidation()
```

### For Quick Testing:
```cpp
// Niveau 1 test code:
void setup()
{
    pin1;
    int vitesse = 5;
    pin1_allumé;
}

void loop()
{
    // Rien ici
}
```

---

## 12. FUTURE ENHANCEMENTS CHECKLIST

### Priority 1 (Needed Soon):
- [ ] Implement `si...alors` syntax parsing
- [ ] Implement `si...alors...sinon` syntax parsing
- [ ] Build Level 2 (Multiple Variables)
- [ ] Build Level 3 (Simple SI)
- [ ] Build Level 4 (SI-SINON)

### Priority 2 (Medium Term):
- [ ] Add compound condition support (`&&`, `||`)
- [ ] Add nested if support
- [ ] Build Levels 5-8

### Priority 3 (Later):
- [ ] PWM visualization (LED dimming)
- [ ] PWM syntax support
- [ ] Build Levels 9-10
- [ ] Add `delay()` support
- [ ] Add timing/animation features

### Priority 4 (Polish):
- [ ] Progress saving (localStorage)
- [ ] Level selection menu
- [ ] Achievement system
- [ ] Sound effects
- [ ] Better animations
- [ ] Mobile responsive design

---

## 13. CONTACT & NEXT STEPS

### When You Need to Continue Development:

**To Build Next Level:**
1. Reference this guide Section 5 for code examples
2. Copy template from Section 6.2
3. Follow build process in Section 6.1
4. Test using checklist in Section 6.3

**To Debug Issues:**
1. Check Section 7 for common issues
2. Use debugging commands from Section 11
3. Check console logs as described

**To Understand Psychology:**
1. Review Section 2 for flow state principles
2. Check Section 3 for difficulty theory
3. Reference Section 8 for progression map

### Quick Start for Next Session:
```
"Build Level 2 following the MASTER-GUIDE.md specification in Section 5.2"

or

"Debug issue with Level 1 Exercise 2, see Section 7"

or

"Implement si...alors syntax as specified in Section 9.2"
```

---

**Last Updated**: Current Implementation
**Status**: Level 1 Complete, Ready for Level 2
**Priority**: Build Level 2 (Multiple Variables) next

---

END OF MASTER GUIDE

