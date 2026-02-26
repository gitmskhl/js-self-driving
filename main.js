const CANVAS_WIDTH = 300
const LANECOUNT = 4
const CARWIDTH = CANVAS_WIDTH / LANECOUNT / 1.9

const N_CARS = 100

const carCanvas = document.getElementById("carCanvas")
carCanvas.height = window.innerHeight
carCanvas.width = CANVAS_WIDTH


const networkCanvas = document.getElementById("networkCanvas")
networkCanvas.height = window.innerHeight
networkCanvas.width = CANVAS_WIDTH * 1.2

const carCtx = carCanvas.getContext("2d")

const networkCtx = networkCanvas.getContext("2d")

const road = new Road(carCanvas.width / 2, carCanvas.width * .9, laneCount=LANECOUNT)

const cars = generateCars(N_CARS)

let bestCar = cars[0]

if (localStorage.getItem("bestBrain")) {
    bestCar.brain = JSON.parse(
        localStorage.getItem("bestBrain")
    )
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, CARWIDTH, CARWIDTH * 2, "DUMMY", 4),
    new Car(road.getLaneCenter(0), -200, CARWIDTH, CARWIDTH * 2, "DUMMY", 4),
    new Car(road.getLaneCenter(2), -300, CARWIDTH, CARWIDTH * 2, "DUMMY", 4)
]

let camera = 0

function save() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain)
    )
}

function discard() {
    localStorage.removeItem("bestBrain")
}

function generateCars(N) {
    const cars = []
    for (let i = 1; i <= N; ++i) {
        cars.push(new Car(road.getLaneCenter(1), 100, CARWIDTH, CARWIDTH * 2, "AI", 6))
    }
    return cars
}

function animate() {
    for (let traffic_car of traffic)
    {
        traffic_car.update(road.borders, [])
    }

    for (let c of cars)
        c.update(road.borders, traffic)

    carCanvas.height = window.innerHeight
    networkCanvas.height = window.innerHeight

    bestCar = cars.find(
        c => c.y === Math.min(...cars.map(c => c.y))
    )

    camera += (bestCar.y - carCanvas.height * .8 - camera) / 10

    road.render(carCtx, camera)

    for (let traffic_car of traffic)
        traffic_car.render(carCtx, camera)
    
    carCtx.globalAlpha = .2
    for (let c of cars) {
        if (c !== bestCar)
            c.render(carCtx, camera)
    }
    carCtx.globalAlpha = 1
    bestCar.render(carCtx, camera, true)

    Visualizer.drawNetwork(networkCtx, bestCar.brain)
    requestAnimationFrame(animate)
}


animate()
