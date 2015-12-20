FROM aaronhenshaw/nginx-python-sc2reader
MAINTAINER Aaron Henshaw <aaronhenshaw@gmail.com>

#######################
### SSH KEYS FOR GITHUB
#######################
# Copy over private key, and set permissions
ADD github_rsa /root/.ssh/id_rsa
ADD github_rsa.pub /root/.ssh/id_rsa.pub
RUN echo "IdentityFile /root/.ssh/id_rsa" >> /etc/ssh/ssh_config
RUN ssh-keygen -lf /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

#############
### PULL REPO
#############
ENV PROJECT_HOME /opt/sc2-bet
RUN mkdir ${PROJECT_HOME}
RUN git clone git@github.com:AmbushLabs/sc2-bet.git ${PROJECT_HOME}/app

#############
### RUN BUILD
#############
WORKDIR ${PROJECT_HOME}/app
RUN grails clean
RUN chmod +x run-gosu-wager.sh

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

#EXPOSE 8443
EXPOSE 80
EXPOSE 8080
EXPOSE 443

# ENTRYPOINT ["/sbin/entrypoint.sh"]
CMD ["/usr/bin/supervisord"]
# CMD ["grails", "prod", "run-app", "-https"]