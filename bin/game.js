// Oregon Trail Game JavaScript Implementation
class OregonTrailGame {
    constructor() {
        this.currentScreen = 'welcome-screen';
        this.player = null;
        this.vehicle = null;
        this.gameState = {
            round: 1,
            gameOver: false,
            quit: false
        };

        this.rules = {
            general: `===== RULES =====

Welcome to the Oregon Trail!

You will start with $1000.
You cannot make more money throughout the game, so be cautious!
If you reach bankruptcy, the game will be over.

Your score is calculated using four factors:
1. The money you have left.
2. The number of turns it took you.
3. The supplies you have left.
4. Your morale when you arrive.

The number of turns it took you is your base score.
The money and supplies you have left are weighted and added to your base score.
Your morale is your multiplier.

Each vehicle type introduces inherent risk.
For example, if you drive, you may hit traffic. This causes you to use your supplies faster.
If you take a layover, you may miss your connection. This uses supplies and costs additional money.
Taking a direct flight is more expensive upfront but introduces less risk.
However, turbulence or other "regular" risks may cost you supplies.
Trains have the fewest risks associated with them. However, they travel the slowest.

Higher risk introduces higher reward in terms of your morale.
Your morale starts at 10.
You will lose one morale point every 10 rolls.
However, if things don't go your way, you can lose morale more rapidly.
If you arrive in Willamette Valley with a morale score < 1, your multiplier will be 0.5

Are you ready to take the Oregon Trail?`,

            car: `===== CAR RULES =====

Congratulations on renting your car! Let's talk about it.

Price:
These cars come at a low price. You'll be expected to return your car when you arrive at Willamette Valley.
To determine the price of your car, you'll roll two dice.
If you roll 2-3, your price will be $100 - $125.
If you roll 4-6, your price will be $125 - $150.
If you roll 7-9, your price will be $150 - $175.
If you roll 10-12, your price will be $175 - $200.

Driving:
You will roll to determine how far you drive.
Your roll multiplier is 50 - so whatever you roll, you'll drive 50x that many miles.
Every time you drive, a number will be generated for you from 1-100.
1-25: Traffic - lose one roll. Lose 50 additional gas miles and 1 morale point.
25-50: Get lost - lose two rolls. Lose 75 additional gas miles and 2 morale points.
50-60: Accident - lose one roll. Rent a new car and lose 3 morale points. Re-rented cars come at a fixed cost of $150.
60-100: No issues. Gain 1 morale point.

If you run out of gas on the road, you will be required to pay an additional $25 fee for a gas delivery.

Best of luck!`,

            plane: `===== PLANE RULES =====

Congratulations on booking your flight! Let's talk about it.

Price:
To determine the price of your flight, you'll roll two dice.

For a layover:
If you roll 2-3, your price will be $200 - $225.
If you roll 4-6, your price will be $225 - $250.
If you roll 7-9, your price will be $250 - $275.
If you roll 10-12, your price will be $275 - $300.

For a direct flight:
If you roll 2-3, your price will be $300 - $325.
If you roll 4-6, your price will be $325 - $350.
If you roll 7-9, your price will be $350 - $375.
If you roll 10-12, your price will be $375 - $400.

TSA:
You have a 50/50 chance of making it through TSA safely.
If you make it through, you will gain 1 morale point.
If you don't make it through, you will lose half of your supplies and 1 morale point.

Flying:
You will roll to determine how far you fly.
Your roll multiplier is 75 - so whatever you roll, you'll fly 75x that many miles.
Every time you fly, a number will be generated for you from 1-100.
1-25: Turbulence - lose one roll and 1 morale point.
25-75 - No issues. Gain 1 morale point.
75-100: Your flight was grounded. You must rebook your flight. Rebooked flights come at a fixed cost of $150. Lose one roll and 3 morale points.

If you're on a layover, you have a 50/50 chance of making your connection.
If you miss your connection, you must rebook your flight. Rebooked flights come at a fixed cost of $150. Lose one roll and 3 morale points.
If you make your connection, you will gain 3 morale points.

Best of luck!`,

            train: `===== TRAIN RULES =====

Congratulations on buying your train tickets! Let's talk about it.

Price:
To determine the price of your ticket, you'll roll two dice.
If you roll 2-3, your price will be $50 - $62.
If you roll 4-6, your price will be $63 - $75.
If you roll 7-9, your price will be $75 - $87.
If you roll 10-12, your price will be $87 - $100.

Traveling:
You will roll to determine how far you travel.
Your roll multiplier is 25 - so whatever you roll, you'll travel 25x that many miles.
Every time you drive, a number will be generated for you from 1-100.
1-25: The train is stopped - lose one roll and 2 morale points.
25-50: Transfer lines - lose two rolls.
50-100: No issues. Gain 1 morale point.

Best of luck!`
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Welcome screen
        document.getElementById('start-game-btn').addEventListener('click', () => this.showScreen('player-setup-screen'));
        document.getElementById('view-rules-btn').addEventListener('click', () => this.showRules());

        // Rules screen
        document.getElementById('back-from-rules-btn').addEventListener('click', () => this.showScreen('welcome-screen'));

        // Player setup
        document.getElementById('continue-setup-btn').addEventListener('click', () => this.setupPlayer());

        // Supply screen
        document.getElementById('continue-supplies-btn').addEventListener('click', () => this.purchaseSupplies());
        this.setupSupplyCalculations();

        // Vehicle selection
        this.setupVehicleSelection();

        // Game actions
        document.getElementById('travel-btn').addEventListener('click', () => this.startTravel());
        document.getElementById('check-supplies-btn').addEventListener('click', () => this.checkSupplies());
        document.getElementById('buy-supplies-btn').addEventListener('click', () => this.showStore());
        document.getElementById('eat-snack-btn').addEventListener('click', () => this.eatSnack());
        document.getElementById('vehicle-rules-btn').addEventListener('click', () => this.showVehicleRules());
        document.getElementById('quit-game-btn').addEventListener('click', () => this.quitGame());

        // Travel screen
        document.getElementById('continue-travel-btn').addEventListener('click', () => this.continueFromTravel());

        // Store screen
        document.getElementById('purchase-items-btn').addEventListener('click', () => this.purchaseStoreItems());
        document.getElementById('back-from-store-btn').addEventListener('click', () => this.showScreen('game-screen'));
        this.setupStoreCalculations();

        // Gas station
        document.getElementById('purchase-gas-btn').addEventListener('click', () => this.purchaseGas());
        document.getElementById('back-from-gas-btn').addEventListener('click', () => this.showScreen('game-screen'));
        this.setupGasCalculations();

        // Game over
        document.getElementById('play-again-btn').addEventListener('click', () => this.resetGame());

        // Modal
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;
    }

    showRules() {
        document.getElementById('rules-text').textContent = this.rules.general;
        this.showScreen('rules-screen');
    }

    setupPlayer() {
        const name = document.getElementById('player-name').value.trim();
        if (!name) {
            alert('Please enter your name!');
            return;
        }
        this.player = new Player(name);
        this.showScreen('supply-screen');
    }

    setupSupplyCalculations() {
        const inputs = ['meals', 'snacks', 'clothes', 'toiletries'];
        inputs.forEach(inputId => {
            document.getElementById(inputId).addEventListener('input', () => this.calculateSupplyCost());
        });
    }

    calculateSupplyCost() {
        const meals = parseInt(document.getElementById('meals').value) || 0;
        const snacks = parseInt(document.getElementById('snacks').value) || 0;
        const clothes = parseInt(document.getElementById('clothes').value) || 0;
        const toiletries = parseInt(document.getElementById('toiletries').value) || 0;

        const totalCost = (meals * 10) + (snacks * 20) + (clothes * 10) + (toiletries * 5);
        const remaining = 1000 - totalCost;

        document.getElementById('total-cost').textContent = totalCost;
        document.getElementById('remaining-money').textContent = remaining;

        if (remaining < 0) {
            document.getElementById('remaining-money').style.color = '#e74c3c';
        } else {
            document.getElementById('remaining-money').style.color = '#27ae60';
        }
    }

    purchaseSupplies() {
        const meals = parseInt(document.getElementById('meals').value) || 0;
        const snacks = parseInt(document.getElementById('snacks').value) || 0;
        const clothes = parseInt(document.getElementById('clothes').value) || 0;
        const toiletries = parseInt(document.getElementById('toiletries').value) || 0;

        const totalCost = (meals * 10) + (snacks * 20) + (clothes * 10) + (toiletries * 5);

        if (totalCost > 1000) {
            alert('You don\'t have enough money for these supplies!');
            return;
        }

        this.player.purchaseSupplies(meals, snacks, clothes, toiletries, totalCost);
        this.showScreen('vehicle-screen');
    }

    setupVehicleSelection() {
        const vehicleCards = document.querySelectorAll('.vehicle-card');
        vehicleCards.forEach(card => {
            card.addEventListener('click', () => this.selectVehicle(card));
        });

        const flightButtons = document.querySelectorAll('[data-flight]');
        flightButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectFlightType(e.target.dataset.flight));
        });

        document.getElementById('confirm-vehicle-btn').addEventListener('click', () => this.confirmVehicle());
    }

    selectVehicle(card) {
        document.querySelectorAll('.vehicle-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const vehicleType = card.dataset.vehicle;
        this.selectedVehicle = vehicleType;

        if (vehicleType === 'plane') {
            document.getElementById('plane-options').classList.remove('hidden');
        } else {
            document.getElementById('plane-options').classList.add('hidden');
            this.rollForVehiclePrice();
        }
    }

    selectFlightType(flightType) {
        this.selectedFlightType = flightType;
        this.rollForVehiclePrice();
    }

    rollForVehiclePrice() {
        document.getElementById('vehicle-price').classList.remove('hidden');

        // Animate dice rolling
        this.animateDiceRoll(['dice1', 'dice2'], () => {
            const dice1 = this.rollDie();
            const dice2 = this.rollDie();
            const total = dice1 + dice2;

            document.getElementById('dice1').textContent = dice1;
            document.getElementById('dice2').textContent = dice2;

            const price = this.calculateVehiclePrice(total);
            document.getElementById('vehicle-cost').textContent = price;
            this.vehiclePrice = price;
        });
    }

    calculateVehiclePrice(diceTotal) {
        let minPrice, range;

        if (this.selectedVehicle === 'car') {
            minPrice = 100;
            range = 25;
        } else if (this.selectedVehicle === 'plane') {
            if (this.selectedFlightType === 'direct') {
                minPrice = 300;
                range = 25;
            } else {
                minPrice = 200;
                range = 25;
            }
        } else { // train
            minPrice = 50;
            range = 12;
        }

        if (diceTotal <= 3) {
            return this.getRandom(minPrice, range);
        } else if (diceTotal <= 6) {
            return this.getRandom(minPrice + range, range);
        } else if (diceTotal <= 9) {
            return this.getRandom(minPrice + (2 * range), range);
        } else {
            return this.getRandom(minPrice + (3 * range), range);
        }
    }

    confirmVehicle() {
        if (!this.selectedVehicle) {
            alert('Please select a vehicle!');
            return;
        }

        if (this.selectedVehicle === 'plane' && !this.selectedFlightType) {
            alert('Please select a flight type!');
            return;
        }

        if (this.vehiclePrice > this.player.money) {
            alert('You don\'t have enough money for this vehicle!');
            return;
        }

        this.createVehicle();
        this.player.spendMoney(this.vehiclePrice);
        this.startGame();
    }

    createVehicle() {
        if (this.selectedVehicle === 'car') {
            this.vehicle = new Car();
        } else if (this.selectedVehicle === 'plane') {
            this.vehicle = new Plane(this.selectedFlightType === 'layover');
        } else {
            this.vehicle = new Train();
        }
    }

    startGame() {
        this.updateGameDisplay();
        this.showScreen('game-screen');
    }

    updateGameDisplay() {
        document.getElementById('player-name-display').textContent = this.player.name;
        document.getElementById('player-money').textContent = '$' + this.player.money;
        document.getElementById('player-morale').textContent = this.player.morale;
        document.getElementById('round-counter').textContent = this.gameState.round;

        document.getElementById('meals-display').textContent = this.player.meals;
        document.getElementById('snacks-display').textContent = this.player.snacks;
        document.getElementById('clothes-display').textContent = this.player.clothes;
        document.getElementById('toiletries-display').textContent = this.player.toiletries;

        document.getElementById('vehicle-type-display').textContent = this.vehicle.type;
        document.getElementById('distance-traveled').textContent = this.vehicle.distanceTraveled;
        document.getElementById('distance-remaining').textContent = this.vehicle.distanceLeft;

        const progress = (this.vehicle.distanceTraveled / 2170) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';

        this.updateVehicleSpecificInfo();
    }

    updateVehicleSpecificInfo() {
        const infoDiv = document.getElementById('vehicle-specific-info');
        if (this.vehicle.type === 'Car') {
            infoDiv.innerHTML = `<p>Gas Miles: ${this.vehicle.gasMiles} miles</p>`;
        } else if (this.vehicle.type === 'Plane') {
            const flightType = this.vehicle.layover ? 'Layover' : 'Direct Flight';
            infoDiv.innerHTML = `<p>Flight: ${flightType}</p>`;
        } else {
            infoDiv.innerHTML = '';
        }
    }

    startTravel() {
        this.showScreen('travel-screen');
        this.animateDiceRoll(['travel-dice1', 'travel-dice2'], () => {
            const dice1 = this.rollDie();
            const dice2 = this.rollDie();
            const total = dice1 + dice2;

            document.getElementById('travel-dice1').textContent = dice1;
            document.getElementById('travel-dice2').textContent = dice2;
            document.getElementById('dice-total').textContent = total;

            const travelDistance = this.vehicle.move(this.player, total);
            document.getElementById('travel-distance').textContent = travelDistance;

            this.showTravelEvent();
        });
    }

    showTravelEvent() {
        const eventDiv = document.getElementById('travel-event');
        const event = this.vehicle.lastEvent;

        if (event) {
            eventDiv.innerHTML = `<p><strong>${event.title}</strong></p><p>${event.description}</p>`;
            if (event.moraleChange) {
                eventDiv.innerHTML += `<p>Morale: ${event.moraleChange > 0 ? '+' : ''}${event.moraleChange}</p>`;
            }
        } else {
            eventDiv.innerHTML = '<p>Smooth sailing!</p>';
        }
    }

    continueFromTravel() {
        this.player.incrementCounter();
        this.updateGameDisplay();

        if (this.vehicle.distanceLeft <= 0) {
            this.endGame(true);
        } else if (this.player.money <= 0) {
            this.endGame(false, 'Oh no! You are bankrupt.\nUnfortunately, you did not make it down the Oregon Trail.\nPlease try again :(');
        } else {
            this.gameState.round++;
            this.showScreen('game-screen');
        }
    }

    checkSupplies() {
        alert(`Your Supplies:
Name: ${this.player.name}
Money: $${this.player.money}
Meals: ${this.player.meals} meals
Snacks: ${this.player.snacks} snacks
Clothes: ${this.player.clothes} bundles
Toiletries: ${this.player.toiletries} sets
Morale: ${this.player.morale}`);
    }

    showStore() {
        document.getElementById('store-money').textContent = this.player.money;
        this.showScreen('store-screen');
    }

    setupStoreCalculations() {
        const inputs = ['buy-meals', 'buy-snacks', 'buy-clothes', 'buy-toiletries'];
        inputs.forEach(inputId => {
            document.getElementById(inputId).addEventListener('input', () => this.calculateStoreTotal());
        });
    }

    calculateStoreTotal() {
        const meals = parseInt(document.getElementById('buy-meals').value) || 0;
        const snacks = parseInt(document.getElementById('buy-snacks').value) || 0;
        const clothes = parseInt(document.getElementById('buy-clothes').value) || 0;
        const toiletries = parseInt(document.getElementById('buy-toiletries').value) || 0;

        const total = (meals * 10) + (snacks * 20) + (clothes * 10) + (toiletries * 5);
        document.getElementById('store-total').textContent = total;
    }

    purchaseStoreItems() {
        const meals = parseInt(document.getElementById('buy-meals').value) || 0;
        const snacks = parseInt(document.getElementById('buy-snacks').value) || 0;
        const clothes = parseInt(document.getElementById('buy-clothes').value) || 0;
        const toiletries = parseInt(document.getElementById('buy-toiletries').value) || 0;

        const total = (meals * 10) + (snacks * 20) + (clothes * 10) + (toiletries * 5);

        if (total > this.player.money) {
            alert('You don\'t have enough money!');
            return;
        }

        this.player.buySupplies(meals, snacks, clothes, toiletries, total);
        this.player.incrementCounter();
        this.updateGameDisplay();
        this.showScreen('game-screen');
    }

    eatSnack() {
        this.player.eatSnack();
        this.player.incrementCounter();
        this.updateGameDisplay();
    }

    showVehicleRules() {
        const vehicleType = this.vehicle.type.toLowerCase();
        document.getElementById('modal-rules-text').textContent = this.rules[vehicleType];
        document.getElementById('rules-modal').style.display = 'block';
    }

    quitGame() {
        if (confirm('Are you sure you want to quit?')) {
            this.endGame(false, 'You have quit the game.\nGoodbye!');
        }
    }

    endGame(success, message = null) {
        this.gameState.gameOver = true;

        if (message) {
            document.getElementById('game-over-message').textContent = message;
        } else if (success) {
            document.getElementById('game-over-message').textContent = 'Congratulations! You made it to Willamette Valley!';
        }

        if (success) {
            this.calculateFinalScore();
            document.getElementById('final-score').classList.remove('hidden');
        }

        this.showScreen('game-over-screen');
    }

    calculateFinalScore() {
        const rolls = this.player.counter;
        const money = this.player.money;
        const meals = this.player.meals;
        const snacks = this.player.snacks;
        const clothes = this.player.clothes;
        const toiletries = this.player.toiletries;
        const morale = this.player.morale;

        document.getElementById('final-rolls').textContent = rolls;
        document.getElementById('final-money').textContent = money;
        document.getElementById('final-meals').textContent = meals;
        document.getElementById('final-snacks').textContent = snacks;
        document.getElementById('final-clothes').textContent = clothes;
        document.getElementById('final-toiletries').textContent = toiletries;
        document.getElementById('final-morale').textContent = morale;

        let score = 0;
        score += (10 * -rolls);
        score += money;
        score += (20 * meals);
        score += (30 * snacks);
        score += (20 * clothes);
        score += (10 * toiletries);
        score *= morale;

        document.getElementById('calculated-score').textContent = score;
    }

    resetGame() {
        this.player = null;
        this.vehicle = null;
        this.gameState = { round: 1, gameOver: false, quit: false };
        this.selectedVehicle = null;
        this.selectedFlightType = null;
        this.vehiclePrice = 0;

        // Reset all form inputs
        document.getElementById('player-name').value = '';
        document.getElementById('meals').value = '0';
        document.getElementById('snacks').value = '0';
        document.getElementById('clothes').value = '0';
        document.getElementById('toiletries').value = '0';

        this.showScreen('welcome-screen');
    }

    closeModal() {
        document.getElementById('rules-modal').style.display = 'none';
    }

    // Utility methods
    rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }

    getRandom(min, range) {
        return Math.floor(Math.random() * range) + min;
    }

    animateDiceRoll(diceIds, callback) {
        let count = 0;
        const interval = setInterval(() => {
            diceIds.forEach(id => {
                document.getElementById(id).textContent = Math.floor(Math.random() * 6) + 1;
            });
            count++;
            if (count >= 10) {
                clearInterval(interval);
                setTimeout(callback, 200);
            }
        }, 100);
    }
}

// Player class
class Player {
    constructor(name) {
        this.name = name;
        this.money = 1000;
        this.meals = 0;
        this.snacks = 0;
        this.clothes = 0;
        this.toiletries = 0;
        this.morale = 10;
        this.counter = 0;
    }

    purchaseSupplies(meals, snacks, clothes, toiletries, cost) {
        this.meals = meals;
        this.snacks = snacks;
        this.clothes = clothes;
        this.toiletries = toiletries;
        this.money -= cost;
    }

    buySupplies(meals, snacks, clothes, toiletries, cost) {
        this.meals += meals;
        this.snacks += snacks;
        this.clothes += clothes;
        this.toiletries += toiletries;
        this.money -= cost;
    }

    spendMoney(amount) {
        this.money -= amount;
    }

    incrementCounter() {
        this.counter++;

        // Check for supply depletion
        if (this.meals <= 0) {
            alert('Oh no! You are out of food. You must buy more to continue.');
            return;
        }

        if (this.clothes <= 0) {
            this.morale--;
            alert('Oh no! You are out of clean clothes. Your morale will decrease every roll until you buy more. -1 morale.');
        }

        if (this.toiletries <= 0) {
            alert('Oh no! You are out of toiletries. You must buy more to continue.');
            return;
        }

        if (this.morale < 0) {
            alert('Oh no! Your morale is negative. Remember, your morale affects your final score!');
        }

        // Consume supplies
        if (this.counter % 5 === 0) {
            this.meals--;
            this.toiletries--;
        }
        if (this.counter % 10 === 0) {
            if (this.clothes > 0) this.clothes--;
            this.morale--;
        }
    }

    eatSnack() {
        if (this.snacks <= 0) {
            alert('Oh no! You are out of snacks. -2 morale.');
            this.morale -= 2;
        } else {
            alert('You ate a snack! +5 morale.');
            this.snacks--;
            this.morale += 5;
        }
    }

    changeMorale(amount) {
        this.morale += amount;
    }

    tsa() {
        this.meals = Math.floor(this.meals / 2);
        this.snacks = Math.floor(this.snacks / 2);
        this.clothes = Math.floor(this.clothes / 2);
        this.toiletries = Math.floor(this.toiletries / 2);
    }
}

// Vehicle base class
class Vehicle {
    constructor(type) {
        this.type = type;
        this.distanceTraveled = 0;
        this.distanceLeft = 2170;
        this.multiplier = 0;
        this.lastEvent = null;
    }

    move(player, diceTotal) {
        const travelDistance = this.multiplier * diceTotal;
        const actualDistance = Math.min(travelDistance, this.distanceLeft);

        this.distanceTraveled += actualDistance;
        this.distanceLeft -= actualDistance;

        this.handleEvent(player);

        return actualDistance;
    }

    handleEvent(player) {
        const random = Math.floor(Math.random() * 100) + 1;
        this.lastEvent = this.getEvent(random, player);
    }

    getEvent(random, player) {
        // Override in subclasses
        return null;
    }
}

// Car class
class Car extends Vehicle {
    constructor() {
        super('Car');
        this.multiplier = 50;
        this.gasMiles = 1000;
    }

    getEvent(random, player) {
        if (random <= 25) {
            this.gasMiles -= 50;
            player.changeMorale(-1);
            return {
                title: 'Oh no! You hit traffic.',
                description: '-50 gas miles\n-1 morale',
                moraleChange: -1
            };
        } else if (random <= 50) {
            this.gasMiles -= 75;
            player.changeMorale(-2);
            return {
                title: 'Oh no! You got lost.',
                description: '-75 gas miles\n-2 morale',
                moraleChange: -2
            };
        } else if (random <= 60) {
            player.spendMoney(150);
            player.changeMorale(-3);
            this.gasMiles = 300;
            return {
                title: 'Oh no! You got in an accident.',
                description: 'Book a new car ($150)\nGas Miles: 300 miles\n-3 morale',
                moraleChange: -3
            };
        } else {
            player.changeMorale(1);
            return {
                title: 'Smooth sailing!',
                description: '+1 morale',
                moraleChange: 1
            };
        }
    }

    move(player, diceTotal) {
        const travelDistance = this.multiplier * diceTotal;
        const gasLimitedDistance = Math.min(travelDistance, this.gasMiles);
        const actualDistance = Math.min(gasLimitedDistance, this.distanceLeft);

        this.distanceTraveled += actualDistance;
        this.distanceLeft -= actualDistance;
        this.gasMiles -= actualDistance;

        this.handleEvent(player);

        if (this.gasMiles <= 0) {
            alert('Oh no! You are out of gas. You need to visit the gas station.');
        }

        return actualDistance;
    }
}

// Plane class
class Plane extends Vehicle {
    constructor(layover) {
        super('Plane');
        this.multiplier = 75;
        this.layover = layover;
        this.toLayover = layover ? 1085 : -1;
        this.tsaPassed = false;
    }

    move(player, diceTotal) {
        if (!this.tsaPassed) {
            this.handleTSA(player);
        }

        const travelDistance = this.multiplier * diceTotal;
        let actualDistance = travelDistance;

        if (this.layover && this.toLayover > 0 && travelDistance > this.toLayover) {
            actualDistance = this.toLayover;
        }

        actualDistance = Math.min(actualDistance, this.distanceLeft);

        this.distanceTraveled += actualDistance;
        this.distanceLeft -= actualDistance;

        if (this.layover) {
            this.toLayover -= actualDistance;
        }

        this.handleEvent(player);

        if (this.toLayover === 0) {
            this.handleLayover(player);
        }

        return actualDistance;
    }

    handleTSA(player) {
        const dice = Math.floor(Math.random() * 6) + 1;
        if (dice % 2 === 0) {
            player.changeMorale(1);
            alert('You made it through TSA safely! +1 morale.');
        } else {
            player.tsa();
            player.changeMorale(-1);
            alert('Sorry. You lost half of your supplies. -1 morale.');
        }
        this.tsaPassed = true;
    }

    handleLayover(player) {
        const dice = Math.floor(Math.random() * 6) + 1;
        if (dice % 2 === 0) {
            player.changeMorale(3);
            alert('You made your connection! +3 morale.');
        } else {
            player.spendMoney(150);
            player.changeMorale(-3);
            alert('Sorry. You missed your connection. -3 morale.\nYou\'ve rebooked your flight! -$150.');
        }
        this.toLayover = -1;
    }

    getEvent(random, player) {
        if (random <= 25) {
            player.changeMorale(-1);
            return {
                title: 'Oh no! You hit turbulence.',
                description: '-1 morale',
                moraleChange: -1
            };
        } else if (random <= 75) {
            player.changeMorale(1);
            return {
                title: 'Smooth sailing!',
                description: '+1 morale',
                moraleChange: 1
            };
        } else {
            player.spendMoney(150);
            player.changeMorale(-3);
            return {
                title: 'Oh no! Your flight was grounded.',
                description: 'Book a new flight ($150)\n-3 morale',
                moraleChange: -3
            };
        }
    }
}

// Train class
class Train extends Vehicle {
    constructor() {
        super('Train');
        this.multiplier = 25;
    }

    getEvent(random, player) {
        if (random <= 25) {
            player.changeMorale(-2);
            return {
                title: 'Oh no! The train had to stop.',
                description: '-2 morale',
                moraleChange: -2
            };
        } else if (random <= 50) {
            return {
                title: 'Time to transfer lines!',
                description: 'You need to transfer to another train line.',
                moraleChange: 0
            };
        } else {
            player.changeMorale(1);
            return {
                title: 'Smooth sailing!',
                description: '+1 morale',
                moraleChange: 1
            };
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new OregonTrailGame();
});
