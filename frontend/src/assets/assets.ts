import __imageTitle from './images/title.png';
import __imageBackground from './images/background.png';
import __imageFloorDirt from './images/floor_dirt.png';
import __imageCookie from './images/cookie.png';
import __imageBtnFullscreen from './images/button_fullscreen.png';
import __imageBtnWindowed from './images/button_windowed.png';
import __imageBtnLeft from './images/button_left.png';
import __imageBtnMenu from './images/button_menu.png';
import __imageBtnMenuLevel from './images/button_menu_level.png';
import __imageBtnRight from './images/button_right.png';
import __imageBtnRetry from './images/button_retry.png';
import __imageBtnPause from './images/button_pause.png';

import __atlasSpineBoy from './spine/spineboy.atlas'
import __skeletonSpineBoy from './spine/spineboy.skeleton'

export type Asset = {
    kind: string;
    url: string;
    url2?: string;
    url3?: string;
};

export class Assets extends Map<string, Asset> {

    public static readonly IMAGE_TITLE: string = "imageTitle";
    public static readonly IMAGE_BACKGROUND: string = "imageBackground";
    public static readonly IMAGE_FLOOR_DIRT: string = "imageFloorDirt";
    public static readonly IMAGE_COOKIE: string = "imageCookie";
    public static readonly IMAGE_BTN_FULLSCREEN: string = "imageBtnFullscreen";
    public static readonly IMAGE_BTN_WINDOWED: string = "imageBtnWindowed";
    public static readonly IMAGE_BTN_LEFT: string = "imageBtnLeft";
    public static readonly IMAGE_BTN_MENU: string = "imageBtnMenu";
    public static readonly IMAGE_BTN_MENU_LEVEL: string = "imageBtnMenuLevel";
    public static readonly IMAGE_BTN_RIGHT: string = "imageBtnRight";
    public static readonly IMAGE_BTN_RETRY: string = "imageBtnRetry";
    public static readonly IMAGE_BTN_PAUSE: string = "imageBtnPause";

    public static readonly SPINE_BOY: string = "spineSpineBoy";

    private constructor() {
        super();

        this.set(Assets.IMAGE_TITLE, { kind: "image", url: __imageTitle });
        this.set(Assets.IMAGE_BACKGROUND, { kind: "image", url: __imageBackground });
        this.set(Assets.IMAGE_FLOOR_DIRT, { kind: "image", url: __imageFloorDirt });
        this.set(Assets.IMAGE_COOKIE, { kind: "image", url: __imageCookie });
        this.set(Assets.IMAGE_BTN_FULLSCREEN, { kind: "image", url: __imageBtnFullscreen });
        this.set(Assets.IMAGE_BTN_WINDOWED, { kind: "image", url: __imageBtnWindowed });
        this.set(Assets.IMAGE_BTN_LEFT, { kind: "image", url: __imageBtnLeft });
        this.set(Assets.IMAGE_BTN_MENU, { kind: "image", url: __imageBtnMenu });
        this.set(Assets.IMAGE_BTN_MENU_LEVEL, { kind: "image", url: __imageBtnMenuLevel });
        this.set(Assets.IMAGE_BTN_RIGHT, { kind: "image", url: __imageBtnRight });
        this.set(Assets.IMAGE_BTN_RETRY, { kind: "image", url: __imageBtnRetry });
        this.set(Assets.IMAGE_BTN_PAUSE, { kind: "image", url: __imageBtnPause });

        this.set(Assets.SPINE_BOY, { kind: "spine", url: 'assets/spine', url2: __skeletonSpineBoy, url3: __atlasSpineBoy });
    }

    static getInstance() : Assets {
        return new Assets();
    }
}