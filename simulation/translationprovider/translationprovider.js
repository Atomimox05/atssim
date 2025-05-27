class TranslationProvider {
    static get(key) {
        for (const pair of strings) {
            if (pair.english == key) {
                var wrapper = document.createElement("span")

                var english = document.createElement("span")
                english.innerText = pair.english
                english.classList = "english"

                var turkish = document.createElement("span")
                turkish.innerText = pair.turkish
                turkish.classList = "turkish"

                var spanish = document.createElement("span")
                spanish.innerText = pair.spanish
                spanish.classList = "spanish"

                wrapper.appendChild(english)
                wrapper.appendChild(turkish)
                wrapper.appendChild(spanish)
                wrapper.classList = "translated"

                return wrapper
            }
        }
        console.error(`Translation for ${key} not found`)
        var tmp = document.createElement("span")
        tmp.innerText = key
        return tmp
    }
}