import {
    afterPatch, beforePatch,
    definePlugin,
    findModuleChild,
    ServerAPI,
    staticClasses
} from "decky-frontend-lib";
import {FaShip} from "react-icons/fa";

// interface AddMethodArgs {
//   left: number;
//   right: number;
// }

declare global {
    const appStore: {
        allApps: { __proto__: any }[]
    };
}

export default definePlugin((_serverApi: ServerAPI) => {
    let bypass = false;
    const he = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (prop == "Db")
                return m[prop]
        }
    });

    const a = afterPatch(he, "type", (_, ret) => {
        bypass = false;
        return ret;
    });
    const b = beforePatch(he, "type", (_) => {
        bypass = true;
    });
    const c = afterPatch(appStore.allApps[0].__proto__, "BIsModOrShortcut", (_, ret) => {
        if (ret === true)
        {
            if (bypass)
                return false;
        }
        return ret;
    });
    return {
        title: <div className={staticClasses.Title}>EmuSync</div>,
        content: <div/>,
        icon: <FaShip/>,
        onDismount() {
            a.unpatch();
            b.unpatch();
            c.unpatch();
        },
    };
});
