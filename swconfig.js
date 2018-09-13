module.exports = {
    navigateFallback: '',
    stripPrefixMulti: {
        './build': '/forex-frontend',
        // './build': '',
    },
    root: './build',
    staticFileGlobs: [
        './build/index.html',
        './build/**/*.js',
        './build/**/*.css',
    ],
}
