# Oregon Trail Archive - Web Frontend

A modern web-based frontend for the Oregon Trail game, built with HTML, CSS, and JavaScript. This project provides a beautiful, interactive interface for the classic Oregon Trail experience.

## 🎮 Game Overview

The Oregon Trail Archive is a web-based implementation of the classic Oregon Trail game. Players must travel 2170 miles from Independence, Missouri to Willamette Valley, managing resources, choosing vehicles, and dealing with random events along the way.

### Game Features

- **Three Vehicle Types**: Car, Plane, and Train, each with unique mechanics
- **Resource Management**: Manage money, meals, snacks, clothes, and toiletries
- **Random Events**: Experience traffic, turbulence, accidents, and more
- **Morale System**: Your morale affects your final score
- **Scoring System**: Comprehensive scoring based on resources, time, and morale
- **Modern UI**: Beautiful, responsive design with animations

## 🚀 Quick Start

### Option 1: Direct File Opening
1. Download all files to a local directory
2. Open `index.html` in any modern web browser
3. Start playing immediately!

### Option 2: Local Web Server (Recommended)
1. Download all files to a local directory
2. Start a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
Oregon Trail Archive/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── game.js            # JavaScript game logic
├── README.md          # This file
├── Car.java           # Original Java Car class
├── Plane.java         # Original Java Plane class
├── Train.java         # Original Java Train class
├── Vehicle.java       # Original Java Vehicle base class
├── Player.java        # Original Java Player class
├── Controller.java    # Original Java Controller class
├── Main.java          # Original Java Main class
├── rules.txt          # General game rules
├── car_rules.txt      # Car-specific rules
├── plane_rules.txt    # Plane-specific rules
├── train_rules.txt    # Train-specific rules
├── car.txt            # Car ASCII art
├── plane.txt          # Plane ASCII art
└── train.txt          # Train ASCII art
```

## 🎯 How to Play

### 1. Game Setup
- Enter your name
- Purchase initial supplies with your $1000 budget
- Choose your vehicle (Car, Plane, or Train)

### 2. Vehicle Selection
- **Car**: Cheapest option, requires gas management, moderate speed
- **Plane**: Fastest travel, TSA checks, layover options
- **Train**: Most reliable, slowest travel, fewest risks

### 3. Gameplay
- **Travel**: Roll dice to determine distance traveled
- **Manage Supplies**: Buy additional supplies when needed
- **Handle Events**: Deal with random events that affect your journey
- **Monitor Morale**: Keep your morale high for better scoring

### 4. Winning
- Reach Willamette Valley (2170 miles)
- Avoid bankruptcy
- Maximize your final score

## 🎲 Game Mechanics

### Dice Rolling
- Travel distance is determined by rolling two dice
- Each vehicle has a different multiplier:
  - Car: 50 miles per dice point
  - Plane: 75 miles per dice point
  - Train: 25 miles per dice point

### Supply Consumption
- **Meals**: 1 per 5 rolls (required)
- **Toiletries**: 1 per 5 rolls (required)
- **Clothes**: 1 per 10 rolls (optional but affects morale)
- **Snacks**: Optional, +5 morale each

### Morale System
- Starts at 10
- Decreases by 1 every 10 rolls
- Affected by events and supply shortages
- Acts as a multiplier for final score

### Scoring Formula
```
Score = (Base Score × Morale Multiplier)
Base Score = (-10 × Rolls) + Money + (20 × Meals) + (30 × Snacks) + (20 × Clothes) + (10 × Toiletries)
```

## 🎨 Features

### Visual Design
- Retro gaming aesthetic with modern UI
- Responsive design for all screen sizes
- Smooth animations and transitions
- Dice rolling animations
- Progress bars and visual feedback

### User Experience
- Intuitive navigation between screens
- Real-time supply cost calculations
- Clear game state display
- Modal dialogs for rules and information
- Mobile-friendly interface

### Game Features
- Complete rule implementation from original Java version
- All three vehicle types with unique mechanics
- Random event system
- Supply management
- Scoring system
- Game over conditions

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript ES6+**: Object-oriented game logic
- **Google Fonts**: Press Start 2P and Roboto fonts

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- Lightweight implementation (~50KB total)
- No external dependencies except fonts
- Optimized for smooth gameplay

## 🎮 Vehicle-Specific Features

### Car
- Gas management system
- Gas station visits
- Traffic and accident events
- Service fees for gas delivery

### Plane
- TSA security checks
- Layover vs. direct flight options
- Turbulence and grounding events
- Connection management for layovers

### Train
- Most reliable transportation
- Transfer line events
- Fewest random events
- Slowest but safest option

## 🏆 Tips for High Scores

1. **Choose Your Vehicle Wisely**: Each has different risk/reward profiles
2. **Manage Supplies**: Buy enough initially to avoid expensive mid-game purchases
3. **Monitor Morale**: Keep it positive for better scoring
4. **Plan Your Route**: Consider the trade-offs between speed and reliability
5. **Handle Events**: Some events are unavoidable, but good planning helps

## 🐛 Troubleshooting

### Common Issues

**Game won't start:**
- Ensure you're using a modern web browser
- Check that all files are in the same directory
- Try using a local web server instead of opening files directly

**Styling issues:**
- Clear your browser cache
- Ensure `styles.css` is in the same directory as `index.html`

**JavaScript errors:**
- Open browser developer tools (F12) to check for errors
- Ensure `game.js` is in the same directory as `index.html`

### Browser Requirements
- JavaScript must be enabled
- Local storage access (for potential future features)
- Modern CSS support for animations

## 🔮 Future Enhancements

Potential features for future versions:
- Save/load game functionality
- High score leaderboard
- Additional vehicle types
- More random events
- Sound effects and music
- Multiplayer support
- Achievement system

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## 📞 Support

If you encounter any issues or have questions, please check the troubleshooting section above or create an issue in the project repository.

---

**Enjoy your journey on the Oregon Trail!** 🚗✈️🚂
