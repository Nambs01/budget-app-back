DOCKER_COMPOSE_FILE  = docker-compose.yml
COMPOSE_PROJECT_NAME = budget-manager	

DOCKER_COMPOSE 		 = docker compose -p $(COMPOSE_PROJECT_NAME) -f ../$(DOCKER_COMPOSE_FILE)
DOCKER_COMPOSE_EXEC	 = $(DOCKER_COMPOSE) exec nest-app

EXEC_DB   = $(DOCKER_COMPOSE) exec mysql

.PHONY: shell mysql log

shell:
	$(DOCKER_COMPOSE_EXEC) sh

mysql:
	$(EXEC_DB) mysql -u budget_manager -pbudget_manager budget_manager

log: 
	$(DOCKER_COMPOSE) logs -f nest-app