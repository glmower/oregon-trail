import java.util.*;

public class Controller {
    public static final Scanner controllerScanner = new Scanner(System.in);
    
    public static int getInt(int low, int high) {
        boolean good = false;
        int num = 0;

        while (!good) {
            try {
                num = controllerScanner.nextInt();

                while (num < low || num > high) {
                    System.out.print("Invalid option. Please choose again : ");
                    num = controllerScanner.nextInt();
                    System.out.println();
                }

                good = true;
            }
            catch (InputMismatchException e) {
                System.out.print("Please enter a valid integer : ");
                controllerScanner.next();
            }
        }

        return num;
    }

    public static int getInt() {
        boolean good = false;
        int num = 0;

        while (!good) {
            try {
                num = controllerScanner.nextInt();
                good = true;
            }
            catch (InputMismatchException e) {
                System.out.print("Please enter a valid integer : ");
                controllerScanner.next();
            }
        }

        return num;
    }

    public static void enterKey() throws NoSuchElementException {
        Scanner s = new Scanner(System.in);
        s.nextLine();
    }

    public static void printDivider() {
        // System.out.printf("\n--------------------------------------------------\n\n");
        System.out.printf("\n==================================================\n\n");
    }

    public static int rollDice() {
        System.out.println("Press ENTER to roll.");
        enterKey();
        System.out.println("\nRolling...");
        int die_1 = (int)((Math.random() * 6) + 1);
        int die_2 = (int)((Math.random() * 6) + 1);
        System.out.printf("You rolled : %d and %d\n", die_1, die_2);
        enterKey();
        return die_1 + die_2;
    }

    public static int rollDie() {
        System.out.println("Press ENTER to roll.");
        enterKey();
        System.out.println("\nRolling...");
        int die = (int)((Math.random() * 6) + 1);
        System.out.printf("You rolled : %d\n", die);
        enterKey();
        return die;
    }

    public static int getRandom(int min, int range) {
        int num = (int)((Math.random() * range) + min);
        return num;
    }
}
