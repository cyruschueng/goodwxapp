let util = {}
util.title = function (title) {
    title = title ? title + ' - 燕梳云平台' : '燕梳云平台'
    window.document.title = title
}

export default util
