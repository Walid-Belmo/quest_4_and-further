/**
 * UI Manager
 * Handles all UI updates including LEDs, variables display, and visual feedback
 */

class UIManager {
    constructor() {
        this.exampleVariables = {};
        this.studentVariables = {};
    }

    /**
     * Update the variables display
     */
    updateVariableDisplay(vars, displayId) {
        const display = document.getElementById(displayId);
        if (Object.keys(vars).length === 0) {
            display.innerHTML = '<span style="color: #6b7280;">Aucune variable</span>';
        } else {
            display.innerHTML = Object.entries(vars)
                .map(([name, value]) => 
                    `<div class="variable-item"><span class="variable-name">${name}</span> = ${value}</div>`)
                .join('');
        }
    }

    /**
     * Turn on an LED
     */
    turnOnLED(prefix, pinNumber) {
        const ledId = `${prefix}-led${pinNumber}`;
        console.log(`Turning on LED: ${ledId}`);
        const led = document.getElementById(ledId);
        if (led) {
            led.classList.add('on');
            console.log(`LED ${ledId} turned on successfully`);
        } else {
            console.error(`LED ${ledId} not found!`);
        }
    }

    /**
     * Turn off an LED
     */
    turnOffLED(prefix, pinNumber) {
        const led = document.getElementById(`${prefix}-led${pinNumber}`);
        if (led) {
            led.classList.remove('on');
        }
    }

    /**
     * Reset all LEDs for a given prefix
     */
    resetAllLEDs(prefix) {
        ['1', '2', '9', '10'].forEach(pinNum => {
            this.turnOffLED(prefix, pinNum);
        });
    }

    /**
     * Show/hide buttons during execution
     */
    setExecutionButtons(isExecuting) {
        const btnExecute = document.getElementById('btnExecute');
        const btnStop = document.getElementById('btnStop');
        
        if (isExecuting) {
            btnExecute.style.display = 'none';
            btnStop.style.display = 'inline-block';
        } else {
            btnExecute.style.display = 'inline-block';
            btnStop.style.display = 'none';
        }
    }

    /**
     * Show feedback message
     */
    showFeedback(title, text) {
        const feedbackBox = document.getElementById('feedbackBox');
        const feedbackTitle = document.getElementById('feedbackTitle');
        const feedbackText = document.getElementById('feedbackText');
        
        feedbackTitle.textContent = title;
        feedbackText.textContent = text;
        feedbackBox.classList.add('visible');
    }

    /**
     * Hide feedback message
     */
    hideFeedback() {
        const feedbackBox = document.getElementById('feedbackBox');
        feedbackBox.classList.remove('visible');
    }

    /**
     * Toggle hint box visibility
     */
    toggleHint() {
        const hint = document.getElementById('hintBox');
        hint.classList.toggle('visible');
    }

    /**
     * Switch between code editor and display view
     */
    showCodeDisplay() {
        document.getElementById('studentCodeDisplay').style.display = 'block';
        document.getElementById('codeEditor').style.display = 'none';
    }

    showCodeEditor() {
        document.getElementById('studentCodeDisplay').style.display = 'none';
        document.getElementById('codeEditor').style.display = 'block';
    }

    /**
     * Clear all execution highlighting and errors
     */
    clearCodeHighlighting(containerId) {
        const container = document.getElementById(containerId);
        container.querySelectorAll('.code-line').forEach(line => {
            line.classList.remove('executing', 'error');
            const errorMsg = line.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
    }

    /**
     * Initialize variable displays
     */
    initializeDisplays() {
        this.updateVariableDisplay(this.exampleVariables, 'exampleVarList');
        this.updateVariableDisplay(this.studentVariables, 'studentVarList');
    }
}

// Create global instance
const uiManager = new UIManager();

