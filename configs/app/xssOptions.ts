const xssOptions = {
  whiteList: {
    ul: [ 'style' ],
    li: [ 'style' ],
    ol: [ 'style' ],
    dl: [ 'style' ],
    dt: [ 'style' ],
    dd: [ 'style' ],
    // Table tags
    table: [ 'style' ],
    thead: [ 'style' ],
    tbody: [ 'style' ],
    tr: [ 'style' ],
    td: [ 'style' ],
    th: [ 'style' ],
    // Other tags
    div: [ 'style' ],
    span: [ 'style' ],
    p: [ 'style' ],
    hr: [ 'style' ],
    br: [ 'style' ],
    b: [ 'style' ],
    strong: [ 'style' ],
    i: [ 'style' ],
    a: [ 'href', 'style', 'target' ],
    h1: [ 'style' ],
    h2: [ 'style' ],
    h3: [ 'style' ],
    h4: [ 'style' ],
    h5: [ 'style' ],
    video: [ 'style', 'width', 'height', 'controls', 'muted', 'poster', 'src' ],
    source: [ 'src', 'type' ],
    // Image tags
    img: [ 'src', 'style', 'width', 'height', 'loading' ],
    // Button tags
    button: [ 'disabled', 'style', 'width', 'height', 'type' ],
  },
};

export default xssOptions;
