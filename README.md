# API
An example Node service with Docker & CI/CD using Github Actions. Docker is used to containerize our app and start it with any other services it depends on (_in our example Redis_). Two Github Actions are being used – one to run unit tests on every push/pull request to the `main` branch, and another action is used to build the production Docker image for our app and push it to Docker Hub.

The _Dockerfile_ is used by the _build-image.yml_ Github action to build a production image such as `vasilionjea/fish-species-api:v1.0.2` and to push the image to Docker Hub.

The _compose.yml_ file defines the containerized services for our app and it's used by the `docker compose up` command to run these services. The `prod` service (_our node app_) uses a prod image from our Docker Hub account/project.

The _compose.dev.yml_ file defines the containerized services for development and it's used when running the command `docker compose -f compose.dev.yml up --build` to build a development image and start the dev services. Docker volumes sync changing source code between the container and the host machine.

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
