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
    
    // Add keyboard shortcuts (optional enhancement)
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const codeEditor = document.getElementById('codeEditor');
            if (document.activeElement === codeEditor) {
                e.preventDefault();
                runStudentCode();
            }
        }
    });
    
    console.log('Initialization complete');
});

