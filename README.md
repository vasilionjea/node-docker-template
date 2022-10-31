# API

## Docker
<https://medium.com/hackernoon/a-better-way-to-develop-node-js-with-docker-cd29d3a0093>
<https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker>
<https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/docker/multi_stage_builds.md#dockerfile-with-multiple-stages>

"Docker is a format (and runtime) that allows you to specify how to package your application, and then how to run it, and to define what is required for it to run [...] Docker “containers” are processes. Now you can secure them or not secure them. But it is fundamental to semantically NEVER misunderstand what they are - processes!"  – <https://www.quora.com/What-are-pros-and-cons-of-Docker>

When you run a Docker container, Docker proceeds to isolate it from the rest of the system. 
That isolation happens at different levels (e.g. processes, network, filesystem).

### Development 
**Build & run in dev environment**
* Start: `docker compose -f compose.dev.yml up --build`
* Stop: `docker compose -f compose.dev.yml down`
* Run tests: `npm test`
* Upgrade version: `npm version patch -m "Bump version to %s"` (choose between `patch`, `minor`, `major`)
  See: <https://docs.npmjs.com/cli/v8/commands/npm-version#description>

### Testing 
* Run and watch tests locally: `npm test`
* Run CI tests locally: `npm run test:ci`
* Run CI tests in container: `docker compose -f compose.dev.yml run --rm test`

### Production
**Build & run prod image in a container**
* Build and start: `docker compose up --build`
* Enter container's bash: `docker exec -it fish-species-api-prod bash`
* Enter Redis bash: `docker exec -it redis bash` Then enter redis CLI: `redis-cli`
* Stop: `docker compose down`
* Stop and delete volumes: `docker compose down -v`

**Before docker compose**
* Build prod image: `docker build -t fish-species-api:1.0.0-prod .`
* Run docker prod image: `docker run -d -p 3000:3000 --name fish-species-api-prod fish-species-api:1.0.0-prod`
* Exec Bash interactively inside the prod container: `docker exec -it fish-species-api-prod /bin/bash`

**Release**
* Steps here...


## Docker Compose 
<https://docs.docker.com/compose/compose-file/#version-top-level-element>
<https://medium.com/hackernoon/a-better-way-to-develop-node-js-with-docker-cd29d3a0093>
<https://blog.atulr.com/docker-local-production-image>

* Computing components of an application are defined as Services. 
* Services communicate with each other through Networks.
* Services store and share persistent data into Volumes. 
* A Project is an individual deployment of an application specification on a platform.

A Compose file MUST declare a `services` root element as a map whose keys are strings 
of service names, and whose values are service definitions. A service definition contains 
the configuration that is applied to each container started for that service.

Each service MAY also include a `build` section, which defines how to create the Docker image 
for the service from source.

Each Service defines runtime constraints and requirements to run its containers. The `deploy` 
section groups these constraints and allows the platform to adjust the deployment strategy to 
best match containers’ needs with available resources.
