export class NumberUtils {
    public static numberToStringWithThDiv(rr:number):string {
        return  String(rr).replace(/(\d)(?=(?:\d\d\d)+$)/g, "$1 ");
    }
}
