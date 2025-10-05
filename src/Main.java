import java.util.*;
import java.io.*;

public class Main extends Controller {
    public static final Scanner scnr = new Scanner(System.in);

    public static void main(String args[]) throws FileNotFoundException {
        System.out.println("Welcome to the Oregon Trail!\n"
                            + "You must travel 2170 miles from Indpendence, Missouri to Willamette Valley\n"
                            + "Choose an option below to get started.\n");

        startMenu();

        System.out.print("Enter your name : ");
        String name = scnr.next();
        Player player = new Player(name);
        Vehicle vehicle = startGame(player);

        boolean done = false;
        boolean quit = false;
        int round = 1;

        while (!done) {
            printDivider();

            if (player.getMoney() <= 0) {
                System.out.println("Oh no! You are bankrupt.\n"
                                    + "Unfortunately, you did not make it down the Oregon Trail.\n"
                                    + "Please try again :(");
                quit = true;
                break;
            }

            System.out.println("Play Round?\n"
                                + "1. Play\n"
                                + "2. Quit\n");
            System.out.print("Your Choice : ");
            int choice = getInt(1, 2);
            if (choice == 2) {
                quit = true;
                System.out.println("Quitting...");
                System.out.println("Goodbye");
                break;
            }

            printDivider();
            System.out.println("STARTING ROUND : " + round);
            done = vehicle.playRound(player);
            if (vehicle.getMiles() == 2170) { done = true; }
        }

        if (!quit) {
            printDivider();
            System.out.println("Game over! Time to calculate your score.");
            printDivider();
            printScore(player);
            printDivider();
            System.out.println("Thank you for playing!");
        }
    }

    public static void startMenu() throws FileNotFoundException {
        boolean started = false;

        while (!started) {
            System.out.println("1. Start Game\n"
                            + "2. View Rules\n");
            System.out.print("Your Choice : ");
            int choice = getInt(1, 2);

            switch (choice) {
                case 1:
                    System.out.println("\nStarting a new game...\n");
                    started = true;
                    break;
                case 2:
                    System.out.println("\nPrinting rules...\n");
                    printRules();
                    break;
            }
        }
    }

    public static Vehicle startGame(Player player) {
        Vehicle vehicle;
        int minPrice = 0;
        int priceRange = 25;

        System.out.println("Choose a vehicle.");
        System.out.println("1. Car ($100 - $200)\n"
                            + "2. Plane ($200 - $400)\n"
                            + "3. Train ($50 - $100)\n");
        
        System.out.print("Your Choice : ");
        int choice = getInt(1, 3);

        if (choice == 1) {
            vehicle = new Car();
            minPrice = 100;
        }
        else if (choice == 2) {
            boolean layover = false;
            minPrice = 300;
            System.out.println("\nChoose a flight.");
            System.out.println("1. Direct Flight ($300 - $400)\n"
                            + "2. Layover ($200 - $300)\n");

            System.out.print("Your Choice : ");
            int layoverChoice = getInt(1, 2);
            if (layoverChoice == 2) {
                layover = true;
                minPrice = 200;
            }
            vehicle = new Plane(layover);
        }
        else {
            vehicle = new Train();
            minPrice = 50;
            priceRange = 12;
        }
        
        System.out.println("\nRoll for vehicle cost. Higher rolls land you in a higher price range.");
        System.out.println("Total Cost : $" + vehicle.getVehiclePrice(minPrice, priceRange, player));
        System.out.println("\nCreating your vehicle...");
        printDivider();
        vehicle.printStatus(player);
        vehicle.printDetails();
        printDivider();

        return vehicle;
    }

    public static void printRules() throws FileNotFoundException {
        Scanner rules = new Scanner(new File("rules.txt"));
        while (rules.hasNextLine()) {
            System.out.println(rules.nextLine());
        }
        rules.close();
        enterKey();
    }

    public static void printScore(Player player) {
        int numRolls = player.counter;
        int playerMoney = player.getMoney();
        int playerMeals = player.getMeals();
        int playerSnacks = player.getSnacks();
        int playerClothes = player.getClothes();
        int playerToiletries = player.getToiletries();
        int playerMorale = player.getMorale();

        System.out.printf("Number of Rolls : %d\n", numRolls);
        System.out.printf("Money Left      : $%d\n",playerMoney);
        System.out.printf("Meals Left      : %d\n", playerMeals);
        System.out.printf("Snacks Left     : %d\n", playerSnacks);
        System.out.printf("Cothes Left     : %d\n", playerClothes);
        System.out.printf("Toiletries Left : %d\n", playerToiletries);
        System.out.printf("Morale          : %d\n", playerMorale);

        int score = 0;
        score += (10 * -numRolls);
        score += (playerMoney);
        score += (20 * playerMeals);
        score += (30 * playerSnacks);
        score += (20 * playerClothes);
        score += (10 * playerToiletries);
        score *= playerMorale;

        printDivider();
        System.out.println("Press ENTER to reveal your score!");
        enterKey();
        
        System.out.printf("YOUR SCORE : %d!", score);
    }
}