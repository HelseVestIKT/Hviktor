export const button = {
    root: {
        borderRadius: '0.5rem',
        paddingX: '1.5rem',
        focusRing: {
            width: '2px',
        },
    },
    colorScheme: {
        primary: {
            background: '{primary.400}',
            hoverBackground: '{primary.500}',
            activeBackground: '{primary.400}',
            borderColor: '{primary.400}',
            hoverBorderColor: '{primary.500}',
            activeBorderColor: '{primary.400}',
            focusRingColor: '{primary.400}',
        },
        secondary: {
            background: '{neutral.50}',
            hoverBackground: '{primary.300}',
            activeBackground: '{neutral.50}',
            borderColor: '{primary.400}',
            hoverBorderColor: '{primary.500}',
            activeBorderColor: '{primary.500}',
            color: '{primary.400}',
            hoverColor: '{primary.500}',
            activeColor: '{primary.500}',
            focusRingColor: '{primary.400}',
        },
        danger: {
            background: '{neutral.50}',
            hoverBackground: '{red.400}',
            activeBackground: '{red.200}',
            borderColor: '{red.400}',
            activeBorderColor: '{red.400}',
            color: '{red.400}',
            activeColor: '{red.400}',
            focusRingColor: '{red.400}',
        },
        text: {
            primary: {
                color: '{primary.400}',
                hoverBackground: '{primary.300}',
                activeBackground: '{primary.300}',
                hoverColor: '{primary.400}',
                activeColor: '{primary.400}',
                focusRingColor: '{primary.400}',
            },
            danger: {
                color: '{red.400}',
                hoverBackground: '{red.200}',
                activeBackground: '{red.200}',
                hoverColor: '{red.400}',
                activeColor: '{red.400}',
                focusRingColor: '{red.400}',
            }
        },
        outlined: {
            primary: {
                hoverBackground: '{primary.300}',
                activeBackground: '{primary.300}',
                borderColor: '{primary.400}',
                color: '{primary.400}',
            },
            danger: {
                hoverBackground: '{red.200}',
                activeBackground: '{red.200}',
                borderColor: '{red.400}',
                color: '{red.400}',
            }
        }
    }
};