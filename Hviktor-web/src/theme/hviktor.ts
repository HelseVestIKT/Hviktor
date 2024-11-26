import { definePreset } from '@primeng/themes';
import Nora from '@primeng/themes/nora';
import { colors } from "./colors/colors";
import { primaryColor } from "./colors/primaryColor";
import { colorScheme } from "./colors/colorScheme";
import { button } from "./components/button";
import { menubar } from "./components/menubar";
import { tabs } from "./components/tabs";

export const Hviktor = definePreset(Nora, {
    primitive: {
        ...colors,
    },
    semantic: {
        primary: primaryColor,
        colorScheme: colorScheme,
    },
    components: {
        button: button,
        menubar: menubar,
        tabs: tabs,
    },
})
