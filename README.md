# About
An example Node service with Docker & CI/CD using Github Actions. 

Docker is used to containerize this Node app and start it with any other services it depends on, in our example Redis. Two Github Actions have been created:
1. The **run-unit-tests.yml** action runs unit tests on every push or pull request to the `main` branch.
2. The **build-image.yml** action builds the production Docker image and pushes it to Docker Hub.

The _build-image.yml_ Github action uses the _Dockerfile_ to build a production image such as `vasilionjea/fish-species-api:v1.0.2` and pushes that image to Docker Hub (_`vasilionjea` maps to my username and `fish-species-api` to the repository on https://hub.docker.com_). You must create your own account/repo and replace all references in the codebase.

The _compose.yml_ file defines the containerized services for our app and it's used by the `docker compose up` command to run these services. The `prod` service (_our node app_) uses a prod image from our Docker Hub account/project.

The _compose.dev.yml_ file defines the containerized services for development and it's used when running the command `docker compose -f compose.dev.yml up --build` to build a development image and start the dev services. Docker volumes sync source code changes between the container and the host machine.

## Development 
Build & run in dev environment: 
* Start: `docker compose -f compose.dev.yml up --build -V`
* Stop: `docker compose -f compose.dev.yml down`

## Testing 
* Run and watch tests locally: `npm test`
* Run CI tests locally: `npm run test:ci`
* Run CI tests in container: `docker compose -f compose.dev.yml run --rm test`

## Production
Run service in prod: 
* Start: `docker compose up -d`
* Stop: `docker compose down`

Run prod service from a locally built image: 
* Build from local Dockerfile & start: `docker compose up --build` (_compose.yml must have a `build: ./` option_)
* Stop: `docker compose down`
* Stop and delete volumes: `docker compose down -v` (_-v also removes valumes_)

## Other
Container interaction: 
* Enter app container's Bash: `docker exec -it fish-species-api-prod bash`
* Enter Redis container's bash: `docker exec -it redis bash` Then enter redis CLI: `redis-cli`

Release: 
* Upgrade version: `npm version patch -m "Bump version to %s"` (_choose between `patch`, `minor`, `major`_)
* New images are released via the _build-image.yml_ Github action.
* On every push images are tagged with the `latest` tag.
* When new version tags are pushed with `npm version`, images are tagged with the `v*.*.*` tag.

Deploy: 
* TBD...
