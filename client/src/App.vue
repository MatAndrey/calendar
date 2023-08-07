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
    .orange {
        background-color: #f1e1d1;
    }
    .yellow {
        background-color: #f5f1ad;
    }
    .red {
        background-color: #ffcece;
    }
    .green {
        background-color: #d8ffd7;
    }
    .blue {
        background-color: #d7e4ff;
    }
}

:root[data-theme="dark"] {
    --border-color: #868686;
    --background-color: #353535;
    --main-color: rgb(112, 112, 112);
    --border-secondary: #474747;
    --text-color: #fff;
    --text-secondary: #bbbbbb;
    .orange {
        background-color: #614c37;
    }
    .yellow {
        background-color: #837f47;
    }
    .red {
        background-color: #583a3a;
    }
    .green {
        background-color: #456c44;
    }
    .blue {
        background-color: #445370;
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
