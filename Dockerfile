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

#######
### SSL
#######
WORKDIR /etc/nginx
RUN openssl dhparam -out dhparam.pem 2048
RUN mkdir -p /etc/letsencrypt/live/gosuempire.com
COPY docker/keys/cert.pem /etc/letsencrypt/live/gosuempire.com/cert.pem
COPY docker/keys/chain.pem /etc/letsencrypt/live/gosuempire.com/chain.pem
COPY docker/keys/fullchain.pem /etc/letsencrypt/live/gosuempire.com/fullchain.pem
COPY docker/keys/privkey.pem /etc/letsencrypt/live/gosuempire.com/privkey.pem


##########
### RANDOM
##########
RUN mkdir -p /gosuempire/replays
RUN pip install jsonpickle
RUN mkdir -p /opt/awslogs
RUN mkdir -p /root/.aws
COPY docker/aws/credentials /root/.aws/credentials
COPY docker/aws/awslogs.conf /opt/awslogs/awslogs.conf
WORKDIR /opt/awslogs

RUN wget https://s3.amazonaws.com/aws-cloudwatch/downloads/latest/awslogs-agent-setup.py
RUN python ./awslogs-agent-setup.py --region us-east-1 --non-interactive --configfile=/opt/awslogs/awslogs.conf

###############
### LETSENCRYPT
###############
#ENV LETSENCRYPT_HOME /opt/letsencrypt
#RUN mkdir ${LETSENCRYPT_HOME}
#RUN git clone https://github.com/letsencrypt/letsencrypt ${LETSENCRYPT_HOME}

EXPOSE 80 443 8080

WORKDIR ${PROJECT_HOME}/app/docker
CMD ["/usr/bin/supervisord"]