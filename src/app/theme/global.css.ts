

import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

export const globalVars = createGlobalTheme(':root', {
    neumorphism: {
        flat: {
            boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #fff',
        },
        concave: {
            background: "linear-gradient(145deg, #d7d7d7, #fff)",
            boxShadow: "5px 5px 10px #cbcbcb, -5px -5px 10px #fff",
        },
        convex: {
            background: "linear-gradient(145deg, #fff, #d7d7d7)",
            boxShadow: "5px 5px 10px #cbcbcb, -5px -5px 10px #fff",
        },
        pressed: {
            boxShadow: "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #fff",
        },
    },
    color: {
        background: '#e0e0e0',
        text: '#212529',
        success: '#37b24d',
        danger: '#f03e3e',
    },
    font: {
        body: 'arial'
    }
});

globalStyle('html, body', {
    background: globalVars.color.background,
    color: globalVars.color.text,
    fontFamily: globalVars.font.body,
    
});

globalStyle('button', {
    background: 'none',
    border: 'none',
    outline: 'none',
    padding: 0,
})