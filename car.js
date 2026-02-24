class Car {
    constructor(x, y, width, height, controlType, maxSpeed=3) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.speed = 0
        this.acceleration = .2
        this.friction = .05
        this.maxSpeed = maxSpeed
        this.angle = 0

        this.controls = new Controls(controlType)
        if (controlType != "DUMMY")
            this.sensor = new Sensor(this)

        this.damaged = false
    }

    update(borders, traffic) {
        if (!this.damaged) {
            this.#move()
            this.polygon = this.#createPolygon()
            this.damaged = this.#checkForCollision(borders, traffic)
        }
        if (this.sensor)
            this.sensor.update(borders, traffic)
    }

    #checkForCollision(borders, traffic) {
        for (let borderLine of borders)
            if (polyIntersect(this.polygon, borderLine)) return true
        for (let traffic_car of traffic)
            if (polyIntersect(this.polygon, traffic_car.polygon, getStrongIntersection))
                return true
        return false
    }

    #move() {
        if (this.controls.forward) this.speed += this.acceleration
        else if (this.controls.revert) this.speed -= this.acceleration

        this.speed = Math.min(this.speed, this.maxSpeed)
        this.speed = Math.max(this.speed, -this.maxSpeed / 2)

        if (this.speed > 0) this.speed -= this.friction
        else if (this.speed < 0) this.speed += this.friction

        if (Math.abs(this.speed) < this.friction) this.speed = 0

        if (this.controls.left) this.angle += .03
        if (this.controls.right) this.angle -= .03


        this.x -= Math.sin(this.angle) * this.speed
        this.y -= Math.cos(this.angle) * this.speed
    }

    #createPolygon() {
        const points = []
        const rad = Math.hypot(this.width, this.height) / 2
        const angle = Math.atan2(this.width, this.height)
        points.push({
            x: this.x - Math.sin(this.angle - angle) * rad,
            y: this.y - Math.cos(this.angle - angle) * rad
        })
        points.push({
            x: this.x - Math.sin(this.angle + angle) * rad,
            y: this.y - Math.cos(this.angle + angle) * rad
        })
        points.push({
            x: this.x + Math.sin(this.angle - angle) * rad,
            y: this.y + Math.cos(this.angle - angle) * rad
        })
        points.push({
            x: this.x + Math.sin(this.angle + angle) * rad,
            y: this.y + Math.cos(this.angle + angle) * rad
        })
        return points
    }

    render(ctx, camera) {

        ctx.fillStyle = this.damaged ? "gray" : "blue"

        ctx.beginPath()
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y - camera)
        ctx.lineTo(this.polygon[1].x, this.polygon[1].y - camera)
        ctx.lineTo(this.polygon[2].x, this.polygon[2].y - camera)
        ctx.lineTo(this.polygon[3].x, this.polygon[3].y - camera)
        ctx.fill()

        if (this.sensor)
            this.sensor.render(ctx, camera)
    }

}
