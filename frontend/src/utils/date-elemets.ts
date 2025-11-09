export type DateStrVal = {
    txt: string,
    val: string
}

export class DateElements {

    public static elementToDate(element: string): Date | null {
        const parts: string[] = element.split("-");
        if (parts.length == 2) {
            let dt = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            return dt;
        } else return null;
    }

    public static dateToValText(dt: Date): DateStrVal {
        let result: DateStrVal = {val: '', txt: ''}
        result.txt = dt.toLocaleDateString('ru-RU');
        const parts = result.txt.split(".");
        result.val = parts[2] + '-' + parts[1] + '-' + parts[0];
        return result;
    }

    public static current_date_rus(): string | null {
        let sd:string= (new Date()).toLocaleDateString('ru-RU');
        const parts: string[] = sd.split(".");
        let result: string | null = null;
        if (parts.length == 3) {
            result = parts[2] + '-' + parts[1] + '-' + parts[0];
            return result;
        } else return null;
    }

    public static current_week_iso(): string | null {
        let dt: Date = new Date();
        const wd: number = dt.getDay() - 1;
        if (wd !== 0) {
            dt.setDate(dt.getDate() - wd);
        }
        const value: string = dt.toLocaleDateString('ru-RU');
        const parts: string[] = value.split(".");
        let result: string | null = null;
        if (parts.length == 2) {
            result = parts[2] + '-' + parts[1] + '-' + parts[0];
        }
        return result;
    }


    public static current_date_iso(): string | null {
        let dt: Date = new Date();
        const value: string = dt.toLocaleDateString('ru-RU');
        const parts: string[] = value.split(".");
        let result: string | null = null;
        if (parts.length == 2) {
            result = parts[2] + '-' + parts[1] + '-' + parts[0];
        }
        return result;
    }


    public static current_mes_iso(): string | null {
        let dt: Date = new Date();
        const value: string = dt.toLocaleDateString('ru-RU');
        const parts: string[] = value.split(".");
        let result: string | null = null;
        if (parts.length == 2) {
            result = parts[2] + '-' + parts[1] + '-01';
        }
        return result;
    }

    public static current_year_iso(): string | null {
        let dt: Date = new Date();
        const value: string = dt.toLocaleDateString('ru-RU');
        const parts: string[] = value.split(".");
        let result: string | null = null;
        if (parts.length == 2) {
            result = parts[2] + '-01-01';
        }
        return result;
    }

    public static stringRusdtTovalDt(value: string): string | null {
        const parts: string[] = value.split(".");
        let result: string | null = null;
        if (parts.length == 2) {
            result = parts[2] + '-' + parts[1] + '-' + parts[0];
        }
        return result;
    }

    public static dtStrToString(dt: string): string | null {
        const parts: string[] = dt.split("-");
        let result: string | null = null;
        if (parts.length == 2) {
            result = parts[2] + '.' + parts[1] + '.' + parts[0];
        }
        return result;
    }

}