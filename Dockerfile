FROM aaronhenshaw/grails3-tomcat7
MAINTAINER Aaron Henshaw <aaronhenshaw@gmail.com>

#TODO: figure out how to get rid of this line
RUN chmod 777 ${CATALINA_HOME}


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
RUN mkdir /opt/sc2-bet
RUN git clone git@github.com:AmbushLabs/sc2-bet.git /opt/sc2-bet/app #change

#############
### RUN BUILD
#############

WORKDIR /opt/sc2-bet/app/
RUN grails prod war -Xverify:none

RUN ls -lna /opt/sc2-bet/app/build/libs/

###############################
### COPY TO TOMCAT START SERVER
###############################
RUN rm -rf ${CATALINA_HOME}/webapps/*
RUN mv /opt/sc2-bet/app/build/libs/app-0.1.war ${CATALINA_HOME}/webapps/ROOT.war

EXPOSE 8080
CMD ["/run.sh"]
