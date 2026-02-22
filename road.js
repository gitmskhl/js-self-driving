const LANEWIDTH = 5
const LANECOLOR = "white"

class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x
        this.width = width
        this.laneCount = laneCount

        this.left = x - width / 2
        this.right = x + width / 2


        const topLeft = [this.left, 0]
        const topRight = [this.right, 0]
        const bottomLeft = [this.left, window.innerHeight]
        const bottomRight = [this.right, window.innerHeight]

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
            ctx.moveTo(border[0][0], border[0][1] - window.innerHeight - camera)
            ctx.lineTo(border[1][0], border[1][1])
            ctx.stroke()
        })

    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount
        return this.left + laneIndex * laneWidth + laneWidth / 2
    }

}