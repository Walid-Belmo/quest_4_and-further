/**
 * Code Executor
 * Handles code execution with visual highlighting and animation
 */

class CodeExecutor {
    constructor() {
        this.isExecuting = false;
        this.shouldStopExecution = false;
    }

    /**
     * Highlight a line during execution
     */
    async highlightLine(lines, index, duration) {
        if (lines[index]) {
            lines[index].classList.add('executing');
            await this.sleep(duration);
            lines[index].classList.remove('executing');
        }
    }

    /**
     * Sleep utility
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Convert code to HTML with syntax highlighting
     */
    codeToHTML(code) {
        const lines = code.split('\n');
        let htmlCode = '';
        
        lines.forEach((line, index) => {
            let displayLine = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            // Highlight keywords
            displayLine = displayLine.replace(/\b(void setup|void loop|int|float|String|si|sinon|alors)\b/g, '<span class="keyword">$1</span>');
            // Highlight comments
            displayLine = displayLine.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
            htmlCode += `<div class="code-line" data-line="${index}">${displayLine || '&nbsp;'}</div>`;
        });
        
        return htmlCode;
    }

    /**
     * Execute example code with visual feedback
     */
    async runExample() {
        this.resetExample();
        
        const exercise = getCurrentExercise();
        const code = exercise.exampleCode;
        const lines = code.split('\n');
        const displayLines = document.querySelectorAll('#exampleCode .code-line');
        
        const declaredPins = new Set();
        let inSetup = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmedLine = line.trim().toLowerCase();
            
            if (trimmedLine === '') continue;
            
            await this.highlightLine(displayLines, i, TIMING.LINE_HIGHLIGHT);
            
            if (trimmedLine.includes('void setup')) {
                inSetup = true;
                await this.sleep(TIMING.SHORT_PAUSE);
                continue;
            }
            
            if (trimmedLine.includes('void loop')) {
                inSetup = false;
                await this.sleep(TIMING.SHORT_PAUSE);
                break;
            }
            
            if (trimmedLine === '{' || trimmedLine === '}') {
                await this.sleep(TIMING.SHORT_PAUSE);
                if (trimmedLine === '}') inSetup = false;
                continue;
            }
            
            if (inSetup) {
                // Variable declaration
                if (trimmedLine.includes('=')) {
                    const typedMatch = trimmedLine.match(/(int|float|string)\s+([\w\u00C0-\u00FF]+)\s*=\s*(.+);/);
                    if (typedMatch) {
                        const varName = typedMatch[2];
                        const varValue = typedMatch[3].trim();
                        const varType = typedMatch[1];
                        uiManager.exampleVariables[varName] = `${varValue} (${varType})`;
                        uiManager.updateVariableDisplay(uiManager.exampleVariables, 'exampleVarList');
                    }
                    await this.sleep(TIMING.MEDIUM_PAUSE);
                }
                // Pin declarations
                else if (trimmedLine.match(/^pin\d+;$/)) {
                    const pinMatch = trimmedLine.match(/pin(\d+);/);
                    if (pinMatch) declaredPins.add(`pin${pinMatch[1]}`);
                    await this.sleep(TIMING.MEDIUM_PAUSE);
                }
                // Pin actions
                else if (trimmedLine.includes('_allumé') || trimmedLine.includes('_allume')) {
                    const pinMatch = trimmedLine.match(/pin(\d+)_allum/);
                    if (pinMatch) {
                        uiManager.turnOnLED('example', pinMatch[1]);
                    }
                    await this.sleep(TIMING.MEDIUM_PAUSE);
                }
            }
        }
    }

    /**
     * Reset example state
     */
    resetExample() {
        uiManager.resetAllLEDs('example');
        Object.keys(uiManager.exampleVariables).forEach(key => delete uiManager.exampleVariables[key]);
        uiManager.updateVariableDisplay(uiManager.exampleVariables, 'exampleVarList');
        uiManager.clearCodeHighlighting('exampleCode');
    }

    /**
     * Execute student code with visual feedback
     */
    async runStudentCode() {
        console.log('=== runStudentCode started ===');
        
        if (this.isExecuting) {
            console.log('Already executing, returning');
            return;
        }

        this.isExecuting = true;

        console.log('Setting execution buttons');
        uiManager.setExecutionButtons(true);

        console.log('Resetting student state');
        this.resetStudent();
        
        // Reset stop flag AFTER resetStudent (which sets it to true)
        this.shouldStopExecution = false;

        const code = document.getElementById('codeEditor').value;
        console.log('Code length:', code.length);

        if (!code.trim()) {
            alert('Écris d\'abord ton code !');
            this.isExecuting = false;
            uiManager.setExecutionButtons(false);
            return;
        }

        console.log('Calling executeCodeVisual');
        try {
            const result = await this.executeCodeVisual(code, true);
            console.log('executeCodeVisual result:', result);
        } catch (error) {
            console.error('Error in executeCodeVisual:', error);
        }
        
        this.isExecuting = false;
        uiManager.setExecutionButtons(false);
        console.log('=== runStudentCode finished ===');
    }

    /**
     * Stop code execution
     */
    stopExecution() {
        this.shouldStopExecution = true;
    }

    /**
     * Execute code with visual feedback
     */
    async executeCodeVisual(code, withLooping) {
        console.log('=== executeCodeVisual started ===');
        
        const studentCodeDisplay = document.getElementById('studentCodeDisplay');
        const codeEditor = document.getElementById('codeEditor');
        
        // Convert code to HTML and display it
        console.log('Converting code to HTML');
        const htmlCode = this.codeToHTML(code);
        studentCodeDisplay.innerHTML = htmlCode;
        
        console.log('Showing code display');
        uiManager.showCodeDisplay();
        
        const lines = code.split('\n');
        const studentLines = studentCodeDisplay.querySelectorAll('.code-line');
        console.log('Total lines:', lines.length, 'studentLines:', studentLines.length);
        
        const declaredPins = new Set();
        let inSetup = false;
        let inLoop = false;
        let loopStartLine = -1;
        let loopEndLine = -1;
        
        try {
            // First pass: execute setup
            console.log('Starting setup execution');
            for (let i = 0; i < lines.length && !this.shouldStopExecution; i++) {
                const line = lines[i];
                const trimmedLine = line.trim().toLowerCase();
                
                if (trimmedLine === '') continue;
                
                console.log(`Line ${i}: "${trimmedLine}"`);
                studentLines[i].classList.add('executing');
                await this.sleep(TIMING.LINE_HIGHLIGHT);
                
                if (trimmedLine.includes('void setup')) {
                    inSetup = true;
                    console.log('Entered setup');
                    await this.sleep(TIMING.SHORT_PAUSE);
                    studentLines[i].classList.remove('executing');
                    continue;
                }
                
                if (trimmedLine.includes('void loop')) {
                    inSetup = false;
                    inLoop = true;
                    loopStartLine = i + 2;
                    console.log('Entered loop, loopStartLine:', loopStartLine);
                    await this.sleep(TIMING.SHORT_PAUSE);
                    studentLines[i].classList.remove('executing');
                    
                    // Find loop end
                    for (let j = i + 1; j < lines.length; j++) {
                        if (lines[j].trim() === '}') {
                            loopEndLine = j;
                            console.log('Found loop end at line:', loopEndLine);
                            break;
                        }
                    }
                    
                    if (!withLooping) break;
                    continue;
                }
                
                if (trimmedLine === '{' || (trimmedLine === '}' && inSetup)) {
                    await this.sleep(TIMING.SHORT_PAUSE);
                    studentLines[i].classList.remove('executing');
                    if (trimmedLine === '}') inSetup = false;
                    continue;
                }
                
                if (inSetup) {
                    console.log('Executing setup line:', i);
                    await this.executeLineCommand(trimmedLine, i, studentLines, declaredPins);
                } else {
                    // Remove highlight for lines not in setup
                    studentLines[i].classList.remove('executing');
                }
            }
            
            // Loop execution if enabled and loop exists
            if (withLooping && loopStartLine !== -1 && loopEndLine !== -1) {
                console.log('Starting loop execution');
                while (!this.shouldStopExecution) {
                    for (let i = loopStartLine; i < loopEndLine && !this.shouldStopExecution; i++) {
                        const line = lines[i];
                        const trimmedLine = line.trim().toLowerCase();
                        
                        if (trimmedLine === '' || trimmedLine.startsWith('//')) {
                            await this.sleep(200);
                            continue;
                        }
                        
                        studentLines[i].classList.add('executing');
                        await this.sleep(TIMING.LINE_HIGHLIGHT);
                        
                        await this.executeLineCommand(trimmedLine, i, studentLines, declaredPins);
                    }
                    
                    await this.sleep(TIMING.LOOP_PAUSE);
                }
            }
            
            console.log('=== executeCodeVisual finished successfully ===');
            return { success: true };
            
        } catch (error) {
            console.error('Error during execution:', error);
            if (studentLines[error.line]) {
                studentLines[error.line].classList.remove('executing');
                studentLines[error.line].classList.add('error');
                
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = error.message;
                studentLines[error.line].appendChild(errorDiv);
            }
            return { success: false, error: error.message };
        }
    }

    /**
     * Execute a single line command
     */
    async executeLineCommand(trimmedLine, lineIndex, studentLines, declaredPins) {
        if (trimmedLine.startsWith('//')) {
            await this.sleep(TIMING.SHORT_PAUSE);
            studentLines[lineIndex].classList.remove('executing');
            return;
        }
        
        if (!trimmedLine.endsWith(';')) {
            studentLines[lineIndex].classList.remove('executing');
            studentLines[lineIndex].classList.add('error');
            throw { line: lineIndex, message: 'Erreur: Il manque un point-virgule (;) à la fin de cette ligne!' };
        }
        
        // Variable assignment (typed or untyped)
        if (trimmedLine.includes('=')) {
            // Try typed variable first: int varName = value;
            const typedMatch = trimmedLine.match(/(int|float|string)\s+([\w\u00C0-\u00FF]+)\s*=\s*(.+);/);
            if (typedMatch) {
                const varType = typedMatch[1];
                const varName = typedMatch[2];
                const varValue = typedMatch[3].trim();
                uiManager.studentVariables[varName] = `${varValue} (${varType})`;
                uiManager.updateVariableDisplay(uiManager.studentVariables, 'studentVarList');
            } else {
                // Untyped variable (old style)
                const match = trimmedLine.match(/([\w\u00C0-\u00FF]+)\s*=\s*(.+);/);
                if (match) {
                    const varName = match[1];
                    const varValue = match[2].trim();
                    uiManager.studentVariables[varName] = varValue;
                    uiManager.updateVariableDisplay(uiManager.studentVariables, 'studentVarList');
                }
            }
        }
        // Pin declarations
        else if (trimmedLine === 'pin1;') {
            declaredPins.add('pin1');
        } else if (trimmedLine === 'pin2;') {
            declaredPins.add('pin2');
        } else if (trimmedLine === 'pin9;') {
            declaredPins.add('pin9');
        } else if (trimmedLine === 'pin10;') {
            declaredPins.add('pin10');
        } else if (trimmedLine.match(/^pin\d+;$/)) {
            const pinNum = trimmedLine.match(/pin(\d+);/)[1];
            studentLines[lineIndex].classList.remove('executing');
            studentLines[lineIndex].classList.add('error');
            throw { line: lineIndex, message: `Erreur: pin${pinNum} n'existe pas!` };
        }
        // Turn pins on
        else if (trimmedLine.includes('pin1_allumé') || trimmedLine.includes('pin1_allume')) {
            if (!declaredPins.has('pin1')) {
                studentLines[lineIndex].classList.remove('executing');
                studentLines[lineIndex].classList.add('error');
                throw { line: lineIndex, message: 'Erreur: pin1 n\'a pas été déclaré!' };
            }
            uiManager.turnOnLED('student', '1');
        } else if (trimmedLine.includes('pin2_allumé') || trimmedLine.includes('pin2_allume')) {
            if (!declaredPins.has('pin2')) {
                studentLines[lineIndex].classList.remove('executing');
                studentLines[lineIndex].classList.add('error');
                throw { line: lineIndex, message: 'Erreur: pin2 n\'a pas été déclaré!' };
            }
            uiManager.turnOnLED('student', '2');
        } else if (trimmedLine.includes('pin9_allumé') || trimmedLine.includes('pin9_allume')) {
            if (!declaredPins.has('pin9')) {
                studentLines[lineIndex].classList.remove('executing');
                studentLines[lineIndex].classList.add('error');
                throw { line: lineIndex, message: 'Erreur: pin9 n\'a pas été déclaré!' };
            }
            uiManager.turnOnLED('student', '9');
        } else if (trimmedLine.includes('pin10_allumé') || trimmedLine.includes('pin10_allume')) {
            if (!declaredPins.has('pin10')) {
                studentLines[lineIndex].classList.remove('executing');
                studentLines[lineIndex].classList.add('error');
                throw { line: lineIndex, message: 'Erreur: pin10 n\'a pas été déclaré!' };
            }
            uiManager.turnOnLED('student', '10');
        }
        // Turn pins off
        else if (trimmedLine.includes('pin1_éteint') || trimmedLine.includes('pin1_eteint')) {
            if (!declaredPins.has('pin1')) {
                studentLines[lineIndex].classList.remove('executing');
                studentLines[lineIndex].classList.add('error');
                throw { line: lineIndex, message: 'Erreur: pin1 n\'a pas été déclaré!' };
            }
            uiManager.turnOffLED('student', '1');
        } else if (trimmedLine.includes('pin2_éteint') || trimmedLine.includes('pin2_eteint')) {
            if (!declaredPins.has('pin2')) {
                studentLines[lineIndex].classList.remove('executing');
                studentLines[lineIndex].classList.add('error');
                throw { line: lineIndex, message: 'Erreur: pin2 n\'a pas été déclaré!' };
            }
            uiManager.turnOffLED('student', '2');
        } else if (trimmedLine.includes('pin9_éteint') || trimmedLine.includes('pin9_eteint')) {
            if (!declaredPins.has('pin9')) {
                studentLines[lineIndex].classList.remove('executing');
                studentLines[lineIndex].classList.add('error');
                throw { line: lineIndex, message: 'Erreur: pin9 n\'a pas été déclaré!' };
            }
            uiManager.turnOffLED('student', '9');
        } else if (trimmedLine.includes('pin10_éteint') || trimmedLine.includes('pin10_eteint')) {
            if (!declaredPins.has('pin10')) {
                studentLines[lineIndex].classList.remove('executing');
                studentLines[lineIndex].classList.add('error');
                throw { line: lineIndex, message: 'Erreur: pin10 n\'a pas été déclaré!' };
            }
            uiManager.turnOffLED('student', '10');
        }
        // Check for typos
        else if (trimmedLine.match(/pin\d+_\w+;/)) {
            studentLines[lineIndex].classList.remove('executing');
            studentLines[lineIndex].classList.add('error');
            throw { line: lineIndex, message: 'Erreur: Commande incorrecte! Utilise "pinX_allumé;" ou "pinX_éteint;"' };
        }
        // Unknown command
        else if (trimmedLine.includes('pin')) {
            studentLines[lineIndex].classList.remove('executing');
            studentLines[lineIndex].classList.add('error');
            throw { line: lineIndex, message: 'Erreur: Syntaxe incorrecte!' };
        }
        // Nonsense line
        else if (!trimmedLine.includes('=')) {
            studentLines[lineIndex].classList.remove('executing');
            studentLines[lineIndex].classList.add('error');
            throw { line: lineIndex, message: 'Erreur: Cette ligne n\'est pas du code valide!' };
        }
        
        await this.sleep(TIMING.MEDIUM_PAUSE);
        studentLines[lineIndex].classList.remove('executing');
    }

    /**
     * Reset student state
     */
    resetStudent() {
        console.log('Resetting student');
        this.shouldStopExecution = true;
        
        uiManager.resetAllLEDs('student');
        Object.keys(uiManager.studentVariables).forEach(key => delete uiManager.studentVariables[key]);
        uiManager.updateVariableDisplay(uiManager.studentVariables, 'studentVarList');
        
        uiManager.showCodeEditor();
        uiManager.clearCodeHighlighting('studentCodeDisplay');
    }
}

// Create global instance
const codeExecutor = new CodeExecutor();

