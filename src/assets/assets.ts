import __imageBtnLeft from './images/button_left.png';
import __imageBtnRight from './images/button_right.png';

import __atlasSpineBoy from './spine/spineboy.atlas'
import __skeletonSpineBoy from './spine/spineboy.skeleton'

export type Asset = {
    kind: string;
    url: string;
    url2?: string;
    url3?: string;
};

export class Assets extends Map<string, Asset> {

    public static readonly IMAGE_BTN_LEFT: string = "imageBtnLeft";
    public static readonly IMAGE_BTN_RIGHT: string = "imageBtnRight";
    public static readonly SPINE_BOY: string = "spineSpineBoy";

    private constructor() {
        super();

        this.set(Assets.IMAGE_BTN_LEFT, { kind: "image", url: __imageBtnLeft });
        this.set(Assets.IMAGE_BTN_RIGHT, { kind: "image", url: __imageBtnRight });

        this.set(Assets.SPINE_BOY, { kind: "spine", url: 'assets/spine', url2: __skeletonSpineBoy, url3: __atlasSpineBoy });
    }

    static getInstance() : Assets {
        return new Assets();
    }
}