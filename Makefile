# Makefile for Clock Project

# Variables
DC=docker-compose exec app
DR=docker-compose run --rm app


build: ## Build development environment
	if ! [ -f app/.env ];then cp app/.env.example app/.env;fi
	docker-compose build
	$(DR) composer install
	$(DR) php artisan key:generate
	$(DR) php artisan migrate
	$(DR) php artisan db:seed
	$(DR) npm install
	$(DR) npm run build


up: ## Bring up docker
	docker-compose up -d


down: ## Bring down docker
	docker-compose stop


test: ## Run PHPUnit tests
	$(DC) php artisan test


test-filter: ## Run PHPUnit tests with filter
	$(DC) php artisan test --filter=$(filter)


test-ui: ## Run vitest tests
	$(DC) npm run test


migrate: ## Run migrations
	$(DC) php artisan migrate


migrate-refresh: ## Run migrations with refresh
	$(DC) php artisan migrate:refresh


npm-install: ## Run npm install
	$(DC) npm install $(package)


npm-install-dev: ## Run npm install with dev
	$(DC) npm install $(package) --save-dev


npm-dev: ## Run npm dev
	$(DC) npm run dev


npm-build: ## Run npm build
	$(DC) npm run build


tinker: ## Run tinker
	$(DC) php artisan tinker


composer: ## Run composer install
	$(DC) composer install

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
