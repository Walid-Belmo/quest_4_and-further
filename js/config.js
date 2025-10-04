/**
 * Level Configuration
 * Defines the validation rules and expected outcomes for this level
 */
const LEVEL_CONFIG = {
    validateSetup: true,
    validateLoop: false,
    loopIterations: 0,
    expectedAfterSetup: {
        pins: {
            pin1: { declared: true, on: false },
            pin9: { declared: true, on: true }
        },
        variables: {
            compteur: '0'
        }
    }
};

/**
 * Available pins configuration
 */
const AVAILABLE_PINS = ['pin1', 'pin2', 'pin9', 'pin10'];

/**
 * Execution timing configuration (in milliseconds)
 */
const TIMING = {
    LINE_HIGHLIGHT: 100,
    SHORT_PAUSE: 500,
    MEDIUM_PAUSE: 600,
    LONG_PAUSE: 800,
    LOOP_PAUSE: 1000
};

