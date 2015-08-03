FROM aaronhenshaw/grails3-tomcat7
MAINTAINER Aaron Henshaw <aaronhenshaw@gmail.com>

#TODO: figure out how to get rid of this line
#RUN chmod -R 777 ${CATALINA_HOME}

#######################
### SSH KEYS FOR GITHUB
#######################
# Make ssh dir
RUN mkdir /root/.ssh/

# Copy over private key, and set permissions
ADD github_rsa /root/.ssh/id_rsa
ADD github_rsa.pub /root/.ssh/id_rsa.pub
RUN echo "IdentityFile /root/.ssh/id_rsa" >> /etc/ssh/ssh_config
RUN ssh-keygen -lf /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

# Create known_hosts, add github.com
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

#############
### PULL REPO
#############
ENV PROJECT_HOME /opt/sc2-bet
RUN mkdir ${PROJECT_HOME}
RUN git clone git@github.com:AmbushLabs/sc2-bet.git ${PROJECT_HOME}/app #change2

#############
### RUN BUILD
#############
WORKDIR ${PROJECT_HOME}/app
RUN grails clean

EXPOSE 8443
CMD ["grails", "prod", "run-app", "--https"]