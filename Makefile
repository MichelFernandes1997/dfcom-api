include .env

.PHONY: up

up:
	docker-compose up

.PHONY: up -d

up -d:
	docker-compose up -d

.PHONY: down

down:
	docker-compose down

.PHONY: restart

restart:
	docker-compose restart

.PHONY: logs

logs:
	docker-compose logs -f