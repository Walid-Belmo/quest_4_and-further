/**
 * Code Validator
 * Validates student code against expected outcomes
 */

class CodeValidator {
    /**
     * Check if the code meets the level requirements
     */
    async checkCode() {
        console.log('Checking code');
        
        // Execute code silently for validation
        const result = await this.executeCodeForValidation();
        
        if (!result.success) {
            uiManager.showFeedback('Erreur détectée', result.error);
            return;
        }
        
        // Check against expected state
        const validation = this.validateState(result.state, LEVEL_CONFIG.expectedAfterSetup);
        
        if (validation.success) {
            uiManager.showFeedback(
                'Parfait !',
                'Excellent travail ! Tu as ajouté pin9, gardé la variable compteur, et allumé pin9 au lieu de pin1. Tu comprends maintenant comment travailler avec des pins ET des variables ensemble !'
            );
        } else {
            uiManager.showFeedback(
                'Pas tout à fait...',
                'Problèmes détectés : ' + validation.errors.join(' • ')
            );
        }
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
        
        try {
            for (let i = 0; i < lines.length; i++) {
                const trimmedLine = lines[i].trim().toLowerCase();
                
                if (trimmedLine === '') continue;
                
                if (trimmedLine.includes('void setup')) {
                    inSetup = true;
                    continue;
                }
                
                if (trimmedLine.includes('void loop')) {
                    break; // Only validate setup for niveau 2
                }
                
                if (trimmedLine === '{' || trimmedLine === '}') {
                    if (trimmedLine === '}') inSetup = false;
                    continue;
                }
                
                if (inSetup) {
                    if (!trimmedLine.endsWith(';') && !trimmedLine.startsWith('//')) {
                        throw { line: i, message: 'Il manque un point-virgule' };
                    }
                    
                    // Variable assignment
                    if (trimmedLine.includes('=')) {
                        const match = trimmedLine.match(/(\w+)\s*=\s*(.+);/);
                        if (match) {
                            testVars[match[1]] = match[2].trim();
                        }
                    }
                    // Pin declarations
                    else if (trimmedLine === 'pin1;') testPins.pin1.declared = true;
                    else if (trimmedLine === 'pin2;') testPins.pin2.declared = true;
                    else if (trimmedLine === 'pin9;') testPins.pin9.declared = true;
                    else if (trimmedLine === 'pin10;') testPins.pin10.declared = true;
                    // Pin actions
                    else if (trimmedLine.includes('pin1_allumé') || trimmedLine.includes('pin1_allume')) {
                        if (!testPins.pin1.declared) throw { line: i, message: 'pin1 utilisé avant d\'être déclaré' };
                        testPins.pin1.on = true;
                    }
                    else if (trimmedLine.includes('pin2_allumé') || trimmedLine.includes('pin2_allume')) {
                        if (!testPins.pin2.declared) throw { line: i, message: 'pin2 utilisé avant d\'être déclaré' };
                        testPins.pin2.on = true;
                    }
                    else if (trimmedLine.includes('pin9_allumé') || trimmedLine.includes('pin9_allume')) {
                        if (!testPins.pin9.declared) throw { line: i, message: 'pin9 utilisé avant d\'être déclaré' };
                        testPins.pin9.on = true;
                    }
                    else if (trimmedLine.includes('pin10_allumé') || trimmedLine.includes('pin10_allume')) {
                        if (!testPins.pin10.declared) throw { line: i, message: 'pin10 utilisé avant d\'être déclaré' };
                        testPins.pin10.on = true;
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
        for (const [varName, expectedValue] of Object.entries(expectedState.variables)) {
            if (!actualState.variables[varName]) {
                errors.push(`La variable "${varName}" est manquante`);
            } else if (actualState.variables[varName] !== expectedValue) {
                errors.push(`La variable "${varName}" devrait valoir ${expectedValue}`);
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

