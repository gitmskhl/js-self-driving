class Sensor {
    constructor(car) {
        this.car = car
        this.rayCount = 5
        this.rayLength = 500
        this.raySpread = Math.PI / 4

        this.rays = []
        this.freeRays = []
    }



    update(borders, traffic) {
        this.rays = []
        this.freeRays = []
        for (let i = 0; i < this.rayCount; ++i) {
            const rayAngle = lerp(
                -this.raySpread / 2,
                this.raySpread / 2,
                i / (this.rayCount - 1)
            ) + this.car.angle

            const start = { x: this.car.x, y: this.car.y }
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            }

            let ray = [start, end]
            this.rays.push(ray)
            let inter_ray = this.#getFreeRay(ray, borders)
            for (let traffic_car of traffic)
                inter_ray = this.#getFreeRay(inter_ray, polygon2borders(traffic_car.polygon), getStrongIntersection)
            this.freeRays.push(inter_ray)
        }
    }

    #getFreeRay(ray, borders, check=getIntersection) {
        let inters = borders.map(border => check(
            ray[0], ray[1],
            border[0], border[1]
        )).filter(x => x)
        if (inters.length == 0) return ray
        let minOffset = Math.min(...inters.map(x => x.offset))
        let mins = inters.filter(x => x.offset === minOffset)
        return [
            ray[0],
            { x: mins[0].x, y: mins[0].y }
        ]
    }

    render(ctx, camera) {
        for (let i = 0; i < this.rays.length; ++i) {
            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.strokeStyle = "yellow"
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y - camera)
            ctx.lineTo(this.freeRays[i][1].x, this.freeRays[i][1].y - camera)
            ctx.stroke()
            if (this.rays[i] !== this.freeRays[i]) {
                ctx.beginPath()
                ctx.strokeStyle = "black"
                ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y - camera)
                ctx.lineTo(this.freeRays[i][1].x, this.freeRays[i][1].y - camera)
                ctx.stroke()
            }
        }
    }

}