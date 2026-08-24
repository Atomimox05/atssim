"use strict"

class ATSOperationModeWindow {
    HTMLElement
    ats

    constructor(ats) {
        this.ats = ats
    }

    isValidTerminalTrackCircuit(tc) {
        if (!tc || !tc.mapTrackCircuit) return false
        var mtc = tc.mapTrackCircuit

        // 1. Debe estar asociado a una señal
        var hasSignal = mtc.northboundSignal != null || mtc.southboundSignal != null
        if (!hasSignal) return false

        // 2. No debe estar enlazado con alguna plataforma/estación
        var hasPlatform = mtc.northboundPlatform != null || mtc.southboundPlatform != null
        if (hasPlatform) return false

        // 3. No debe seguirle un endOfLine (endOfTrack) o shuntingPanel
        var isEndOfTrack = mtc.northbound === "endOfTrack" ||
                           mtc.southbound === "endOfTrack" ||
                           mtc.normal === "endOfTrack" ||
                           mtc.reverse === "endOfTrack"
        if (isEndOfTrack) return false

        var hasShuntingPanel = mtc.northboundShuntingPanel != null || mtc.southboundShuntingPanel != null
        if (hasShuntingPanel) return false

        return true
    }

    createContent() {
        this.HTMLElement = document.createElement("div")
        this.HTMLElement.style.width = "400px"
        this.HTMLElement.style.height = "500px"
        this.HTMLElement.style.backgroundColor = ""
        this.HTMLElement.style.color = "white"
        this.HTMLElement.style.padding = "10px"
        this.HTMLElement.style.overflow = "auto"

        var title = document.createElement("h2")
        title.innerText = "TrackCircuit Terminal Configuration"
        title.style.marginTop = "0"
        title.style.borderBottom = "1px solid #444"
        title.style.paddingBottom = "10px"
        this.HTMLElement.appendChild(title)

        var instruction = document.createElement("p")
        instruction.innerText = "Select track circuits that act as terminal stations:"
        instruction.style.fontSize = "12px"
        instruction.style.color = "#E0E0E0"
        this.HTMLElement.appendChild(instruction)

        var listContainer = document.createElement("div")
        listContainer.style.marginTop = "15px"

        // Group track circuits by prefix (e.g. AJU_01 -> AJU)
        var groups = {}
        this.ats.interlocking.trackCircuits.forEach(tc => {
            if (!this.isValidTerminalTrackCircuit(tc)) return
            var prefix = tc.name.split('_')[0]
            if (!groups[prefix]) {
                groups[prefix] = []
            }
            groups[prefix].push(tc)
        })

        for (var prefix in groups) {
            var groupHeader = document.createElement("h3")
            groupHeader.innerText = prefix
            groupHeader.style.color = "#E0E0E0"
            groupHeader.style.marginBottom = "5px"
            groupHeader.style.fontSize = "14px"
            listContainer.appendChild(groupHeader)

            groups[prefix].forEach(tc => {
                var row = document.createElement("div")
                row.style.display = "flex"
                row.style.alignItems = "center"
                row.style.marginBottom = "4px"
                row.style.padding = "4px"

                var checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.id = `tc_terminus_${tc.name}_${Date.now()}`
                checkbox.checked = tc.terminus === true
                checkbox.style.marginRight = "10px"
                checkbox.style.cursor = "pointer"

                checkbox.addEventListener("change", () => {
                    tc.terminus = checkbox.checked
                })

                var label = document.createElement("label")
                label.htmlFor = checkbox.id
                label.innerText = tc.name
                label.style.cursor = "pointer"
                label.style.fontSize = "13px"
                label.style.color = "#E0E0E0"

                row.appendChild(checkbox)
                row.appendChild(label)
                listContainer.appendChild(row)
            })
        }

        this.HTMLElement.appendChild(listContainer)
        return this.HTMLElement
    }
}
