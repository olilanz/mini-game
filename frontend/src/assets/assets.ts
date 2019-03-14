import __imageTitle from './images/title.png';
import __imageFullscreen from './images/button_fullscreen.png';
import __imageWindowed from './images/button_windowed.png';
import __musicTheme from './music/theme.mp3';
import __soundBlop from './sounds/blop.mp3';

export type Asset = {
    kind: string;
    url: string;
};

export class Assets extends Map<string, Asset> {
    public static readonly IMAGE_TITLE: string = "imageTitle";
    public static readonly IMAGE_BTN_FULLSCREEN: string = "imageBtnFullscreen";
    public static readonly IMAGE_BTN_WINDOWED: string = "imageBtnWindowed";
    public static readonly MUSIC_THEME: string = "musicTheme";
    public static readonly SOUND_BLOP: string = "soundBlop";

    private static readonly __instance: Assets = new Assets();

    private constructor() {
        super();

        this.set(Assets.IMAGE_TITLE, { kind: "image", url: __imageTitle });
        this.set(Assets.IMAGE_BTN_FULLSCREEN, { kind: "image", url: __imageFullscreen });
        this.set(Assets.IMAGE_BTN_WINDOWED, { kind: "image", url: __imageWindowed });
        this.set(Assets.MUSIC_THEME, { kind: "music", url: __musicTheme });
        this.set(Assets.SOUND_BLOP, { kind: "sound", url: __soundBlop });
    }

    static getInstance() : Assets {
        return new Assets();
    }
}