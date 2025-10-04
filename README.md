# Quest 4 - Niveau 2: Microcontroller Learning Game

An interactive educational game that teaches kids how to code microcontrollers using a visual, block-based approach.

## 📁 Project Structure

```
quest4niv2/
├── index.html              # Main HTML structure
├── css/
│   └── styles.css          # All styling and animations
├── js/
│   ├── config.js           # Level configuration and timing settings
│   ├── ui-manager.js       # UI updates, LED control, variable display
│   ├── code-executor.js    # Code execution engine with highlighting
│   ├── validator.js        # Code validation against expected outcomes
│   └── main.js             # Main entry point and event handlers
└── README.md               # This file
```

## 🎯 Features

- **Visual Microcontroller Simulation**: See LEDs turn on/off in real-time
- **Code Highlighting**: Each line is highlighted as it executes
- **Variable Tracking**: Variables are displayed as they're created
- **Error Detection**: Syntax errors are caught and displayed inline
- **Interactive Learning**: Example code on the left, student code on the right
- **Hints System**: Built-in help for students who get stuck

## 🔧 How It Works

### Modules

1. **config.js**
   - Defines level validation rules
   - Sets timing for animations
   - Configures available pins

2. **ui-manager.js**
   - Manages all UI updates
   - Controls LED states
   - Updates variable displays
   - Handles feedback messages

3. **code-executor.js**
   - Parses and executes student code
   - Provides visual line-by-line highlighting
   - Handles both setup() and loop() functions
   - Manages execution state

4. **validator.js**
   - Validates code against expected outcomes
   - Checks pin states and variable values
   - Provides detailed feedback

5. **main.js**
   - Event handler bindings
   - Initialization logic
   - Keyboard shortcuts (Ctrl+Enter to run)

## 🚀 Usage

Simply open `index.html` in a web browser. No build process required!

### For Students:
1. Read the example code on the left
2. Write your code in the editor on the right
3. Click "Exécuter Mon Code" to run it
4. Watch the LEDs and variables update
5. Click "Vérifier Mon Code" to check if correct

### For Developers:
To modify the level requirements, edit `js/config.js`:

```javascript
const LEVEL_CONFIG = {
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
```

## 🐛 Debugging

Console logging is enabled throughout the code. Open browser DevTools (F12) to see:
- Execution flow
- Code parsing steps
- Variable states
- Error messages

## 🎓 Level Goals (Niveau 2)

Students should:
- Keep `pin1` and add `pin9`
- Keep the variable `compteur = 0`
- Turn on `pin9` instead of `pin1`

## 🔮 Future Enhancements

- More levels with increasing difficulty
- Support for more complex operations
- Animation customization
- Progress tracking
- Multilingual support

## 📝 License

Educational use only.

