FROM ubuntu:14.04

ENV HOME /root

RUN apt-get update && \
    apt-get install -yq --no-install-recommends wget pwgen ca-certificates && \
    apt-get install -yq --no-install-recommends htop openjdk-7-jdk && \
    apt-get install -yq --no-install-recommends unzip byobu man curl git openssh-client build-essential software-properties-common && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64/
ENV TOMCAT_MAJOR_VERSION 7
ENV TOMCAT_MINOR_VERSION 7.0.55
ENV CATALINA_HOME /tomcat

# INSTALL TOMCAT
RUN wget -q https://archive.apache.org/dist/tomcat/tomcat-${TOMCAT_MAJOR_VERSION}/v${TOMCAT_MINOR_VERSION}/bin/apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz && \
    wget -qO- https://archive.apache.org/dist/tomcat/tomcat-${TOMCAT_MAJOR_VERSION}/v${TOMCAT_MINOR_VERSION}/bin/apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz.md5 | md5sum -c - && \
    tar zxf apache-tomcat-*.tar.gz && \
    rm apache-tomcat-*.tar.gz && \
    mv apache-tomcat* tomcat

ADD create_tomcat_admin_user.sh /create_tomcat_admin_user.sh
ADD run.sh /run.sh
RUN chmod +x /*.sh

############
### SSH KEYS
############
# Retrieve the code
RUN mkdir /opt/sc2-bet

# Make ssh dir
RUN mkdir /root/.ssh/

# Copy over private key, and set permissions
ADD github_rsa /root/.ssh/id_rsa
ADD github_rsa.pub /root/.ssh/id_rsa.pub
RUN echo "IdentityFile /root/.ssh/id_rsa" >> /etc/ssh/ssh_config
RUN ssh-keygen -lf /root/.ssh/id_rsa

RUN chmod 600 /root/.ssh/id_rsa

# Create known_hosts
RUN touch /root/.ssh/known_hosts
# Add bitbuckets key
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

# Install application requirements
RUN curl -s get.gvmtool.net | bash

RUN chmod 777 ${CATALINA_HOME}

RUN git clone git@github.com:AmbushLabs/sc2-bet.git /opt/sc2-bet/app #change
RUN bash -c "source /root/.gvm/bin/gvm-init.sh && gvm install grails 3.0.3; cd /opt/sc2-bet/app; grails -Xverify:none war; exit 0;"

RUN ls -lna /opt/sc2-bet/app/build/libs/

RUN rm -rf ${CATALINA_HOME}/webapps/*
RUN mv /opt/sc2-bet/app/build/libs/app-0.1.war ${CATALINA_HOME}/webapps/ROOT.war


EXPOSE 8080
CMD ["/run.sh"]
