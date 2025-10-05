import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Plane extends Vehicle {
    private boolean layover;
    private int toLayover;

    Plane(boolean layover) {
        this.vehicleType = "Plane";
        this.distanceTraveled = 0;
        this.distanceLeft = 2170;
        this.multiplier = 75;
        this.layover = layover;
        if (layover) { this.toLayover = 1085; }
        else { this.toLayover = -1; }
    }

    void move(Player player) throws FileNotFoundException {
        if (player.counter == 0) {
            tsa(player);
        }

        System.out.println("Roll to travel!");
        int dice = rollDice();
        int travel  = multiplier * dice;

        printVehicle();
        problem(player);

        if (layover && travel > toLayover && toLayover >= 0) { travel = toLayover; }
        if (travel > this.distanceLeft) { travel = this.distanceLeft; }

        this.distanceTraveled += travel;
        this.distanceLeft -= travel;
        if (layover) { this.toLayover -= travel; }

        System.out.printf("\nYou traveled %d miles.\n", travel);

        if (toLayover == 0) {
            layover(player);
        }
    }

    void printVehicle() throws FileNotFoundException {
        Scanner planePrinter = new Scanner(new File("plane.txt"));
        while (planePrinter.hasNextLine()) {
            System.out.println(planePrinter.nextLine());
        }
        planePrinter.close();
    }

    void problem(Player player) {
        int num = getRandom(1, 100);

        if (num <= 25) {
            System.out.println("Oh no! You hit turbulence.\n"
                                + "-1 morale\n");
            player.changeMorale(-1);
            player.incCounter();
        }
        else if (num <= 75) {
            System.out.println("Smooth sailing!\n"
                                + "+1 morale\n");
            player.changeMorale(1);
        }
        else if (num <= 100) {
            System.out.println("Oh no! Your flight was grounded.\n"
                                + "Book a new flight ($150)\n"
                                + "-3 morale\n");
            player.spendMoney(150);
            player.changeMorale(-3);
            player.incCounter();
        }

        System.out.println("Press ENTER to continue.");
        enterKey();
    }

    void tsa(Player player) {
        System.out.println("Roll to go through TSA!\n"
                            + "If you roll an even number, you will make it through with no issues.\n"
                            + "If you roll an odd number, you will lose half of your supplies.\n");
        int dice = rollDice();

        if (dice % 2 == 0) {
            System.out.println("You made it through TSA safely! +1 morale.");
            player.changeMorale(1);
        }
        else {
            System.out.println("Sorry. You lost half of your supplies. -1 morale.");
            player.tsa();
            player.changeMorale(-1);
        }

        player.incCounter();
    }

    void layover(Player player) {
        System.out.println("Roll for your connecting flight!\n"
                            + "If you roll an even number, you will make your connection.\n"
                            + "If you roll an odd number, you will miss your connection and have to rebook.\n");
        int dice = rollDice();

        if (dice % 2 == 0) {
            System.out.println("You made your connection! +3 morale.");
            player.changeMorale(3);
        }
        else {
            System.out.println("Sorry. You missed your connection. -3 morale.");
            System.out.println("You've rebooked your flight! -$150.");
            player.spendMoney(150);
            player.changeMorale(-3);
        }

        this.toLayover = -1;
        player.incCounter();
    }

    void printDetails() {
        if (this.layover) { System.out.printf("Flight             : Layover\n"); }
        if (!this.layover) { System.out.printf("Flight             : Direct Flight\n"); }
    }

    void vehicleRules() throws FileNotFoundException {
        Scanner rulesPrinter = new Scanner(new File("plane_rules.txt"));
        while (rulesPrinter.hasNextLine()) {
            System.out.println(rulesPrinter.nextLine());
        }
        rulesPrinter.close();
    }
}