<script lang="ts">
import Layout from "./components/Layout.vue";
export default {
    components: { Layout },
};
</script>

<template>
    <Layout />
</template>

<style lang="scss">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}
body {
    line-height: 1;
}
ol,
ul {
    list-style: none;
}
blockquote,
q {
    quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
    content: "";
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}

* {
    box-sizing: border-box;
}

:root {
    --border-color: #999;
    --background-color: #fff;
    --main-color: rgb(223, 144, 70);
    --border-secondary: #bbb;
    --text-color: #000;
    --text-secondary: #555;
    .work {
        --plan-primary: rgb(255, 114, 114);
        --plan-secondary: rgb(255, 246, 246);
    }
    .rest {
        --plan-primary: rgb(252, 252, 106);
        --plan-secondary: rgb(255, 255, 243);
    }
    .effective {
        --plan-primary: rgb(143, 255, 143);
        --plan-secondary: rgb(239, 255, 239);
    }
    .service {
        --plan-primary: rgb(133, 133, 255);
        --plan-secondary: rgb(240, 240, 255);
    }
}

:root[data-theme="dark"] {
    --border-color: #868686;
    --background-color: #353535;
    --main-color: rgb(112, 112, 112);
    --border-secondary: #474747;
    --text-color: #fff;
    --text-secondary: #bbbbbb;
    .work {
        --plan-primary: rgb(170, 47, 47);
        --plan-secondary: rgb(64 55 55);
    }
    .rest {
        --plan-primary: rgb(153, 153, 20);
        --plan-secondary: rgb(64 64 61);
    }
    .effective {
        --plan-primary: rgb(22, 116, 22);
        --plan-secondary: rgb(60 70 60);
    }
    .service {
        --plan-primary: rgb(18, 18, 148);
        --plan-secondary: rgb(70 70 76);
    }
}

@font-face {
    font-family: "Roboto";
    src: url("./assets/fonts/Roboto-Regular.ttf");
}

body {
    font-family: Roboto;
    background-color: var(--background-color);
    color: var(--text-color);
}
</style>
