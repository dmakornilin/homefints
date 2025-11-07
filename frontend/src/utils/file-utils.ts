import type {LinkElementSrc} from "../types/html-service.types/element-src.type";

export class FileUtils {

    public static LoadPageScript(src:string) {
        return new Promise((resolve, reject) => {
            const script:any = document.createElement('script');
            script.src = src;
            script.onload = () =>  resolve('Script loaded: ' + src);
            script.onerror = () =>  reject(new Error(`Script error: ${src}`));
            document.body.appendChild(script);
        });
    }

    static LoadPageStyle(src:string,insertBeforeElement:HTMLElement) {
        return new Promise((resolve, reject) => {
            const style:HTMLLinkElement = (document.createElement('link') as LinkElementSrc);
            style.rel = 'stylesheet';
            style.type="text/css";
            style.href =  src;
            style.onload = () =>  resolve('Stily loaded: ' + src);
            style.onerror = () =>  reject(new Error(`Style load error: ${src}`));
             document.head.insertBefore(style, insertBeforeElement);
        });
    }

    // static convertFileToBase64(file) {
    //     return new Promise((resolve, reject) => {
    //         const reader:FileReader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onloadend = () =>  resolve(reader.result);
    //         reader.onerror = () =>  reject(new Error(`Can not convert this file: ${file}`));
    //     });
    // }
}


