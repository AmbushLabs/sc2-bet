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
WORKDIR ${PROJECT_HOME}/app/docker
RUN chmod +x run-gosu-wager.sh
RUN chmod +x run-nginx.sh

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/nginx/sites-available/gosuempire /etc/nginx/sites-available/gosuempire
COPY docker/nginx/conf.d/gosuempire.conf /etc/nginx/conf.d/gosuempire.conf

###############
### LETSENCRYPT
###############
ENV LETSENCRYPT_HOME /opt/letsencrypt
RUN mkdir ${LETSENCRYPT_HOME}
RUN git clone https://github.com/letsencrypt/letsencrypt ${LETSENCRYPT_HOME}
WORKDIR ${LETSENCRYPT_HOME}
RUN ./letsencrypt-auto certonly --test-cert --standalone --agree-tos --redirect --duplicate --text --register-unsafely-without-email -d gosuempire.com -d www.gosuempire.com

#EXPOSE 8443
EXPOSE 80
EXPOSE 443

WORKDIR ${PROJECT_HOME}/app/docker
CMD ["/usr/bin/supervisord"]