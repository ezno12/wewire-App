import moduleAlias from 'module-alias';

moduleAlias.addAliases({
    "@root": __dirname,
    "@assat": `${__dirname}/assat`,
    "@Components": `${__dirname}/Components`,
    "@Pages": `${__dirname}/Pages`,
    "@style": `${__dirname}/style`,
    "@Hooks": `${__dirname}/Hooks`,
});
