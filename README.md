# API
An example NodeJS service with docker & CI/CD using Github Actions.

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
