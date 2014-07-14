WINTERSMITH = ./node_modules/.bin/wintersmith

b: 
	@$(WINTERSMITH) build
p:
	@$(WINTERSMITH) preview