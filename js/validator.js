/**
 * Code Validator
 * Validates student code against expected outcomes
 */

class CodeValidator {
    /**
     * Evaluate a condition (e.g., "temperature == 20")
     * Returns { result: boolean, error: string|null }
     */
    evaluateCondition(condition, variables) {
        // Remove parentheses and trim
        condition = condition.replace(/[()]/g, '').trim();
        
        // Parse condition: varName == value
        const match = condition.match(/([\w\u00C0-\u00FF]+)\s*(==|!=|>|<|>=|<=)\s*(.+)/);
        if (!match) return { result: false, error: 'Condition invalide' };
        
        const varName = match[1];
        const operator = match[2];
        const compareValue = match[3].trim();
        
        // Get variable value
        const varObj = variables[varName];
        if (!varObj) {
            return { result: false, error: `La variable "${varName}" n'a pas été déclarée` };
        }
        
        const varValue = varObj.value;
        
        // Convert to numbers for comparison
        const leftVal = parseFloat(varValue);
        const rightVal = parseFloat(compareValue);
        
        let result;
        switch (operator) {
            case '==': result = leftVal === rightVal; break;
            case '!=': result = leftVal !== rightVal; break;
            case '>': result = leftVal > rightVal; break;
            case '<': result = leftVal < rightVal; break;
            case '>=': result = leftVal >= rightVal; break;
            case '<=': result = leftVal <= rightVal; break;
            default: return { result: false, error: 'Opérateur invalide' };
        }
        
        return { result: result, error: null };
    }

    /**
     * Check if the code meets the level requirements
     */
    async checkCode() {
        console.log('Checking code');
        
        // Get current exercise configuration
        const exercise = getCurrentExercise();
        const progress = getProgress();
        
        // Execute code silently for validation
        const result = await this.executeCodeForValidation();
        
        if (!result.success) {
            uiManager.showFeedback('Erreur détectée', result.error);
            return;
        }
        
        // Check against expected state
        const validation = this.validateState(result.state, exercise.expectedState);
        
        if (validation.success) {
            // Success! Show celebration
            this.showSuccessAnimation();
            
            // Check if this was the last exercise
            if (progress.current === progress.total) {
                uiManager.showFeedback(
                    '🎉 Niveau Terminé !',
                    'Bravo ! Tu as maîtrisé la déclaration de variables avec type. Prêt pour le prochain niveau ?'
                );
            } else {
                // Auto-advance to next exercise after delay
                setTimeout(() => {
                    advanceExercise();
                }, 2000);
            }
        } else {
            uiManager.showFeedback(
                'Pas tout à fait...',
                'Problèmes détectés : ' + validation.errors.join(' • ')
            );
        }
    }

    /**
     * Show success animation
     */
    showSuccessAnimation() {
        const successMsg = document.getElementById('successMessage');
        successMsg.classList.add('show');
        
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 2000);
    }

    /**
     * Execute code silently for validation (no visual feedback)
     */
    async executeCodeForValidation() {
        // Reset state
        const testVars = {};
        const testPins = {
            pin1: { declared: false, on: false },
            pin2: { declared: false, on: false },
            pin9: { declared: false, on: false },
            pin10: { declared: false, on: false }
        };
        
        const code = document.getElementById('codeEditor').value;
        if (!code.trim()) {
            return { success: false, error: 'Le code est vide !' };
        }
        
        const lines = code.split('\n');
        let inSetup = false;
        let inLoop = false;
        const declaredPins = new Set();
        
        try {
            for (let i = 0; i < lines.length; i++) {
                const trimmedLine = lines[i].trim().toLowerCase();
                
                if (trimmedLine === '') continue;
                
                if (trimmedLine.includes('void setup')) {
                    inSetup = true;
                    inLoop = false;
                    continue;
                }
                
                if (trimmedLine.includes('void loop')) {
                    inSetup = false;
                    inLoop = true;
                    continue;
                }
                
                if (trimmedLine === '{' || trimmedLine === '}') {
                    if (trimmedLine === '}') {
                        inSetup = false;
                        // Don't set inLoop to false here, continue processing loop
                    }
                    continue;
                }
                
                if (inSetup || inLoop) {
                    // Handle 'si...alors' conditional
                    if (trimmedLine.includes('si ') && trimmedLine.includes('alors')) {
                        const condMatch = trimmedLine.match(/si\s*\((.+)\)\s*alors\s*\{/);
                        if (condMatch) {
                            const condition = condMatch[1];
                            const evalResult = this.evaluateCondition(condition, testVars);
                            
                            // Check for errors in condition evaluation
                            if (evalResult.error) {
                                throw { line: i, message: evalResult.error };
                            }
                            
                            const conditionResult = evalResult.result;
                            
                            // Find the end of the block
                            let braceCount = 1;
                            let blockEndLine = i;
                            for (let j = i + 1; j < lines.length; j++) {
                                const checkLine = lines[j].trim();
                                if (checkLine.includes('{')) braceCount++;
                                if (checkLine.includes('}')) {
                                    braceCount--;
                                    if (braceCount === 0) {
                                        blockEndLine = j;
                                        break;
                                    }
                                }
                            }
                            
                            // Process the block only if condition is true
                            if (conditionResult) {
                                for (let j = i + 1; j < blockEndLine; j++) {
                                    const blockLine = lines[j].trim().toLowerCase();
                                    if (blockLine === '' || blockLine === '{' || blockLine === '}') continue;
                                    
                                    // Pin actions
                                    if (blockLine.includes('pin1_allumé') || blockLine.includes('pin1_allume')) {
                                        if (!declaredPins.has('pin1')) throw { line: j, message: 'pin1 utilisé avant d\'être déclaré' };
                                        testPins.pin1.on = true;
                                    }
                                    else if (blockLine.includes('pin2_allumé') || blockLine.includes('pin2_allume')) {
                                        if (!declaredPins.has('pin2')) throw { line: j, message: 'pin2 utilisé avant d\'être déclaré' };
                                        testPins.pin2.on = true;
                                    }
                                    else if (blockLine.includes('pin9_allumé') || blockLine.includes('pin9_allume')) {
                                        if (!declaredPins.has('pin9')) throw { line: j, message: 'pin9 utilisé avant d\'être déclaré' };
                                        testPins.pin9.on = true;
                                    }
                                    else if (blockLine.includes('pin10_allumé') || blockLine.includes('pin10_allume')) {
                                        if (!declaredPins.has('pin10')) throw { line: j, message: 'pin10 utilisé avant d\'être déclaré' };
                                        testPins.pin10.on = true;
                                    }
                                    else if (blockLine.includes('pin1_éteint') || blockLine.includes('pin1_eteint')) {
                                        if (!declaredPins.has('pin1')) throw { line: j, message: 'pin1 utilisé avant d\'être déclaré' };
                                        testPins.pin1.on = false;
                                    }
                                    else if (blockLine.includes('pin2_éteint') || blockLine.includes('pin2_eteint')) {
                                        if (!declaredPins.has('pin2')) throw { line: j, message: 'pin2 utilisé avant d\'être déclaré' };
                                        testPins.pin2.on = false;
                                    }
                                    else if (blockLine.includes('pin9_éteint') || blockLine.includes('pin9_eteint')) {
                                        if (!declaredPins.has('pin9')) throw { line: j, message: 'pin9 utilisé avant d\'être déclaré' };
                                        testPins.pin9.on = false;
                                    }
                                    else if (blockLine.includes('pin10_éteint') || blockLine.includes('pin10_eteint')) {
                                        if (!declaredPins.has('pin10')) throw { line: j, message: 'pin10 utilisé avant d\'être déclaré' };
                                        testPins.pin10.on = false;
                                    }
                                }
                            }
                            
                            // Skip to end of block
                            i = blockEndLine;
                            continue;
                        }
                    }
                    
                    if (!trimmedLine.endsWith(';') && !trimmedLine.startsWith('//') && !trimmedLine.includes('si ') && trimmedLine !== '{' && trimmedLine !== '}') {
                        throw { line: i, message: 'Il manque un point-virgule' };
                    }
                    
                    // Variable assignment with type (int, float, String)
                    if (trimmedLine.includes('=')) {
                        // Match: int varName = value; or float varName = value;
                        const typedMatch = trimmedLine.match(/(int|float|string)\s+([\w\u00C0-\u00FF]+)\s*=\s*(.+);/);
                        if (typedMatch) {
                            const varType = typedMatch[1];
                            const varName = typedMatch[2];
                            const varValue = typedMatch[3].trim();
                            testVars[varName] = {
                                value: varValue,
                                type: varType
                            };
                        } else {
                            // Untyped variable (old style)
                            const match = trimmedLine.match(/([\w\u00C0-\u00FF]+)\s*=\s*(.+);/);
                            if (match) {
                                testVars[match[1]] = {
                                    value: match[2].trim(),
                                    type: 'untyped'
                                };
                            }
                        }
                    }
                    // Pin declarations (only in setup)
                    else if (inSetup && trimmedLine === 'pin1;') {
                        testPins.pin1.declared = true;
                        declaredPins.add('pin1');
                    }
                    else if (inSetup && trimmedLine === 'pin2;') {
                        testPins.pin2.declared = true;
                        declaredPins.add('pin2');
                    }
                    else if (inSetup && trimmedLine === 'pin9;') {
                        testPins.pin9.declared = true;
                        declaredPins.add('pin9');
                    }
                    else if (inSetup && trimmedLine === 'pin10;') {
                        testPins.pin10.declared = true;
                        declaredPins.add('pin10');
                    }
                    // Pin actions (can be in setup OR loop)
                    else if (trimmedLine.includes('pin1_allumé') || trimmedLine.includes('pin1_allume')) {
                        if (!declaredPins.has('pin1')) throw { line: i, message: 'pin1 utilisé avant d\'être déclaré' };
                        testPins.pin1.on = true;
                    }
                    else if (trimmedLine.includes('pin2_allumé') || trimmedLine.includes('pin2_allume')) {
                        if (!declaredPins.has('pin2')) throw { line: i, message: 'pin2 utilisé avant d\'être déclaré' };
                        testPins.pin2.on = true;
                    }
                    else if (trimmedLine.includes('pin9_allumé') || trimmedLine.includes('pin9_allume')) {
                        if (!declaredPins.has('pin9')) throw { line: i, message: 'pin9 utilisé avant d\'être déclaré' };
                        testPins.pin9.on = true;
                    }
                    else if (trimmedLine.includes('pin10_allumé') || trimmedLine.includes('pin10_allume')) {
                        if (!declaredPins.has('pin10')) throw { line: i, message: 'pin10 utilisé avant d\'être déclaré' };
                        testPins.pin10.on = true;
                    }
                    // Turn pins off (can be in setup OR loop)
                    else if (trimmedLine.includes('pin1_éteint') || trimmedLine.includes('pin1_eteint')) {
                        if (!declaredPins.has('pin1')) throw { line: i, message: 'pin1 utilisé avant d\'être déclaré' };
                        testPins.pin1.on = false;
                    }
                    else if (trimmedLine.includes('pin2_éteint') || trimmedLine.includes('pin2_eteint')) {
                        if (!declaredPins.has('pin2')) throw { line: i, message: 'pin2 utilisé avant d\'être déclaré' };
                        testPins.pin2.on = false;
                    }
                    else if (trimmedLine.includes('pin9_éteint') || trimmedLine.includes('pin9_eteint')) {
                        if (!declaredPins.has('pin9')) throw { line: i, message: 'pin9 utilisé avant d\'être déclaré' };
                        testPins.pin9.on = false;
                    }
                    else if (trimmedLine.includes('pin10_éteint') || trimmedLine.includes('pin10_eteint')) {
                        if (!declaredPins.has('pin10')) throw { line: i, message: 'pin10 utilisé avant d\'être déclaré' };
                        testPins.pin10.on = false;
                    }
                }
            }
            
            return {
                success: true,
                state: {
                    pins: testPins,
                    variables: testVars
                }
            };
            
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Validate the actual state against the expected state
     */
    validateState(actualState, expectedState) {
        const errors = [];
        
        // Check pins
        for (const [pinName, expected] of Object.entries(expectedState.pins)) {
            const actual = actualState.pins[pinName];
            
            if (expected.declared && !actual.declared) {
                errors.push(`${pinName} n'est pas déclaré`);
            }
            
            if (expected.on !== undefined && actual.on !== expected.on) {
                if (expected.on) {
                    errors.push(`${pinName} devrait être allumé`);
                } else {
                    errors.push(`${pinName} ne devrait pas être allumé`);
                }
            }
        }
        
        // Check variables
        for (const [varName, expectedVar] of Object.entries(expectedState.variables)) {
            const actualVar = actualState.variables[varName];
            
            if (!actualVar) {
                errors.push(`La variable "${varName}" est manquante`);
            } else {
                // Check value
                if (typeof expectedVar === 'object') {
                    if (actualVar.value !== expectedVar.value) {
                        errors.push(`La variable "${varName}" devrait valoir ${expectedVar.value}`);
                    }
                    // Check type if specified
                    if (expectedVar.type && actualVar.type !== expectedVar.type) {
                        errors.push(`La variable "${varName}" devrait être de type ${expectedVar.type}`);
                    }
                } else {
                    // Old format compatibility
                    if (actualVar.value !== expectedVar) {
                        errors.push(`La variable "${varName}" devrait valoir ${expectedVar}`);
                    }
                }
            }
        }
        
        return {
            success: errors.length === 0,
            errors: errors
        };
    }
}

// Create global instance
const codeValidator = new CodeValidator();

