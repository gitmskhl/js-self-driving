const CANVAS_WIDTH = 300
const LANECOUNT = 4
const CARWIDTH = CANVAS_WIDTH / LANECOUNT / 1.9

const carCanvas = document.getElementById("carCanvas")
carCanvas.height = window.innerHeight
carCanvas.width = CANVAS_WIDTH


const networkCanvas = document.getElementById("networkCanvas")
networkCanvas.height = window.innerHeight
networkCanvas.width = CANVAS_WIDTH * 1.2

const carCtx = carCanvas.getContext("2d")

const networkCtx = networkCanvas.getContext("2d")

const road = new Road(carCanvas.width / 2, carCanvas.width * .9, laneCount=LANECOUNT)
const car = new Car(road.getLaneCenter(2), 200, CARWIDTH, CARWIDTH * 2, "AI", 5)
const traffic = [
    new Car(road.getLaneCenter(1), -100, CARWIDTH, CARWIDTH * 2, "DUMMY")
]

let camera = 0


function animate() {
    for (let traffic_car of traffic)
    {
        traffic_car.update(road.borders, [])
    }

    car.update(road.borders, traffic)

    carCanvas.height = window.innerHeight
    networkCanvas.height = window.innerHeight

    camera = car.y - carCanvas.height * .8

    road.render(carCtx, camera)

    for (let traffic_car of traffic)
        traffic_car.render(carCtx, camera)
    
    car.render(carCtx, camera)

    Visualizer.drawNetwork(networkCtx, car.brain)
    requestAnimationFrame(animate)
}


animate()
