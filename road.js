const LANEWIDTH = 5
const LANECOLOR = "white"

class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x
        this.width = width
        this.laneCount = laneCount

        this.left = x - width / 2
        this.right = x + width / 2


        const topLeft = {x: this.left, y: 0}
        const topRight = {x: this.right, y: 0}
        const bottomLeft = {x: this.left, y: window.innerHeight}
        const bottomRight = {x: this.right, y: window.innerHeight}

        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ]

    }


    render(ctx, camera) {

        camera = camera % window.innerHeight

        ctx.lineWidth = LANEWIDTH
        ctx.strokeStyle = LANECOLOR

        for (let i = 1; i < this.laneCount; ++i) {
            const x = lerp(this.left, this.right, i / this.laneCount)

            ctx.setLineDash([20, 20])
            ctx.beginPath()
            ctx.moveTo(x, -window.innerHeight - camera)
            ctx.lineTo(x, window.innerHeight)
            ctx.stroke()
        }

        ctx.setLineDash([])
        this.borders.forEach(border => {
            ctx.beginPath()
            ctx.moveTo(border[0].x, border[0].y - window.innerHeight - camera)
            ctx.lineTo(border[1].x, border[1].y)
            ctx.stroke()
        })

    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount
        return this.left + laneIndex * laneWidth + laneWidth / 2
    }

}