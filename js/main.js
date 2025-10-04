/**
 * Main Application
 * Entry point and event handlers
 */

// Global event handlers for HTML onclick attributes
function runExample() {
    codeExecutor.runExample();
}

function resetExample() {
    codeExecutor.resetExample();
}

function runStudentCode() {
    console.log('=== runStudentCode CALLED from HTML ===');
    codeExecutor.runStudentCode();
}

function stopExecution() {
    codeExecutor.stopExecution();
}

function resetStudent() {
    codeExecutor.resetStudent();
}

function toggleHint() {
    uiManager.toggleHint();
}

function checkCode() {
    codeValidator.checkCode();
}

function prevLevel() {
    window.location.href = 'quest4_niveau1.html';
}

function nextLevel() {
    window.location.href = 'quest4_niveau3.html';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize UI displays
    uiManager.initializeDisplays();
    
    // Get code editor
    const codeEditor = document.getElementById('codeEditor');
    
    // Add Tab key handler for code indentation
    if (codeEditor) {
        codeEditor.addEventListener('keydown', function(e) {
            // Handle Tab key for indentation
            if (e.key === 'Tab') {
                e.preventDefault();
                
                // Get cursor position
                const start = this.selectionStart;
                const end = this.selectionEnd;
                const value = this.value;
                
                if (e.shiftKey) {
                    // Shift+Tab: Remove indentation (unindent)
                    // Find start of line
                    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
                    const lineText = value.substring(lineStart, start);
                    
                    // Check if there are spaces at the beginning of the line
                    const spacesMatch = lineText.match(/^(\s{1,4})/);
                    if (spacesMatch) {
                        const spacesToRemove = spacesMatch[1].length;
                        this.value = value.substring(0, lineStart) + 
                                   value.substring(lineStart + spacesToRemove);
                        this.selectionStart = this.selectionEnd = start - spacesToRemove;
                    }
                } else {
                    // Tab: Insert 4 spaces at cursor position
                    this.value = value.substring(0, start) + '    ' + value.substring(end);
                    
                    // Put cursor after the inserted spaces
                    this.selectionStart = this.selectionEnd = start + 4;
                }
            }
        });
    }
    
    // Add keyboard shortcuts (optional enhancement)
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (document.activeElement === codeEditor) {
                e.preventDefault();
                runStudentCode();
            }
        }
    });
    
    console.log('Initialization complete');
});

