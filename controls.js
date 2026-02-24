class Controls {
    constructor(controlType) {
        this.lefth = this.forward = this.right = this.reverse = false

        switch (controlType) {
            case "KEYS":
                this.#addKeyboardListeners()
                break;
            case "DUMMY":
                this.forward = true
                break;
        }
    }

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true
                    break
                case "ArrowRight":
                    this.right = true
                    break
                case "ArrowUp":
                    this.forward = true
                    break
                case "ArrowDown":
                    this.revert = true
                    break
            }
        }

        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false
                    break
                case "ArrowRight":
                    this.right = false
                    break
                case "ArrowUp":
                    this.forward = false
                    break
                case "ArrowDown":
                    this.revert = false
                    break
            }

        }

    }

}