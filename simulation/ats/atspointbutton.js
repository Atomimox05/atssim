"use strict"

class ATSPointButton {
    HTMLElement
    interlockingPoint
    mimicScreenPage
    blinkEnable

    constructor(HTMLElement, interlockingPoint, mimicScreenPage) {
        this.HTMLElement = HTMLElement
        this.interlockingPoint = interlockingPoint
        this.mimicScreenPage = mimicScreenPage
        this.HTMLElement.addEventListener("click", this.buttonClicked.bind(this))
        this.blinkEnable = true
        this.updateColors()
    }

    buttonClicked() {
        this.mimicScreenPage.updateCurrentClickedButton(this)
    }

    updateColors() {
        if (this.mimicScreenPage.currentClickedButton instanceof ATSPointButton && this.mimicScreenPage.currentClickedButton.interlockingPoint.name == this.interlockingPoint.name) {
            this.HTMLElement.setAttribute("fill", "green")
        } else {
            if (this.interlockingPoint.desiredPosition != this.interlockingPoint.currentPosition) {
                if (this.blinkEnable) {
                    this.HTMLElement.setAttribute("fill", "#FFFF06")
                } else {
                    this.HTMLElement.setAttribute("fill", "#AFB2C1")
                }
            } else if (this.interlockingPoint.locked) {
                this.HTMLElement.setAttribute("fill", "white")
            } else if (!this.interlockingPoint.locked) {
                this.HTMLElement.setAttribute("fill", "#FFFF06")
            } else {
                this.HTMLElement.setAttribute("fill", "blue")
            }
        }
        this.blinkEnable = !this.blinkEnable
        setTimeout(this.updateColors.bind(this), 500)
    }
}