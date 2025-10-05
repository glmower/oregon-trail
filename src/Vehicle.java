import java.util.*;
import java.io.*;

public abstract class Vehicle extends Controller {
    protected String vehicleType;
    protected int distanceTraveled;
    protected int distanceLeft;
    protected int multiplier;

    protected final Scanner scnr = new Scanner(System.in);

    public boolean playRound(Player player) throws FileNotFoundException {
        boolean roundOver = false;

        while (!roundOver) {
            printDivider();
            printMenu(player);
            System.out.print("Your Choice : ");
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
                    player.eatSnack();
                    player.incCounter();
                    roundOver = true;
                    break;
                case 6:
                    vehicleRules();
                    break;
            }
        }

        if (this.distanceLeft == 0) { return true; }
        return false;
    }

    public void printMenu(Player player) {
        System.out.println("Roll Counter : " + player.counter);
        System.out.println("Choose an option below and press ENTER:\n"
                            + "1. Travel\n"
                            + "2. View player details\n"
                            + "3. Check supplies\n"
                            + "4. Buy supplies\n"
                            + "5. Eat snack\n"
                            + "6. View vehicle-specific rules\n");
    }

    public void printStatus(Player player) {
        System.out.println("Player Details");
        System.out.println();
        System.out.printf("Name               : %s\n", player.name);
        System.out.printf("Vehicle            : %s\n", this.vehicleType);
        System.out.printf("Money              : $%d\n", player.getMoney());
        System.out.printf("Distance Traveled  : %s miles\n", this.distanceTraveled);
        System.out.printf("Distance Remaining : %s miles\n", this.distanceLeft);
    }

    public int getMiles() {
        return this.distanceTraveled;
    }

    public int getVehiclePrice(int min, int range, Player player) {
        int price = 0;
        int dice = rollDice();

        if (dice <= 3) {
            price = getRandom(min, range);
        }
        else if (dice <= 6) {
            price = getRandom(min + range, range);
        }
        else if (dice <= 9) {
            price = getRandom(min + (2 * range), range);
        }
        else {
            price = getRandom(min + (3 * range), range);
        }

        player.spendMoney(price);
        return price;
    }

    abstract void move(Player player) throws FileNotFoundException;
    abstract void printVehicle() throws FileNotFoundException;
    abstract void problem(Player player);
    abstract void printDetails();
    abstract void vehicleRules() throws FileNotFoundException;
}