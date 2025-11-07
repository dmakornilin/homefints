export class SystemUtils{
    public static clearArray(array:[]):void {
        while (array.length > 0) {
            array.pop();
        }
    }
}