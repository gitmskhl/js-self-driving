# Self-Driving Car in Vanilla JavaScript

A browser-based simulation of autonomous driving built with HTML5 Canvas and plain JavaScript.
The project demonstrates how a simple feedforward neural network can be evolved with a genetic approach to improve lane-keeping and obstacle avoidance over repeated runs.

## Overview

This project renders a road environment, traffic vehicles, sensor rays, and a live neural-network visualization.
AI-controlled cars are evaluated by how far they travel without collisions. The best-performing model can be saved and reused for single-car testing.

## Demo

### Training Mode (Genetic Search)
Multiple AI cars are spawned. Their neural networks are initialized from the current best model and mutated to explore better behaviors.

![Training Demo](./gifs/train.gif)

### Test Mode (Single Best Car)
One AI car drives using the best saved model from training.

![Test Demo](./gifs/test.gif)

## Key Features

- Real-time 2D driving simulation with HTML5 Canvas
- AI car sensors (ray casting) for environment perception
- Feedforward neural network decision-making
- Genetic-style mutation for policy improvement
- Save/discard best model via browser `localStorage`
- Live neural network visualization during simulation

## Project Structure

- `index.html` - app entry point and canvas layout
- `main.js` - simulation loop, mode control, save/discard logic
- `car.js` - vehicle physics, collision checks, AI control path
- `sensor.js` - ray-based sensing and distance sampling
- `network.js` - neural network, feedforward, mutation utilities
- `road.js` - road geometry and lane utilities
- `visualizer.js` - neural network rendering
- `controls.js` - user/AI/dummy control handling
- `utils.js` - geometry/math helper functions

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd js-self-driving
```

### 2. Run the project

Because this is a static browser project, you can:

- open `index.html` directly in a browser, or
- run a local static server (recommended) such as VS Code Live Server.

## Training and Testing Workflow

The simulation mode is controlled in `main.js` by `N_CARS`:

- `N_CARS > 1` -> training mode (population of cars)
- `N_CARS = 1` -> test mode (single best car)

Recommended workflow:

1. Set `N_CARS` to a larger value (for example, `200`) and run training.
2. Let cars evolve for a while and click the save button (`💾`) to store `bestBrain`.
3. Set `N_CARS = 1` and rerun to evaluate the saved model.
4. Use discard (`🗑️`) to clear `bestBrain` and restart from scratch.

## Controls

- `💾` Save current best neural network to browser `localStorage` (`bestBrain`)
- `🗑️` Remove saved model from `localStorage`

## Technical Notes

- No external libraries are required.
- State persistence is local to the browser profile through `localStorage`.
- Model quality depends on run time, mutation settings, and traffic randomness.

## Future Improvements

- Fitness scoring beyond distance traveled
- Better traffic generation and curriculum difficulty
- Configurable hyperparameters via UI
- Session export/import for trained models

## License

This project is licensed under the MIT License.
