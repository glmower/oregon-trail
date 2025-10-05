public class Player extends Controller {
    public String name;
    public int counter;
    private int money;
    private int meals;
    private int snacks;
    private int clothes;
    private int toiletries;
    private int morale;

    Player(String name) {
        this.name = name;
        this.counter = 0;
        this.money = 1000;
        int spent = 0;

        System.out.println("\nBefore you leave, you need to pack.\n"
                            + "You can buy supplies during your trip, but this will cost you extra rolls.\n"
                            + "Try and buy what you'll need now, but don't overspend!\n"
                            + "This will affect your score at the end of the game.\n");
        
                            System.out.println("You need meals to sustain yourself. You will eat 1 meal per 5 rolls. They are $10 per meal.");
        System.out.print("Choose how many meals you would like to buy : ");
        this.meals = getInt();
        spent += (10 * this.meals);

        System.out.println("\nSnacks are not required! However, they will increase your morale by 5 points. They are $20 per snack.");
        System.out.print("Choose how many snacks you would like to buy : ");
        this.snacks = getInt();
        spent += (20 * this.snacks);

        System.out.println("\nClean clothes are important! If you run out of clothes, you will not be reqired to buy more.\n"
                            + "However, if you don't, you will begin losing morale rapidly. You will go through 1 bundle per 10 rolls. They are $10 per bundle.");
        System.out.print("Choose how many bundles you would like to buy : ");
        this.clothes = getInt();
        spent += (10 * this.clothes);

        System.out.println("\nYou need toiletries to take care of yourself. You go through 1 set per 5 rolls. They are $5 per set.");
        System.out.print("Choose how many sets you would like to buy : ");
        this.toiletries = getInt();
        spent += (5 * this.toiletries);

        this.morale = 10;

        spendMoney(spent);

        printDivider();
    }

    public void incCounter() {
        this.counter++;

        if (this.meals == 0) {
            System.out.println("\nOh no! You are out of food. You must buy more to continue.");
            buySupplies(1);
        }

        if (this.clothes == 0) {
            morale--;
            System.out.println("\nOh no! You are out of clean clothes. Your morale will decrease every roll until you buy more. -1 morale.");
        }

        if (this.toiletries == 0) {
            System.out.println("\nOh no! You are out of toiletries. You must buy more to continue.");
            buySupplies(4);
        }

        if (this.morale < 0) {
            System.out.println("\nOh no! Your morale is negative. Remember, your morale affects your final score!");
        }

        if (this.counter % 5 == 0) {
            this.meals--;
            this.toiletries--;
        }
        if (this.counter % 10 == 0) {
            if (this.clothes > 0) { this.clothes--; }
            this.morale--;
        }

        System.out.println("\n+1 Roll\n");
    }

    public void checkSupplies() {
        System.out.println("Your Supplies");
        System.out.println();
        System.out.printf("Name       : %s\n", this.name);
        System.out.printf("Money      : $%d\n", this.money);
        System.out.printf("Meals      : %d meals\n", this.meals);
        System.out.printf("Snacks     : %s snacks\n", this.snacks);
        System.out.printf("Clothes    : %s bundles\n", this.clothes);
        System.out.printf("Toiletries : %s sets\n", this.toiletries);
        System.out.printf("Morale     : %s\n", this.morale);
        printDivider();
    }

    public void storeMenu() {
        boolean done = false;
        int choice = 0;
        
        while (!done) {
            System.out.println("\nYou Have : $" + this.money);
            System.out.println("Choose an option below and press ENTER:\n"
                                + "1. Meals\n"
                                + "2. Snacks\n"
                                + "3. Clothes\n"
                                + "4. Toiletries\n"
                                + "5. Done\n");
            
            System.out.print("Your Choice : ");
            choice = getInt(1, 5);
            if (choice == 5) { done = true; }
            buySupplies(choice);
        }
    }

    public void buySupplies(int choice) {
        int supply = 0;

        switch (choice) {
            case 1:
                System.out.println("Meals are $10 per meal.");
                System.out.print("Choose how many meals you would like to buy : ");
                supply = getInt();
                this.meals -= supply;
                spendMoney(10 * supply);
                break;
            case 2:
                System.out.println("Snacks are $20 per snack.");
                System.out.print("Choose how many snacks you would like to buy : ");
                supply = getInt();
                this.snacks -= supply;
                spendMoney(20 * supply);
                break;
            case 3:
                System.out.println("Clothes are $10 per bundle.");
                System.out.print("Choose how many bundles you would like to buy : ");
                supply = getInt();
                this.clothes -= supply;
                spendMoney(10 * supply);
                break;
            case 4:
                System.out.println("Toiletries are $5 per set.");
                System.out.print("Choose how many sets you would like to buy : ");
                supply = getInt();
                this.toiletries -= supply;
                spendMoney(5 * supply);
                break;
        }
    }

    public void eatSnack() {
        if (this.snacks == 0) {
            System.out.println("Oh no! You are out of snacks. -2 morale.");
            this.morale -= 2;
        }
        else {
            System.out.println("You ate a snack! +5 morale.");
            this.snacks--;
            this.morale += 5;
        }
    }

    public void tsa() {
        this.meals /= 2;
        this.snacks /= 2;
        this.clothes /= 2;
        this.toiletries /= 2;
    }

    public void spendMoney(int mon) {
        this.money -= mon;
    }

    public int getMoney() {
        return this.money;
    }

    public int getMeals() {
        return this.meals;
    }

    public int getSnacks() {
        return this.snacks;
    }

    public int getClothes() {
        return this.clothes;
    }

    public int getToiletries() {
        return this.toiletries;
    }

    public int getMorale() {
        return this.morale;
    }

    public void changeMorale(int num) {
        this.morale += num;
    }
}
