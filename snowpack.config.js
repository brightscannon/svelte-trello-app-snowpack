const production = process.env.NODE_ENV === 'production'

function babelOptions() {
    return {
        plugins: production
            ? ['transform-remove-console']
            : []
    }
}

module.exports ={
    mount: {
        public: '/',
        src: '/dist'
    },
    plugins:[
        ['@snowpack/plugin-svelte', {
            preprocess: require('svelte-preprocess')({
                scss: {
                    prependData: '@import "./src/scss/main.scss";' //scss에서 기본 import (main.scss같은거)
                },
                postcss:{
                    plugins: [
                        require('autoprefixer')()
                    ]
                },
                babel: babelOptions()
            })
        }],
        ['@snowpack/plugin-babel', {
            transformOptions: babelOptions()
        }],
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-sass',
        '@snowpack/plugin-optimize'
    ],
    alias: {
        '~': './src'
    }
}