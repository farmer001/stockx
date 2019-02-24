# stockx

# V1.0

## Usage
`git clone https://github.com/farmer001/stockx && cd stockx && git fetch && git checkout v1 && docker-compose up`
Navigate to `http://localhost:8080`

## Overview
The goal of the first version is to demonstrate some understanding of backend infrastructure, dependency injection, and testability. I’ve exposed two endpoints to GET and POST true-to-size entries.

The `true-size` backend is responsible for both interacting with the database and serving a static assets (a simple HTML page with embedded Javascript). I ask that little focus is put into the HTML/JS in the frontend as it represents the absolute minimum required to make a “UI” available for playing with the system - V2.0 will provide a more comprehensive approach to frontend infra.

## Overall architecture

![v1](https://i.imgur.com/OpTEPrt.png)

# V2.0

## Usage
`git clone https://github.com/farmer001/stockx && cd stockx && git fetch && git checkout v2 && docker-compose up`
Navigate to `http://localhost:8080`

## Overview
The goal of V2.0 is to demonstrate further understanding of backend and frontend infra, build tools, monolithic repos, code sharing, microservices, and more. 

## Overall architecture

![v2](https://i.imgur.com/DK8RwQq.png)

TODO(willbrazil): Cleanup Dockerfile/Remove unnecessary logic (speed up/cache node_modules).

TODO(willbrazil): Fix node_modules mounting logic

TODO(willbrazil): Cleanup lerna
