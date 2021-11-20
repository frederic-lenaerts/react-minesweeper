

import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';
import openColor from 'open-color';

export const vars = createGlobalTheme(':root', {
    color: {
        background: '#e0e0e0',
        text: openColor.gray[9]
    },
    font: {
        body: 'arial'
    }
});

globalStyle('html, body', {
    background: vars.color.background,
    color: vars.color.text
});