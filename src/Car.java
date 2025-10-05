import java.util.*;
import java.io.*;


public class Car extends Vehicle {
    private int gasMiles;

    Car() {
        this.vehicleType = "Car";
        this.distanceTraveled = 0;
        this.distanceLeft = 2170;
        this.gasMiles = 1000;
        this.multiplier = 50;
    }

    public boolean playRound(Player player) throws FileNotFoundException {
        boolean roundOver = false;

        while (!roundOver) {
            printDivider();
            printMenu();
            int choice = getInt(1, 6);
            printDivider();

            switch (choice) {
                case 1:
                    move(player);
                    player.incCounter();
                    roundOver = true;
                    break;
                case 2:
                    printStatus(player);
                    printDetails();
                    break;
                case 3:
                    player.checkSupplies();
                    break;
                case 4:
                    player.storeMenu();
                    player.incCounter();
                    roundOver = true;
                    break;
                case 5:
                    fillGas(false, player);
                    roundOver = true;
                    break;
                case 6:
                    player.eatSnack();
                    player.incCounter();
                    roundOver = true;
                    break;
                case 7:
                    vehicleRules();
                    break;
            }
        }

        if (this.distanceLeft == 0) { return true; }
        return false;
    }

    public void printMenu() {
        System.out.println("Choose an option below and press ENTER:\n"
                            + "1. Travel\n"
                            + "2. View player details\n"
                            + "3. Check supplies\n"
                            + "4. Buy supplies\n"
                            + "5. Fill gas\n"
                            + "6. Eat snack\n"
                            + "7. View vehicle-specific rules\n");
    }

    void move(Player player) throws FileNotFoundException {
        System.out.println("Roll to travel!");
        int dice = rollDice();
        int travel  = multiplier * dice;

        printVehicle();
        problem(player);

        if (travel > this.gasMiles) { travel = this.gasMiles; }
        if (travel > this.distanceLeft) { travel = this.distanceLeft; }
        this.distanceTraveled += travel;
        this.distanceLeft -= travel;
        this.gasMiles -= travel;

        checkGas(player, 0);

        System.out.printf("\nYou traveled %d miles.\n", travel);
    }

    void printVehicle() throws FileNotFoundException {
        Scanner carPrinter = new Scanner(new File("car.txt"));
        while (carPrinter.hasNextLine()) {
            System.out.println(carPrinter.nextLine());
        }
        carPrinter.close();
    }

    void problem(Player player) {
        int num = getRandom(1, 100);

        if (num <= 25) {
            System.out.println("Oh no! You hit traffic.\n"
                                + "-50 gas miles\n"
                                + "-1 morale\n");
            this.gasMiles -= 50;
            player.changeMorale(-1);
            checkGas(player, 50);
            player.incCounter();
        }
        else if (num <= 50) {
            System.out.println("Oh no! You got lost.\n"
                                + "-75 gas miles\n"
                                + "-2 morale\n");
            this.gasMiles -= 75;
            player.changeMorale(-2);
            checkGas(player, 75);
            player.incCounter();
            player.incCounter();
        }
        else if (num <= 60) {
            System.out.println("Oh no! You got in an accident.\n"
                                + "Book a new car ($150)\n"
                                + "Gas Miles : 300 miles\n"
                                + "-3 morale\n");
            player.spendMoney(150);
            player.changeMorale(-3);
            this.gasMiles = 300;
            player.incCounter();
        }
        else {
            System.out.println("Smooth sailing!\n"
                                + "+1 morale\n");
            player.changeMorale(1);
        }

        System.out.println("Press ENTER to continue.");
        enterKey();
    }

    void printDetails() {
        System.out.printf("Gas Miles          : %s miles\n", this.gasMiles);
    }

    void checkGas(Player player, int num) {
        if (this.gasMiles <= num) {
            System.out.println("Oh no! You are out of gas. Call the gas station for a gas delivery.");
            enterKey();
            fillGas(true, player);
        }
    }

    void fillGas(boolean service, Player player) {
        int rate = 0;
        int gal = 0;
        int total = 0;
        int fee = 0;
        boolean good = false;

        System.out.println("Welcome to the gas station!\n"
                            + "Roll for your gas price.");
        rate = rollDie();

        System.out.printf("Your gas rate : $%d\n\n", rate);
        System.out.println("How many gallons would you like to buy?\n"
                            + "Your car can drive 30 miles per gallon.\n");
        System.out.print("Gallons : ");
        gal = getInt();

        if (service) {
            System.out.println("Additional service fee : $25");
            fee = 25;
        }
        
        while (!good) {
            total = (gal * rate) + fee;
            if (total < player.getMoney()) {
                good = true;
            }
            else {
                System.out.println("\nYou do not have enough money. Please try again.");
                System.out.print("Gallons : ");
                gal = getInt();
            }
        }

        this.gasMiles += (30 * gal);

        System.out.println("\nThank you for coming to the gas station!");
        System.out.printf("Your total bill : $%d\n", total);
        System.out.println("Please come again!");

        player.incCounter();
    }

    void vehicleRules() throws FileNotFoundException {
        Scanner rulesPrinter = new Scanner(new File("car_rules.txt"));
        while (rulesPrinter.hasNextLine()) {
            System.out.println(rulesPrinter.nextLine());
        }
        rulesPrinter.close();
    }
}