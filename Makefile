WINTERSMITH = ./node_modules/.bin/wintersmith

b: 
	@$(WINTERSMITH) build
p:
	@$(WINTERSMITH) preview --port 8000
deploy:
	@git push origin master
	@git push heroku master