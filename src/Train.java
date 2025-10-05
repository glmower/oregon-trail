import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Train extends Vehicle {
    Train() {
        this.vehicleType = "Train";
        this.distanceTraveled = 0;
        this.distanceLeft = 2170;
        this.multiplier = 25;
    }

    void move(Player player) throws FileNotFoundException {
        System.out.println("Roll to travel!");
        int dice = rollDice();
        int travel  = multiplier * dice;

        printVehicle();
        problem(player);

        if (travel > this.distanceLeft) { travel = this.distanceLeft; }
        this.distanceTraveled += travel;
        this.distanceLeft -= travel;

        System.out.printf("\nYou traveled %d miles.\n", travel);
    }

    void printVehicle() throws FileNotFoundException {
        Scanner trainPrinter = new Scanner(new File("train.txt"));
        while (trainPrinter.hasNextLine()) {
            System.out.println(trainPrinter.nextLine());
        }
        trainPrinter.close();
    }

    void problem(Player player) {
        int num = getRandom(1, 100);

        if (num <= 25) {
            System.out.println("Oh no! The train had to stop.\n"
                                + "-2 morale\n");
            player.changeMorale(-2);
            player.incCounter();
        }
        else if (num <= 50) {
            System.out.println("Time to transfer lines!\n");
            player.incCounter();
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

    void printDetails() {}

    void vehicleRules() throws FileNotFoundException {
        Scanner rulesPrinter = new Scanner(new File("train_rules.txt"));
        while (rulesPrinter.hasNextLine()) {
            System.out.println(rulesPrinter.nextLine());
        }
        rulesPrinter.close();
    }
}