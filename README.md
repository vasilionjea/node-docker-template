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

### Testing 
* Run and watch tests locally: `npm test`
* Run CI tests locally: `npm run test:ci`
* Run CI tests in container: `docker compose -f compose.dev.yml run --rm test`

### Production
**Run prod service**
* Start: `docker compose up -d`
* Stop: `docker compose down`

**Run prod service from locally built image**
* Build from local Dockerfile & start: `docker compose up --build` (_compose.yml must have a `build: ./` option_)
* Stop: `docker compose down`
* Stop and delete volumes: `docker compose down -v` (_-v also removes valumes_)

**Container interaction**
* Enter Bash: `docker exec -it fish-species-api-prod bash`
* Enter Redis CLI: `docker exec -it redis bash` Then enter redis CLI: `redis-cli`

**Release**
* Upgrade version: `npm version patch -m "Bump version to %s"` (choose between `patch`, `minor`, `major`)
* New images are released via the _build-image.yml_ Github action.
* On every push images are tagged with the `latest` tag.
* When new version tags are pushed with `npm version`, images are tagged with the `v*.*.*` tag.

**Deploy**
* TBD...


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

**Before docker compose**
* Build prod image: `docker build -t fish-species-api:1.0.0-prod .`
* Run docker prod image: `docker run -d -p 3000:3000 --name fish-species-api-prod fish-species-api:1.0.0-prod`
