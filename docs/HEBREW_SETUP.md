# Hebrew Setup Guide - TogetherNet

## System Configuration

### macOS Hebrew Keyboard Setup

1. **Add Hebrew Input Source**
   - System Preferences → Keyboard → Input Sources
   - Click "+" button
   - Select "Hebrew" → "Hebrew"
   - Check "Show Input menu in menu bar"

2. **Hebrew Keyboard Layout**
   - **Standard Hebrew**: QWERTY layout with Hebrew characters
   - **Hebrew (QWERTY)**: Hebrew characters on QWERTY positions
   - **Hebrew (PC)**: Traditional Hebrew layout

3. **Switch Between Languages**
   - Use `Cmd + Space` to cycle through input sources
   - Or click the input menu in the menu bar

### Windows Hebrew Keyboard Setup

1. **Add Hebrew Language**
   - Settings → Time & Language → Language
   - Add a language → Hebrew
   - Download language pack

2. **Hebrew Keyboard Layout**
   - Settings → Devices → Typing → Advanced keyboard settings
   - Add Hebrew keyboard

### Linux Hebrew Keyboard Setup

1. **Install Hebrew Support**

   ```bash
   sudo apt-get install ibus-m17n
   sudo apt-get install fonts-hebrew
   ```

2. **Configure IBus**
   - Settings → Region & Language → Input Sources
   - Add Hebrew

## Development Environment

### VS Code Hebrew Support

1. **Install Extensions**
   - Hebrew Language Support
   - RTL Support
   - Bracket Pair Colorizer

2. **Settings for RTL**
   ```json
   {
     "editor.textDirection": "auto",
     "workbench.layoutControl.enabled": true
   }
   ```

### Browser Testing

1. **Chrome/Edge**
   - Install "RTL Toggle" extension
   - Use `Ctrl+Shift+X` to toggle RTL

2. **Firefox**
   - Built-in RTL support
   - Use `Ctrl+Shift+X` to toggle

3. **Safari**
   - Built-in RTL support
   - Use `Cmd+Shift+X` to toggle

## Testing Hebrew Content

### Text Input Testing

1. **Basic Hebrew Text**

   ```
   שלום עולם
   בוקר טוב
   איך אתה מרגיש היום?
   ```

2. **Mixed Hebrew-English**

   ```
   Hello שלום
   Good morning בוקר טוב
   How are you? איך אתה?
   ```

3. **Numbers and Punctuation**
   ```
   123 ארבע חמש
   Hello! שלום!
   What's up? מה קורה?
   ```

### RTL Layout Testing

1. **Text Alignment**
   - Hebrew text should align right
   - English text should align left
   - Mixed content should flow naturally

2. **Navigation**
   - Hebrew navigation should flow right-to-left
   - English navigation should flow left-to-right
   - Mixed navigation should handle both

3. **Input Fields**
   - Hebrew input should default to RTL
   - English input should default to LTR
   - Mixed input should auto-detect

## Common Issues & Solutions

### Text Rendering Issues

1. **Missing Hebrew Characters**
   - Install Hebrew fonts
   - Check font-family CSS
   - Verify encoding (UTF-8)

2. **RTL Layout Problems**
   - Check CSS direction property
   - Verify flexbox RTL support
   - Test with different screen sizes

3. **Input Direction Issues**
   - Check input direction CSS
   - Verify JavaScript RTL detection
   - Test with different input methods

### Performance Issues

1. **Font Loading**
   - Use font-display: swap
   - Preload critical fonts
   - Optimize font files

2. **RTL Calculations**
   - Cache RTL calculations
   - Use CSS transforms when possible
   - Minimize JavaScript RTL logic

## Testing Checklist

### Basic Hebrew Support

- [ ] Hebrew keyboard input works
- [ ] Hebrew text displays correctly
- [ ] RTL layout functions properly
- [ ] Mixed content flows naturally

### Advanced RTL Features

- [ ] Navigation flows correctly
- [ ] Input fields handle direction
- [ ] Animations respect RTL
- [ ] Scroll behavior is correct

### Cross-Platform Testing

- [ ] iOS simulator
- [ ] Android emulator
- [ ] Web browsers (Chrome, Firefox, Safari)
- [ ] Different screen sizes

### Accessibility

- [ ] Screen readers handle Hebrew
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Color contrast meets standards

## Resources

### Hebrew Typography

- [W3C Hebrew Guidelines](https://www.w3.org/International/articles/inline-bidi-markup/uba-basics)
- [Hebrew Fonts](https://fonts.google.com/?subset=hebrew)
- [RTL CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)

### Testing Tools

- [RTL Toggle Extension](https://chrome.google.com/webstore/detail/rtl-toggle/ldjhmjdmjlmjcnhcnhclkfphadhgkkaf)
- [Hebrew Keyboard Online](https://www.lexilogos.com/keyboard/hebrew.htm)
- [RTL Testing Framework](https://github.com/facebook/react-native/tree/main/packages/react-native/Libraries/Text/Text)

---

_Last Updated: January 2025_
_Next Review: After mobile foundation setup_
