run:
	npx nodemon

initmongodata:
	sudo mkdir /usr/local/mongodb
	sudo mkdir /usr/local/mongodb/data
	sudo mkdir /usr/local/mongodb/logs

getmongo:
	mkdir ~/mongodb
	cd ~/mongodb && curl -0 https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.0.8.tgz --output mongodb.tgz