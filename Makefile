# Makefile for Clock Project

# Variables
DC=docker-compose exec app

.PHONY: install up down test test-filter test-ui migrate migrate-refresh npm-install npm-install-dev npm-dev npm-build

## Setup project
install:
	cd app && cp .env.example .env && composer install && npm i && npm run build

## Bring up docker
up:
	docker-compose up -d

## Bring down docker
down:
	docker-compose stop

## Run PHPUnit tests
test:
	$(DC) php artisan test

## Run PHPUnit tests with filter
test-filter:
	$(DC) php artisan test --filter=$(filter)

## Run vitest tests
test-ui:
	$(DC) npm run test

## Run migrations
migrate:
	$(DC) php artisan migrate

## Run migrations with refresh
migrate-refresh:
	$(DC) php artisan migrate:refresh

## Run npm install
npm-install:
	$(DC) npm install $(package)

## Run npm install with dev
npm-install-dev:
	$(DC) npm install $(package) --save-dev

## Run npm dev
npm-dev:
	$(DC) npm run dev

## Run npm build
npm-build:
	$(DC) npm run build